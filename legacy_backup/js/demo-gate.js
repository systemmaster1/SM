/* ============================================================
   SystemMaster — DEMO ACCESS GATE
   Collects Name / Phone / Email before opening any demo,
   Google Sheet (Apps Script webhook) me "demo_access" type se
   saves it to Google Sheets, then grants direct access.
   Usage: demo page par body ke end me —
   <script src="js/demo-gate.js" data-demo="IMS — Inventory Demo"></script>
   ============================================================ */
(function () {
  var WEBHOOK = "https://script.google.com/macros/s/AKfycbwNuVmFIsigEJRrLy8sGKJeQYoa3wVRY9EpmixKeNtXa7rYeg_TDiLjF2fkz6EejZTrCg/exec";
  var KEY = "sm_demo_user_v1";
  var script = document.currentScript;
  var demoName = (script && script.getAttribute("data-demo")) || document.title;

  function getUser() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var u = JSON.parse(raw);
      // access valid for 30 days, fir dobara details lega
      if (!u || !u.ts || (Date.now() - u.ts) > 30 * 24 * 60 * 60 * 1000) return null;
      return u;
    } catch (e) { return null; }
  }

  function logVisit(u) {
    try {
      fetch(WEBHOOK, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "demo_access",
          timestamp: new Date().toLocaleString("en-IN"),
          demo: demoName,
          name: u.name, phone: u.phone, email: u.email,
          repeat: u.repeat ? "Yes" : "No"
        })
      });
    } catch (e) { /* silent */ }
  }

  function showGate() {
    var ov = document.createElement("div");
    ov.id = "smDemoGate";
    ov.style.cssText = "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(6,16,31,0.92);backdrop-filter:blur(8px);";
    ov.innerHTML =
      '<div style="max-width:430px;width:100%;background:linear-gradient(160deg,#0f2347,#0a1428);border:1px solid rgba(255,255,255,0.14);border-radius:20px;padding:30px 26px;box-shadow:0 28px 70px rgba(0,0,0,0.55);">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">' +
          '<div style="width:44px;height:44px;border-radius:12px;background:rgba(229,169,60,0.12);display:flex;align-items:center;justify-content:center;font-size:1.3rem;">🔓</div>' +
          '<div><div style="color:#fff;font-weight:800;font-family:Sora,sans-serif;font-size:1.05rem;">Unlock Free Demo</div>' +
          '<div style="color:#8896b3;font-size:0.8rem;">' + demoName.replace(/</g, "&lt;") + '</div></div>' +
        '</div>' +
        '<p style="color:#d0d8ea;font-size:0.86rem;margin:10px 0 18px;line-height:1.55;">Enter your details below to get instant full access — no password required.</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          gateInput("gName", "text", "Your Name *") +
          gateInput("gPhone", "tel", "Mobile Number *") +
          gateInput("gEmail", "email", "Email *") +
          '<div id="gErr" style="display:none;color:#ff6b6b;font-size:0.8rem;"></div>' +
          '<button id="gGo" style="margin-top:4px;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#E5A93C,#c98e1f);color:#0a1428;font-weight:800;font-size:0.95rem;cursor:pointer;font-family:Sora,sans-serif;">Start Demo →</button>' +
        '</div>' +
        '<div style="margin-top:14px;text-align:center;font-size:0.75rem;color:#6b7896;">🔒 Your details are kept private and used only for demo assistance. <a href="privacy.html" style="color:#8896b3;">Privacy</a></div>' +
      '</div>';
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";

    document.getElementById("gGo").addEventListener("click", function () {
      var name = document.getElementById("gName").value.trim();
      var phone = document.getElementById("gPhone").value.replace(/\D/g, "");
      var email = document.getElementById("gEmail").value.trim();
      var err = document.getElementById("gErr");
      function fail(m) { err.textContent = m; err.style.display = "block"; }
      if (name.length < 3) return fail("Please enter your full name.");
      if (!/^[6-9]\d{9}$/.test(phone)) return fail("Please enter a valid 10-digit mobile number.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Please enter a valid email address.");
      var u = { name: name, phone: phone, email: email, ts: Date.now() };
      try { localStorage.setItem(KEY, JSON.stringify(u)); } catch (e) {}
      logVisit(u);
      var btn = this; btn.textContent = "Opening demo..."; btn.disabled = true;
      setTimeout(function () {
        ov.remove();
        document.body.style.overflow = "";
      }, 500);
    });
  }

  function gateInput(id, type, ph) {
    return '<input id="' + id + '" type="' + type + '" placeholder="' + ph + '" ' +
      'style="padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.05);color:#fff;font-size:0.92rem;outline:none;font-family:inherit;">';
  }

  function init() {
    var u = getUser();
    if (u) {
      // already registered — silently log repeat visit
      u.repeat = true;
      logVisit(u);
    } else {
      showGate();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
