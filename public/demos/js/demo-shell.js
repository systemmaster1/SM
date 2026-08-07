
(function(){
  "use strict";

  function currentLocale(){
    try{
      var ref = document.referrer || "";
      if(ref.indexOf("/hi/") !== -1) return "hi";
      var saved = localStorage.getItem("sm_locale");
      if(saved === "hi") return "hi";
    }catch(e){}
    return "en";
  }

  function demoTitle(){
    var raw = (document.title || "Live Demo").replace(/\s*[—|-]\s*SystemMaster.*$/i,"").trim();
    return raw || "Live Demo";
  }

  function createShell(){
    if(document.getElementById("sm-demo-shell")) return;

    var locale = currentLocale();
    var isHi = locale === "hi";
    var portfolioUrl = "/" + locale + "/portfolio";
    var contactUrl = "/" + locale + "/contact";
    var homeUrl = "/" + locale;

    var shell = document.createElement("div");
    shell.id = "sm-demo-shell";
    shell.className = "sm-demo-shell";
    shell.innerHTML =
      '<div class="sm-demo-shell__inner">' +
        '<a class="sm-demo-shell__brand" href="' + homeUrl + '" aria-label="SystemMaster">' +
          '<img class="sm-demo-shell__logo" src="/logo/systemmaster.png" alt="SystemMaster">' +
          '<span class="sm-demo-shell__brand-copy">' +
            '<span class="sm-demo-shell__name">SystemMaster</span>' +
            '<span class="sm-demo-shell__sub">Automations</span>' +
          '</span>' +
        '</a>' +
        '<span class="sm-demo-shell__separator" aria-hidden="true"></span>' +
        '<div class="sm-demo-shell__context">' +
          '<div class="sm-demo-shell__eyebrow"><span class="sm-demo-shell__dot"></span>' +
            (isHi ? 'इंटरैक्टिव लाइव डेमो' : 'Interactive Live Demo') +
          '</div>' +
          '<div class="sm-demo-shell__title">' + escapeHtml(demoTitle()) + '</div>' +
        '</div>' +
        '<div class="sm-demo-shell__actions">' +
          '<a class="sm-demo-shell__btn sm-demo-shell__btn--secondary" href="' + portfolioUrl + '">' +
            (isHi ? '← पोर्टफोलियो' : '← Portfolio') +
          '</a>' +
          '<a class="sm-demo-shell__btn sm-demo-shell__btn--primary" href="' + contactUrl + '">' +
            (isHi ? 'ऐसा सिस्टम बनवाएँ ↗' : 'Build Similar System ↗') +
          '</a>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(shell, document.body.firstChild);

    // Old legacy navigation should never look like the current website.
    var oldHeader = document.querySelector(".site-header");
    if(oldHeader) oldHeader.setAttribute("aria-hidden","true");

    var oldFooter = document.querySelector(".site-footer");
    if(oldFooter) oldFooter.setAttribute("aria-hidden","true");

    // Rewrite old relative contact CTAs so they return to the new Next.js website.
    document.querySelectorAll('a[href="contact.html"]').forEach(function(a){
      a.setAttribute("href", contactUrl);
    });
    document.querySelectorAll('a[href="index.html"]').forEach(function(a){
      a.setAttribute("href", homeUrl);
    });
    document.querySelectorAll('a[href="projects.html"]').forEach(function(a){
      a.setAttribute("href", portfolioUrl);
    });

    try{ localStorage.setItem("sm_locale", locale); }catch(e){}
  }

  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",createShell);
  }else{
    createShell();
  }
})();
