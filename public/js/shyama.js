/* =====================================================================
   SHYAMA AI CHAT AGENT  —  PHASE 2
   SystemMaster Automations  |  Workflow & ERP Solutions
   ---------------------------------------------------------------------
   Phase 2 upgrades over Phase 1:
     1. Sequential lead capture (ONE field per message: Name -> Company
        -> Phone -> Email -> READY) with smart-skip if user gives many.
     2. Per-field validation (name / company / 10-digit phone / email).
     3. Real backend via n8n webhook (CFG.webhookUrl). When the webhook
        is not configured yet, the widget falls back to a safe local
        flow so the site keeps working before n8n is live.
     4. Sends { sessionId, message, profile, history(last 20), url,
        timestamp } and expects { text, quick[], action }.

   HOW TO GO LIVE:
     - Set CFG.webhookUrl below to your n8n Production Webhook URL.
     - That's it. Everything else stays the same.
   ===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     CONFIG  (the only thing Sunil bhai needs to edit after n8n setup)
     --------------------------------------------------------------- */
  var CFG = {
    name: "Shyama",
    avatar: "\uD83D\uDC69\u200D\uD83D\uDCBC",          // 👩‍💼
    company: "SystemMaster Automations",
    tagline: "Workflow & ERP Solutions",
    phone: "+91 90279 65956",
    email: "Connect@systemmaster.in",
    whatsapp: "919027965956",

    // ====== n8n WEBHOOK URL (live) ======
    webhookUrl: "https://kc3.app.n8n.cloud/webhook/shyama",
    requestTimeoutMs: 20000,        // 20s before falling back to local

    storeKey: "sm_shyama_v2",       // localStorage key
    historyLimit: 60,               // total messages kept locally
    historySend: 20                 // how many recent messages sent to backend
  };

  /* ---------------------------------------------------------------
     THEME  (matches the premium dark site theme)
     --------------------------------------------------------------- */
  var T = {
    blue: "#3D7EF0",
    gold: "#E5A93C",
    green: "#00FFA3",
    white: "#FFFFFF",
    silver: "#c7d0e0",
    slate: "#8896b3",
    panel: "rgba(13,24,46,0.96)",
    glass: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.10)"
  };

  /* ---------------------------------------------------------------
     STATE
     --------------------------------------------------------------- */
  var state = {
    open: false,
    busy: false,
    sessionId: "",
    profile: { name: "", company: "", phone: "", email: "", city: "" },
    history: [],          // [{role:'user'|'shyama', text, ts}]
    stage: "name",        // name -> company -> phone -> email -> ready
    greeted: false
  };

  /* ---------------------------------------------------------------
     STORAGE
     --------------------------------------------------------------- */
  function uid() {
    return "sm_" + Date.now().toString(36) + "_" +
      Math.random().toString(36).slice(2, 8);
  }

  function load() {
    try {
      var raw = localStorage.getItem(CFG.storeKey);
      if (raw) {
        var d = JSON.parse(raw);
        state.sessionId = d.sessionId || uid();
        state.profile   = Object.assign(state.profile, d.profile || {});
        state.history   = Array.isArray(d.history) ? d.history : [];
        state.stage     = d.stage || computeStage();
        state.greeted   = !!d.greeted;
        return;
      }
    } catch (e) { /* corrupt store -> reset */ }
    state.sessionId = uid();
  }

  function save() {
    try {
      localStorage.setItem(CFG.storeKey, JSON.stringify({
        sessionId: state.sessionId,
        profile: state.profile,
        history: state.history.slice(-CFG.historyLimit),
        stage: state.stage,
        greeted: state.greeted
      }));
    } catch (e) { /* storage full / blocked -> ignore */ }
  }

  /* ---------------------------------------------------------------
     VALIDATION + EXTRACTION
     --------------------------------------------------------------- */
  function cleanPhone(s) {
    var d = (s || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);   // strip +91
    if (d.length === 11 && d.charAt(0) === "0") d = d.slice(1);     // strip leading 0
    return d;
  }
  function validPhone(s) { return /^[6-9]\d{9}$/.test(cleanPhone(s)); }
  function validEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((s || "").trim()); }
  function validName(s) {
    s = (s || "").trim();
    return s.length >= 2 && s.length <= 50 && /^[A-Za-z\u0900-\u097F.\s]+$/.test(s);
  }
  function validCompany(s) {
    s = (s || "").trim();
    return s.length >= 2 && s.length <= 80;
  }

  // Pull any obvious fields out of a free-text message (smart-skip support)
  function extractEntities(msg) {
    var found = {};
    var emailMatch = msg.match(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/);
    if (emailMatch) found.email = emailMatch[0].trim();

    var phoneMatch = msg.match(/(?:\+?91[\-\s]?)?[6-9]\d{9}|\d[\d\-\s]{8,13}\d/);
    if (phoneMatch && validPhone(phoneMatch[0])) found.phone = cleanPhone(phoneMatch[0]);

    // "my name is X" / "I am X" / "company is Y" / "from Y"
    var nm = msg.match(/(?:my name is|i am|i'm|this is|naam|name[:\-]?)\s+([A-Za-z\u0900-\u097F.\s]{2,40})/i);
    if (nm && validName(nm[1])) found.name = titleCase(nm[1].trim());

    var cm = msg.match(/(?:company|firm|business|from|we are|we're|works at|company[:\-]?)\s+([A-Za-z0-9&.,\-\s]{2,60})/i);
    if (cm && validCompany(cm[1])) found.company = cm[1].trim().replace(/[.,]\s*$/, "");

    return found;
  }

  function titleCase(s) {
    return s.replace(/\w\S*/g, function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
  }

  function computeStage() {
    var p = state.profile;
    if (!validName(p.name)) return "name";
    if (!validCompany(p.company)) return "company";
    if (!validPhone(p.phone)) return "phone";
    if (!validEmail(p.email)) return "email";
    return "ready";
  }

  function leadComplete() {
    var p = state.profile;
    return validName(p.name) && validCompany(p.company) &&
           validPhone(p.phone) && validEmail(p.email);
  }

  /* ---------------------------------------------------------------
     LOCAL (FALLBACK) BRAIN
     Used only until CFG.webhookUrl is set, or if the backend fails.
     Handles the sequential lead capture professionally.
     --------------------------------------------------------------- */
  function localReply(userMsg) {
    var p = state.profile;

    // Apply anything we can pull out of the message
    var ent = extractEntities(userMsg);
    if (ent.name && !validName(p.name)) p.name = ent.name;
    if (ent.company && !validCompany(p.company)) p.company = ent.company;
    if (ent.phone) p.phone = ent.phone;
    if (ent.email) p.email = ent.email;

    // If we are asking for a single field, treat the raw message as that answer
    if (state.stage === "name" && !ent.name && validName(userMsg)) p.name = titleCase(userMsg.trim());
    if (state.stage === "company" && !ent.company && validCompany(userMsg)) p.company = userMsg.trim();
    if (state.stage === "phone" && !ent.phone && validPhone(userMsg)) p.phone = cleanPhone(userMsg);
    if (state.stage === "email" && !ent.email && validEmail(userMsg)) p.email = userMsg.trim();

    state.stage = computeStage();

    // Build the next prompt based on the first missing field
    switch (state.stage) {
      case "name":
        return { text: "May I have your full name to begin, please?", quick: [] };
      case "company":
        return {
          text: "Thank you" + (p.name ? ", " + firstName(p.name) + " ji" : "") +
                ". Which company are you representing?",
          quick: []
        };
      case "phone":
        return {
          text: "Noted. May I have your 10-digit mobile number so our team can reach you?",
          quick: []
        };
      case "email":
        return {
          text: "Thank you. And your email address, please?",
          quick: []
        };
      default:
        // ready
        return readyMenu(userMsg);
    }
  }

  function firstName(n) { return (n || "").trim().split(/\s+/)[0]; }

  function readyMenu(userMsg) {
    // Once the lead is captured, the local brain gives a professional,
    // scope-safe holding reply and a service menu. Real answers come
    // from OpenRouter via n8n once the webhook is live.
    var greetedReady = state.history.some(function (m) {
      return m.role === "shyama" && /how may i assist/i.test(m.text);
    });

    if (!greetedReady) {
      return {
        text: "Perfect, " + firstName(state.profile.name) + " ji! How may I assist " +
              (state.profile.company || "your business") + " today?",
        quick: ["ERP / CRM System", "Workflow Automation", "Mobile App / Website",
                "AI Chatbot / WhatsApp", "Custom Software", "Book a Demo with Sunil"]
      };
    }

    var m = (userMsg || "").toLowerCase();
    if (/demo|meeting|call|book|schedule|appointment/.test(m)) {
      return {
        text: "Certainly. Sunil bhai will be glad to walk you through a personalised demo. " +
              "Our team is available Mon\u2013Sat, 10 AM\u20137 PM IST. You may also reach Sunil " +
              "directly at " + CFG.phone + " or " + CFG.email + ". " +
              "Shall I note a preferred day and time for the demo?",
        quick: ["This week", "Next week", "Just call me"],
        action: "save_lead"
      };
    }
    if (/price|cost|charge|quote|kitna|rate|budget/.test(m)) {
      return {
        text: "Pricing depends entirely on your requirements. Once we understand your needs, " +
              "Sunil bhai will share an accurate quote. Could you tell me a little more about " +
              "what you would like to automate?",
        quick: ["ERP / CRM", "Workflow Automation", "AI Chatbot", "Book a Demo"],
        action: "save_lead"
      };
    }

    // Generic professional acknowledgement + keep in scope
    return {
      text: "Thank you for sharing that. I have noted your interest. To give you precise " +
            "guidance, Sunil bhai would be the right person to advise. May I arrange a short " +
            "demo, or is there a specific SystemMaster service you would like to explore?",
      quick: ["ERP / CRM System", "Workflow Automation", "AI Chatbot / WhatsApp",
              "Book a Demo with Sunil"],
      action: "save_lead"
    };
  }

  /* ---------------------------------------------------------------
     BACKEND CALL (n8n webhook)
     --------------------------------------------------------------- */
  function callBackend(userMsg) {
    if (!CFG.webhookUrl) return Promise.reject(new Error("no-webhook"));

    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, CFG.requestTimeoutMs);

    var payload = {
      sessionId: state.sessionId,
      message: userMsg,
      profile: state.profile,
      stage: state.stage,
      history: state.history.slice(-CFG.historySend),
      url: location.href,
      timestamp: new Date().toISOString()
    };

    return fetch(CFG.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) throw new Error("http-" + res.status);
      return res.json();
    }).then(function (data) {
      // n8n may return {text, quick, action} OR {output:{...}} — normalise
      if (data && data.output && typeof data.output === "object") data = data.output;
      if (typeof data === "string") data = { text: data };
      if (!data || !data.text) throw new Error("bad-shape");

      // If backend returns an updated profile, merge it (returning customers)
      if (data.profile && typeof data.profile === "object") {
        state.profile = Object.assign(state.profile, data.profile);
        state.stage = computeStage();
      }
      return {
        text: data.text,
        quick: Array.isArray(data.quick) ? data.quick : [],
        action: data.action || null
      };
    });
  }

  /* ---------------------------------------------------------------
     MAIN MESSAGE HANDLER
     --------------------------------------------------------------- */
  function sendMessage(text) {
    text = (text || "").trim();
    if (!text || state.busy) return;

    pushMsg("user", text);
    renderMessages();
    setBusy(true);
    showTyping(true);

    var done = function (reply) {
      showTyping(false);
      setBusy(false);
      pushMsg("shyama", reply.text);
      state.stage = computeStage();
      renderMessages(reply.quick || []);
      updateBadge();
      save();
    };

    callBackend(text)
      .then(function (reply) {
        // keep our local profile/stage view fresh even when backend drives
        var ent = extractEntities(text);
        mergeEntities(ent, text);
        done(reply);
      })
      .catch(function () {
        // Fallback to local brain (also used before webhook is configured)
        var reply = localReply(text);
        done(reply);
      });
  }

  function mergeEntities(ent, raw) {
    var p = state.profile;
    if (ent.name && !validName(p.name)) p.name = ent.name;
    if (ent.company && !validCompany(p.company)) p.company = ent.company;
    if (ent.phone) p.phone = ent.phone;
    if (ent.email) p.email = ent.email;
    // single-field answers
    if (state.stage === "name" && !ent.name && validName(raw)) p.name = titleCase(raw.trim());
    if (state.stage === "company" && !ent.company && validCompany(raw)) p.company = raw.trim();
    if (state.stage === "phone" && !ent.phone && validPhone(raw)) p.phone = cleanPhone(raw);
    if (state.stage === "email" && !ent.email && validEmail(raw)) p.email = raw.trim();
  }

  function pushMsg(role, text) {
    state.history.push({ role: role, text: text, ts: Date.now() });
    if (state.history.length > CFG.historyLimit) {
      state.history = state.history.slice(-CFG.historyLimit);
    }
  }

  /* ---------------------------------------------------------------
     GREETING
     --------------------------------------------------------------- */
  function greet() {
    if (state.greeted && state.history.length) return;

    var msg;
    if (leadComplete()) {
      // Returning, fully-known customer
      msg = "Welcome back, " + firstName(state.profile.name) + " ji! " +
            "How may I assist " + (state.profile.company || "you") + " today?";
      state.stage = "ready";
    } else if (state.history.length) {
      // Returning but incomplete — resume from where they left
      state.stage = computeStage();
      msg = "Welcome back to " + CFG.company + ". Let us continue. " +
            nextFieldPrompt();
    } else {
      msg = "Welcome to " + CFG.company + "! I'm " + CFG.name +
            ", here to assist you. May I have your full name to begin?";
      state.stage = "name";
    }

    pushMsg("shyama", msg);
    state.greeted = true;
    save();
  }

  function nextFieldPrompt() {
    switch (computeStage()) {
      case "name":    return "May I have your full name, please?";
      case "company": return "Which company are you representing?";
      case "phone":   return "May I have your 10-digit mobile number?";
      case "email":   return "And your email address, please?";
      default:        return "How may I assist you today?";
    }
  }

  /* ===============================================================
     UI  (built entirely in JS — no extra files needed)
     =============================================================== */
  var el = {};

  function injectStyles() {
    if (document.getElementById("sm-shyama-styles")) return;
    var css = ""
      + "#sm-shyama,#sm-shyama *{box-sizing:border-box;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif}"
      + "#sm-shyama{position:fixed;right:20px;bottom:166px;z-index:99998}"
      + ".sm-bubble{position:fixed;right:20px;bottom:94px;width:62px;height:62px;border-radius:50%;"
        + "background:linear-gradient(135deg," + T.gold + "," + T.blue + ");"
        + "display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;"
        + "box-shadow:0 8px 28px rgba(229,169,60,.45);z-index:99999;border:2px solid rgba(255,255,255,.18);"
        + "transition:transform .2s ease}"
      + ".sm-bubble:hover{transform:scale(1.07)}"
      + ".sm-bubble .dot{position:absolute;top:6px;right:6px;width:12px;height:12px;border-radius:50%;"
        + "background:" + T.green + ";border:2px solid #06101f;box-shadow:0 0 8px " + T.green + "}"
      + ".sm-win{width:370px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 130px);"
        + "background:" + T.panel + ";backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);"
        + "border:1px solid " + T.border + ";border-radius:18px;overflow:hidden;display:none;flex-direction:column;"
        + "box-shadow:0 24px 60px rgba(0,0,0,.55)}"
      + "#sm-shyama.open .sm-win{display:flex}"
      + ".sm-head{padding:14px 16px;display:flex;align-items:center;gap:12px;"
        + "background:linear-gradient(135deg,#0f2347,#0a1428);border-bottom:1px solid " + T.border + "}"
      + ".sm-head .av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;"
        + "font-size:22px;background:linear-gradient(135deg," + T.gold + "," + T.blue + ")}"
      + ".sm-head .t1{color:#fff;font-weight:700;font-size:15px;line-height:1.1}"
      + ".sm-head .t2{color:" + T.green + ";font-size:11px;display:flex;align-items:center;gap:5px}"
      + ".sm-head .t2 i{width:7px;height:7px;border-radius:50%;background:" + T.green + ";display:inline-block;"
        + "box-shadow:0 0 6px " + T.green + "}"
      + ".sm-head .x{margin-left:auto;color:" + T.slate + ";cursor:pointer;font-size:20px;line-height:1;border:0;"
        + "background:transparent}"
      + ".sm-badge{display:flex;gap:6px;padding:8px 14px;background:rgba(255,255,255,.03);"
        + "border-bottom:1px solid " + T.border + ";flex-wrap:wrap}"
      + ".sm-chip{font-size:10.5px;padding:3px 9px;border-radius:20px;border:1px solid " + T.border + ";"
        + "color:" + T.slate + ";display:flex;align-items:center;gap:4px}"
      + ".sm-chip.ok{color:" + T.green + ";border-color:rgba(0,255,163,.4);background:rgba(0,255,163,.08)}"
      + ".sm-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}"
      + ".sm-body::-webkit-scrollbar{width:6px}.sm-body::-webkit-scrollbar-thumb{background:" + T.border + ";border-radius:3px}"
      + ".sm-row{display:flex;gap:8px;max-width:88%}"
      + ".sm-row.user{align-self:flex-end;flex-direction:row-reverse}"
      + ".sm-row .ava{width:28px;height:28px;border-radius:50%;flex:0 0 28px;display:flex;align-items:center;"
        + "justify-content:center;font-size:15px;background:linear-gradient(135deg," + T.gold + "," + T.blue + ")}"
      + ".sm-row.user .ava{background:linear-gradient(135deg,#2a3a5c,#1a2540)}"
      + ".sm-msg{padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.5;color:" + T.silver + ";"
        + "background:" + T.glass + ";border:1px solid " + T.border + ";white-space:pre-wrap;word-break:break-word}"
      + ".sm-row.user .sm-msg{background:linear-gradient(135deg," + T.blue + ",#2a5fd0);color:#fff;border-color:transparent}"
      + ".sm-quick{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 8px}"
      + ".sm-quick button{font-size:12px;padding:6px 11px;border-radius:20px;cursor:pointer;color:" + T.gold + ";"
        + "background:rgba(229,169,60,.08);border:1px solid rgba(229,169,60,.35);transition:.15s}"
      + ".sm-quick button:hover{background:rgba(229,169,60,.18)}"
      + ".sm-foot{padding:10px 12px;border-top:1px solid " + T.border + ";display:flex;gap:8px;align-items:flex-end}"
      + ".sm-foot textarea{flex:1;resize:none;max-height:90px;background:" + T.glass + ";color:#fff;"
        + "border:1px solid " + T.border + ";border-radius:12px;padding:9px 12px;font-size:13.5px;outline:none}"
      + ".sm-foot textarea::placeholder{color:" + T.slate + "}"
      + ".sm-send{width:40px;height:40px;flex:0 0 40px;border:0;border-radius:12px;cursor:pointer;color:#06101f;"
        + "font-size:16px;background:linear-gradient(135deg," + T.gold + "," + T.blue + ")}"
      + ".sm-send:disabled{opacity:.5;cursor:not-allowed}"
      + ".sm-typing{display:flex;gap:4px;padding:10px 12px}"
      + ".sm-typing span{width:7px;height:7px;border-radius:50%;background:" + T.slate + ";animation:smb 1.2s infinite}"
      + ".sm-typing span:nth-child(2){animation-delay:.2s}.sm-typing span:nth-child(3){animation-delay:.4s}"
      + "@keyframes smb{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}"
      + "@media(max-width:480px){.sm-win{width:calc(100vw - 24px);right:12px;height:calc(100vh - 110px)}"
        + "#sm-shyama{right:12px;bottom:150px}.sm-bubble{right:12px;bottom:80px}}";
    var s = document.createElement("style");
    s.id = "sm-shyama-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function buildUI() {
    injectStyles();

    var bubble = document.createElement("div");
    bubble.className = "sm-bubble";
    bubble.innerHTML = CFG.avatar + '<span class="dot"></span>';
    bubble.title = "Chat with " + CFG.name;
    bubble.addEventListener("click", toggle);
    document.body.appendChild(bubble);
    el.bubble = bubble;

    var root = document.createElement("div");
    root.id = "sm-shyama";
    root.innerHTML =
      '<div class="sm-win">' +
        '<div class="sm-head">' +
          '<div class="av">' + CFG.avatar + '</div>' +
          '<div><div class="t1">' + CFG.name + '</div>' +
            '<div class="t2"><i></i>Online \u2022 ' + CFG.company + '</div></div>' +
          '<button class="x" aria-label="Close">\u2715</button>' +
        '</div>' +
        '<div class="sm-badge" id="sm-badge"></div>' +
        '<div class="sm-body" id="sm-body"></div>' +
        '<div class="sm-quick" id="sm-quick"></div>' +
        '<div class="sm-foot">' +
          '<textarea id="sm-input" rows="1" placeholder="Type your message\u2026"></textarea>' +
          '<button class="sm-send" id="sm-send">\u27A4</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);
    el.root  = root;
    el.body  = root.querySelector("#sm-body");
    el.quick = root.querySelector("#sm-quick");
    el.badge = root.querySelector("#sm-badge");
    el.input = root.querySelector("#sm-input");
    el.send  = root.querySelector("#sm-send");

    root.querySelector(".x").addEventListener("click", toggle);
    el.send.addEventListener("click", function () { submit(); });
    el.input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    el.input.addEventListener("input", function () {
      el.input.style.height = "auto";
      el.input.style.height = Math.min(el.input.scrollHeight, 90) + "px";
    });
  }

  function submit() {
    var v = el.input.value;
    el.input.value = "";
    el.input.style.height = "auto";
    sendMessage(v);
  }

  function toggle() {
    state.open = !state.open;
    el.root.classList.toggle("open", state.open);
    if (state.open) {
      if (!state.greeted || !state.history.length) greet();
      renderMessages(lastQuick());
      updateBadge();
      setTimeout(function () { el.input && el.input.focus(); }, 50);
    }
  }

  function lastQuick() {
    // re-show quick replies if the last shyama message had a menu context
    if (state.stage === "ready") {
      return ["ERP / CRM System", "Workflow Automation", "AI Chatbot / WhatsApp",
              "Book a Demo with Sunil"];
    }
    return [];
  }

  function renderMessages(quick) {
    if (!el.body) return;
    el.body.innerHTML = "";
    state.history.forEach(function (m) {
      var row = document.createElement("div");
      row.className = "sm-row " + (m.role === "user" ? "user" : "shyama");
      row.innerHTML =
        '<div class="ava">' + (m.role === "user" ? "\uD83D\uDC64" : CFG.avatar) + '</div>' +
        '<div class="sm-msg"></div>';
      row.querySelector(".sm-msg").textContent = m.text;
      el.body.appendChild(row);
    });
    el.body.scrollTop = el.body.scrollHeight;
    renderQuick(quick || []);
  }

  function renderQuick(items) {
    if (!el.quick) return;
    el.quick.innerHTML = "";
    items.forEach(function (q) {
      var b = document.createElement("button");
      b.textContent = q;
      b.addEventListener("click", function () { sendMessage(q); });
      el.quick.appendChild(b);
    });
  }

  function showTyping(on) {
    var id = "sm-typing-row";
    var existing = document.getElementById(id);
    if (on) {
      if (existing) return;
      var row = document.createElement("div");
      row.className = "sm-row shyama";
      row.id = id;
      row.innerHTML = '<div class="ava">' + CFG.avatar + '</div>' +
        '<div class="sm-msg sm-typing"><span></span><span></span><span></span></div>';
      el.body.appendChild(row);
      el.body.scrollTop = el.body.scrollHeight;
    } else if (existing) {
      existing.remove();
    }
  }

  function setBusy(on) {
    state.busy = on;
    if (el.send) el.send.disabled = on;
  }

  function updateBadge() {
    if (!el.badge) return;
    var p = state.profile;
    var fields = [
      { k: "Name",    ok: validName(p.name) },
      { k: "Company", ok: validCompany(p.company) },
      { k: "Phone",   ok: validPhone(p.phone) },
      { k: "Email",   ok: validEmail(p.email) }
    ];
    el.badge.innerHTML = "";
    fields.forEach(function (f) {
      var c = document.createElement("span");
      c.className = "sm-chip" + (f.ok ? " ok" : "");
      c.textContent = (f.ok ? "\u2713 " : "\u25CB ") + f.k;
      el.badge.appendChild(c);
    });
  }

  /* ---------------------------------------------------------------
     INIT
     --------------------------------------------------------------- */
  function init() {
    load();
    state.stage = computeStage();
    buildUI();
    updateBadge();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose a tiny API for debugging / manual reset from console
  window.Shyama = {
    open: function () { if (!state.open) toggle(); },
    reset: function () { localStorage.removeItem(CFG.storeKey); location.reload(); },
    config: CFG
  };
})();
