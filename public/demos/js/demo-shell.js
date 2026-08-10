(function(){
  "use strict";

  function currentLocale(){
    try{
      var params=new URLSearchParams(location.search);
      var q=params.get("lang");
      if(q==="hi"||q==="en") return q;
      var ref=document.referrer||"";
      if(ref.indexOf("/hi/")!==-1) return "hi";
      var saved=localStorage.getItem("sm_locale");
      if(saved==="hi") return "hi";
    }catch(e){}
    return "en";
  }

  function demoTitle(){
    var raw=(document.title||"Live Demo")
      .replace(/\s*[—|-]\s*SystemMaster.*$/i,"")
      .trim();
    return raw||"Live Demo";
  }

  function forceLightTheme(){
    if(!document.querySelector('link[data-sm-demo-light]')){
      var link=document.createElement("link");
      link.rel="stylesheet";
      link.href="css/demo-light.css";
      link.setAttribute("data-sm-demo-light","true");
      document.head.appendChild(link);
    }
    document.documentElement.classList.add("sm-demo-light");
    if(document.body) document.body.classList.add("sm-demo-light");
    try{
      localStorage.setItem("theme","light");
      localStorage.setItem("sm_demo_theme","light");
    }catch(e){}
  }

  function goBack(portfolioUrl){
    var ref=document.referrer||"";
    if(ref && ref.indexOf(location.origin)===0){
      history.back();
      return;
    }
    location.href=portfolioUrl;
  }

  function cleanLegacyLinks(locale){
    var portfolioUrl="/"+locale+"/portfolio";
    var contactUrl="/"+locale+"/contact";
    var homeUrl="/"+locale;

    document.querySelectorAll("a").forEach(function(a){
      var href=(a.getAttribute("href")||"").trim();
      if(!href) return;

      if(href==="contact.html" || /\/contact\.html$/i.test(href)){
        a.setAttribute("href",contactUrl);
        a.removeAttribute("target");
      }
      if(href==="index.html" || /\/index\.html$/i.test(href)){
        a.setAttribute("href",homeUrl);
        a.removeAttribute("target");
      }
      if(href==="projects.html" || /\/projects\.html$/i.test(href)){
        a.setAttribute("href",portfolioUrl);
        a.removeAttribute("target");
      }

      // Internal SystemMaster links stay in the same tab.
      var resolved=a.href||"";
      if(resolved.indexOf(location.origin)===0){
        a.removeAttribute("target");
        a.removeAttribute("rel");
      }
    });
  }

  function createShell(){
    if(document.getElementById("sm-demo-shell")) return;

    var locale=currentLocale();
    var isHi=locale==="hi";
    var portfolioUrl="/"+locale+"/portfolio";
    var contactUrl="/"+locale+"/contact";
    var homeUrl="/"+locale;

    forceLightTheme();
    cleanLegacyLinks(locale);

    var shell=document.createElement("div");
    shell.id="sm-demo-shell";
    shell.className="sm-demo-shell";
    shell.innerHTML=
      '<div class="sm-demo-shell__inner">'+
        '<button type="button" id="sm-demo-back" class="sm-demo-shell__btn sm-demo-shell__btn--secondary">'+
          (isHi?'← वापस':'← Back')+
        '</button>'+
        '<a class="sm-demo-shell__brand" href="'+homeUrl+'" aria-label="SystemMaster">'+
          '<img class="sm-demo-shell__logo" src="/logo/systemmaster.png" alt="SystemMaster">'+
          '<span class="sm-demo-shell__brand-copy">'+
            '<span class="sm-demo-shell__name">SystemMaster</span>'+
            '<span class="sm-demo-shell__sub">Automations</span>'+
          '</span>'+
        '</a>'+
        '<span class="sm-demo-shell__separator" aria-hidden="true"></span>'+
        '<div class="sm-demo-shell__context">'+
          '<div class="sm-demo-shell__eyebrow"><span class="sm-demo-shell__dot"></span>'+
            (isHi?'इंटरैक्टिव लाइव डेमो':'Interactive Live Demo')+
          '</div>'+
          '<div class="sm-demo-shell__title">'+escapeHtml(demoTitle())+'</div>'+
        '</div>'+
        '<div class="sm-demo-shell__actions">'+
          '<a class="sm-demo-shell__btn sm-demo-shell__btn--secondary" href="'+portfolioUrl+'">'+
            (isHi?'पोर्टफोलियो':'Portfolio')+
          '</a>'+
          '<a class="sm-demo-shell__btn sm-demo-shell__btn--primary" href="'+contactUrl+'">'+
            (isHi?'ऐसा सिस्टम बनवाएँ ↗':'Build Similar System ↗')+
          '</a>'+
        '</div>'+
      '</div>';

    document.body.insertBefore(shell,document.body.firstChild);

    var back=document.getElementById("sm-demo-back");
    if(back) back.addEventListener("click",function(){goBack(portfolioUrl);});

    // Remove old marketing chrome and duplicate floating buttons from legacy pages.
    document.querySelectorAll(".site-header,.site-footer").forEach(function(el){
      el.setAttribute("aria-hidden","true");
    });

    try{localStorage.setItem("sm_locale",locale);}catch(e){}
  }

  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];
    });
  }

  forceLightTheme();

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",createShell);
  }else{
    createShell();
  }
})();
