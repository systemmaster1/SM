/* ============================================================
   SystemMaster — DEMO ACCESS GATE / Phase 13
   Lead capture remains connected to the existing Apps Script webhook.
   ============================================================ */
(function () {
  "use strict";

  var WEBHOOK = "https://script.google.com/macros/s/AKfycbwNuVmFIsigEJRrLy8sGKJeQYoa3wVRY9EpmixKeNtXa7rYeg_TDiLjF2fkz6EejZTrCg/exec";
  var KEY = "sm_demo_user_v1";
  var script = document.currentScript;
  var demoName = (script && script.getAttribute("data-demo")) || document.title;

  function locale() {
    try {
      if ((document.referrer || "").indexOf("/hi/") !== -1) return "hi";
      if (localStorage.getItem("sm_locale") === "hi") return "hi";
    } catch (e) {}
    return "en";
  }

  function getUser() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var u = JSON.parse(raw);
      if (!u || !u.ts || (Date.now() - u.ts) > 30 * 24 * 60 * 60 * 1000) return null;
      return u;
    } catch (e) {
      return null;
    }
  }

  function logVisit(u) {
    try {
      fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          formType: "demo_access",
          timestamp: new Date().toLocaleString("en-IN"),
          demo: demoName,
          name: u.name,
          phone: u.phone,
          email: u.email,
          repeat: u.repeat ? "Yes" : "No"
        })
      });
    } catch (e) {}
  }

  function input(id, type, placeholder) {
    return '<input id="' + id + '" type="' + type + '" placeholder="' + placeholder + '" ' +
      'style="width:100%;padding:13px 14px;border-radius:12px;border:1px solid rgba(28,54,88,.16);background:#f8fbff;color:#10203a;font-size:.92rem;outline:none;font-family:inherit;">';
  }

  function showGate() {
    var hi = locale() === "hi";
    var ov = document.createElement("div");
    ov.id = "smDemoGate";
    ov.style.cssText =
      "position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;" +
      "padding:18px;background:rgba(235,242,251,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);";

    ov.innerHTML =
      '<div style="max-width:450px;width:100%;border:1px solid rgba(28,54,88,.13);border-radius:24px;' +
        'background:rgba(255,255,255,.98);box-shadow:0 30px 90px rgba(30,58,95,.18);padding:28px;color:#10203a;' +
        'font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">' +
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:22px;">' +
          '<img src="/logo/systemmaster.png" alt="SystemMaster" style="width:52px;height:52px;object-fit:contain;">' +
          '<div><div style="font-weight:900;font-size:17px;letter-spacing:-.02em;">SystemMaster</div>' +
          '<div style="margin-top:3px;color:#d99a24;font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;">Automations</div></div>' +
        '</div>' +
        '<div style="display:inline-flex;align-items:center;gap:7px;padding:6px 10px;border-radius:999px;background:#eef5ff;color:#3478e5;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;">' +
          '● ' + (hi ? 'लाइव डेमो एक्सेस' : 'Live Demo Access') +
        '</div>' +
        '<h2 style="margin:15px 0 8px;font-size:26px;line-height:1.15;letter-spacing:-.035em;">' +
          (hi ? 'डेमो शुरू करने के लिए अपनी जानकारी दें' : 'Enter your details to start the demo') +
        '</h2>' +
        '<p style="margin:0 0 20px;color:#66758b;font-size:13px;line-height:1.65;">' +
          (hi ? 'हम आपकी जानकारी केवल डेमो सहायता और आपकी आवश्यकता समझने के लिए उपयोग करेंगे।' :
          'We use these details only to assist with the demo and understand your software requirement.') +
        '</p>' +
        '<div style="display:flex;flex-direction:column;gap:11px;">' +
          input("gName","text",hi ? "आपका नाम *" : "Your Name *") +
          input("gPhone","tel",hi ? "मोबाइल नंबर *" : "Mobile Number *") +
          input("gEmail","email",hi ? "ईमेल *" : "Email *") +
          '<div id="gErr" style="display:none;border-radius:10px;background:#fff1f2;padding:9px 11px;color:#c43b4d;font-size:.8rem;font-weight:700;"></div>' +
          '<button id="gGo" style="margin-top:3px;padding:13px;border:none;border-radius:12px;background:linear-gradient(135deg,#4388ef,#2868d2);color:#fff;font-weight:850;font-size:.94rem;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px rgba(52,120,229,.20);">' +
            (hi ? 'डेमो शुरू करें →' : 'Start Demo →') +
          '</button>' +
        '</div>' +
        '<div style="margin-top:15px;text-align:center;font-size:.73rem;line-height:1.55;color:#718096;">🔒 ' +
          (hi ? 'आपकी जानकारी निजी रखी जाती है।' : 'Your details are kept private.') +
          ' <a href="/' + locale() + '/privacy" style="color:#3478e5;font-weight:750;text-decoration:none;">' +
          (hi ? 'Privacy Policy' : 'Privacy Policy') + '</a></div>' +
      '</div>';

    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";

    document.getElementById("gGo").addEventListener("click", function () {
      var name = document.getElementById("gName").value.trim();
      var phone = document.getElementById("gPhone").value.replace(/\D/g, "");
      var email = document.getElementById("gEmail").value.trim();
      var err = document.getElementById("gErr");

      function fail(message) {
        err.textContent = message;
        err.style.display = "block";
      }

      if (name.length < 3) return fail(hi ? "कृपया पूरा नाम दर्ज करें।" : "Please enter your full name.");
      if (!/^[6-9]\d{9}$/.test(phone)) return fail(hi ? "सही 10-अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail(hi ? "सही ईमेल दर्ज करें।" : "Please enter a valid email address.");

      var u = {name:name, phone:phone, email:email, ts:Date.now()};
      try { localStorage.setItem(KEY, JSON.stringify(u)); } catch (e) {}
      logVisit(u);

      this.textContent = hi ? "डेमो खुल रहा है..." : "Opening demo...";
      this.disabled = true;

      setTimeout(function () {
        ov.remove();
        document.body.style.overflow = "";
      }, 450);
    });
  }

  function init() {
    var u = getUser();
    if (u) {
      u.repeat = true;
      logVisit(u);
    } else {
      showGate();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
