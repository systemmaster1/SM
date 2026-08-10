/* ============================================================
   SystemMaster — MANDATORY DEMO ACCESS GATE / Phase 18A
   Every demo access requires complete lead details.
   All submissions are sent to the existing Google Apps Script webhook.
   ============================================================ */
(function () {
  "use strict";

  var WEBHOOK =
    "https://script.google.com/macros/s/AKfycbwNuVmFIsigEJRrLy8sGKJeQYoa3wVRY9EpmixKeNtXa7rYeg_TDiLjF2fkz6EejZTrCg/exec";

  var KEY = "sm_demo_user_v2";
  var script = document.currentScript;
  var demoName = (script && script.getAttribute("data-demo")) || document.title;
  var openedAt = Date.now();

  function locale() {
    try {
      if ((document.referrer || "").indexOf("/hi/") !== -1) return "hi";
      if (localStorage.getItem("sm_locale") === "hi") return "hi";
    } catch (e) {}
    return "en";
  }

  function getSavedUser() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var user = JSON.parse(raw);
      if (!user || !user.ts) return null;
      return user;
    } catch (e) {
      return null;
    }
  }

  function leadId() {
    return "DEMO-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  function logVisit(user) {
    var payload = {
      formType: "demo_access",
      leadId: leadId(),
      timestamp: new Date().toISOString(),
      timestampIndia: new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"}),
      source: "SystemMaster Live Demo Gate",
      demo: demoName,
      name: user.name,
      company: user.company,
      phone: user.phone,
      email: user.email,
      interest: user.interest,
      requirement: user.requirement,
      locale: locale(),
      pageUrl: location.href,
      referrer: document.referrer || "Direct",
      repeat: user.repeat ? "Yes" : "No",
      userAgent: navigator.userAgent
    };

    try {
      fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
    } catch (e) {}
  }

  function input(id, type, placeholder, value) {
    return (
      '<input id="' +
      id +
      '" type="' +
      type +
      '" value="' +
      String(value || "").replace(/"/g, "&quot;") +
      '" placeholder="' +
      placeholder +
      '" required ' +
      'style="width:100%;padding:13px 14px;border-radius:12px;border:1px solid rgba(28,54,88,.16);' +
      'background:#f8fbff;color:#10203a;font-size:.92rem;outline:none;font-family:inherit;">'
    );
  }

  function showGate() {
    var hi = locale() === "hi";
    var saved = getSavedUser() || {};

    var ov = document.createElement("div");
    ov.id = "smDemoGate";
    ov.style.cssText =
      "position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;" +
      "padding:18px;background:rgba(235,242,251,.88);backdrop-filter:blur(14px);" +
      "-webkit-backdrop-filter:blur(14px);overflow:auto;";

    ov.innerHTML =
      '<div style="max-width:520px;width:100%;border:1px solid rgba(28,54,88,.13);border-radius:24px;' +
        'background:rgba(255,255,255,.99);box-shadow:0 30px 90px rgba(30,58,95,.18);padding:28px;color:#10203a;' +
        'font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">' +

        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">' +
          '<img src="/logo/systemmaster.png" alt="SystemMaster" style="width:58px;height:58px;object-fit:contain;">' +
          '<div><div style="font-weight:900;font-size:18px;letter-spacing:-.02em;">SystemMaster</div>' +
          '<div style="margin-top:3px;color:#d99a24;font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;">Automations</div></div>' +
        '</div>' +

        '<div style="display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:999px;background:#eef5ff;color:#3478e5;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;">' +
          '● ' + (hi ? "Mandatory Demo Access" : "Mandatory Demo Access") +
        '</div>' +

        '<h2 style="margin:14px 0 7px;font-size:25px;line-height:1.16;letter-spacing:-.035em;">' +
          (hi ? "डेमो शुरू करने के लिए complete details भरें" : "Complete your details to start the demo") +
        '</h2>' +

        '<p style="margin:0 0 17px;color:#66758b;font-size:13px;line-height:1.6;">' +
          (hi
            ? "हर field mandatory है। यह हमें genuine demo users को सहायता देने और आपकी requirement समझने में मदद करता है।"
            : "Every field is mandatory. This helps us support genuine demo users and understand your business requirement.") +
        '</p>' +

        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;" id="gGrid">' +
          input("gName", "text", hi ? "पूरा नाम *" : "Full Name *", saved.name) +
          input("gCompany", "text", hi ? "Company / Business *" : "Company / Business *", saved.company) +
          input("gPhone", "tel", hi ? "मोबाइल नंबर *" : "Mobile Number *", saved.phone) +
          input("gEmail", "email", hi ? "ईमेल *" : "Email *", saved.email) +
        '</div>' +

        '<div style="margin-top:10px;">' +
          '<select id="gInterest" required style="width:100%;padding:13px 14px;border-radius:12px;border:1px solid rgba(28,54,88,.16);background:#f8fbff;color:#10203a;font-size:.92rem;outline:none;font-family:inherit;">' +
            '<option value="">' + (hi ? "आप किस solution में interested हैं? *" : "Which solution are you interested in? *") + '</option>' +
            '<option value="ERP / CRM">ERP / CRM</option>' +
            '<option value="HRMS / Task Management">HRMS / Task Management</option>' +
            '<option value="Accounting / Books">Accounting / Books</option>' +
            '<option value="FMS / Workflow Automation">FMS / Workflow Automation</option>' +
            '<option value="IMS / Inventory">IMS / Inventory</option>' +
            '<option value="PMS / Manufacturing">PMS / Manufacturing</option>' +
            '<option value="AI / WhatsApp Automation">AI / WhatsApp Automation</option>' +
            '<option value="Website / Mobile App">Website / Mobile App</option>' +
            '<option value="Custom Software">Custom Software</option>' +
            '<option value="Other">Other</option>' +
          '</select>' +
        '</div>' +

        '<div style="margin-top:10px;">' +
          '<textarea id="gRequirement" required placeholder="' +
            (hi ? "अपनी requirement कम से कम 15 characters में लिखें *" : "Describe your requirement in at least 15 characters *") +
          '" style="width:100%;min-height:95px;resize:vertical;padding:13px 14px;border-radius:12px;border:1px solid rgba(28,54,88,.16);background:#f8fbff;color:#10203a;font-size:.92rem;outline:none;font-family:inherit;">' +
          String(saved.requirement || "").replace(/</g, "&lt;") +
          '</textarea>' +
        '</div>' +

        '<input id="gWebsite" type="text" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;">' +

        '<div id="gErr" style="display:none;margin-top:10px;border-radius:10px;background:#fff1f2;padding:9px 11px;color:#c43b4d;font-size:.8rem;font-weight:700;"></div>' +

        '<button id="gGo" style="width:100%;margin-top:12px;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#4388ef,#2868d2);color:#fff;font-weight:850;font-size:.94rem;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px rgba(52,120,229,.20);">' +
          (hi ? "डेमो शुरू करें →" : "Start Demo →") +
        '</button>' +

        '<div style="margin-top:13px;text-align:center;font-size:.72rem;line-height:1.55;color:#718096;">🔒 ' +
          (hi ? "Details केवल demo support और business enquiry के लिए उपयोग होती हैं। " : "Details are used only for demo support and business enquiries. ") +
          '<a href="/' + locale() + '/privacy" style="color:#3478e5;font-weight:750;text-decoration:none;">Privacy Policy</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";

    if (saved.interest) {
      var select = document.getElementById("gInterest");
      if (select) select.value = saved.interest;
    }

    document.getElementById("gGo").addEventListener("click", function () {
      var name = document.getElementById("gName").value.trim();
      var company = document.getElementById("gCompany").value.trim();
      var phone = document.getElementById("gPhone").value.replace(/\D/g, "");
      var email = document.getElementById("gEmail").value.trim().toLowerCase();
      var interest = document.getElementById("gInterest").value;
      var requirement = document.getElementById("gRequirement").value.trim();
      var honeypot = document.getElementById("gWebsite").value.trim();
      var err = document.getElementById("gErr");
      var btn = this;

      function fail(message) {
        err.textContent = message;
        err.style.display = "block";
      }

      if (honeypot) return fail("Submission blocked.");
      if (Date.now() - openedAt < 2200) {
        return fail(hi ? "कृपया details verify करके submit करें।" : "Please review your details before submitting.");
      }
      if (name.length < 3) return fail(hi ? "कृपया पूरा नाम दर्ज करें।" : "Please enter your full name.");
      if (company.length < 2) return fail(hi ? "Company / business name दर्ज करें।" : "Please enter your company or business name.");
      if (!/^[6-9]\d{9}$/.test(phone)) return fail(hi ? "सही 10-अंकों का mobile number दर्ज करें।" : "Please enter a valid 10-digit Indian mobile number.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(hi ? "सही email दर्ज करें।" : "Please enter a valid email address.");
      if (!interest) return fail(hi ? "एक solution select करें।" : "Please select a solution.");
      if (requirement.length < 15) return fail(hi ? "Requirement कम से कम 15 characters में लिखें।" : "Please describe your requirement in at least 15 characters.");

      var user = {
        name: name,
        company: company,
        phone: phone,
        email: email,
        interest: interest,
        requirement: requirement,
        ts: Date.now(),
        repeat: !!saved.name
      };

      try {
        localStorage.setItem(KEY, JSON.stringify(user));
      } catch (e) {}

      btn.textContent = hi ? "Saving & Opening..." : "Saving & Opening...";
      btn.disabled = true;
      btn.style.opacity = ".68";
      err.style.display = "none";

      logVisit(user);

      setTimeout(function () {
        ov.remove();
        document.body.style.overflow = "";
      }, 700);
    });

    var style = document.createElement("style");
    style.textContent =
      "@media(max-width:560px){#gGrid{grid-template-columns:1fr!important;}#smDemoGate>div{padding:21px!important;}}";
    document.head.appendChild(style);
  }

  function init() {
    // Gate is intentionally shown on every demo opening.
    // Returning visitors are pre-filled, but they still confirm all mandatory details.
    showGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
