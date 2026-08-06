/* ============================================================
   SystemMaster — Shared Branding & UI Helpers
   1) PDF branding: header band (logo + contacts), footer on
      every page, faint logo watermark on every page.
   2) Excel branding rows.
   3) KPI value auto-fit: long values (e.g. Rs 6,69,410) shrink
      to fit their card automatically — on every page.
   ============================================================ */
var SM_BRAND = {
  name:  "SystemMaster Automations",
  tag:   "Workflow & ERP Solutions",
  email: "Connect@systemmaster.in",
  phone: "+91 90279 65956",
  web:   "www.systemmaster.in",
  logo:  null
};

/* Load logo once and cache as dataURL (same-origin, safe for canvas) */
function smLoadLogo(cb){
  if (SM_BRAND.logo) return cb();
  var img = new Image();
  img.onload = function(){
    try{
      var c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext("2d").drawImage(img, 0, 0);
      SM_BRAND.logo = c.toDataURL("image/png");
    }catch(e){}
    cb();
  };
  img.onerror = function(){ cb(); };
  img.src = "logo/systemmaster.png";
}

/* Draw branded header on current page. Returns Y where content should start. */
function smBrandHeader(doc, title, subtitle){
  var W = doc.internal.pageSize.getWidth();
  doc.setFillColor(10, 20, 40);
  doc.rect(0, 0, W, 24, "F");
  if (SM_BRAND.logo){ try{ doc.addImage(SM_BRAND.logo, "PNG", 8, 3, 18, 18); }catch(e){} }
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text(SM_BRAND.name, 30, 10);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(208, 216, 234);
  doc.text(SM_BRAND.tag + "   |   " + SM_BRAND.email + "   |   " + SM_BRAND.phone + "   |   " + SM_BRAND.web, 30, 16);
  doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.setTextColor(31, 95, 214);
  doc.text(title, 8, 33);
  if (subtitle){
    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(110, 118, 140);
    doc.text(subtitle, 8, 39);
  }
  return 44;
}

/* Apply faint logo watermark + branded footer to EVERY page. Call last. */
function smBrandFinish(doc){
  var n = doc.getNumberOfPages();
  for (var i = 1; i <= n; i++){
    doc.setPage(i);
    var W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight();
    if (SM_BRAND.logo && doc.saveGraphicsState){
      try{
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.05 }));
        var s = Math.min(W, H) * 0.55;
        doc.addImage(SM_BRAND.logo, "PNG", (W - s) / 2, (H - s) / 2, s, s);
        doc.restoreGraphicsState();
      }catch(e){}
    }
    doc.setDrawColor(220, 224, 232); doc.setLineWidth(0.2);
    doc.line(8, H - 11, W - 8, H - 11);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(120, 128, 150);
    doc.text(SM_BRAND.name + "  ·  " + SM_BRAND.email + "  ·  " + SM_BRAND.phone + "  ·  " + SM_BRAND.web, 8, H - 6);
    doc.text("Page " + i + " of " + n, W - 8, H - 6, { align: "right" });
  }
}

/* Branded heading rows for Excel exports */
function smExcelBrandRows(reportTitle){
  return [
    [SM_BRAND.name + " — " + reportTitle],
    [SM_BRAND.tag + "  |  " + SM_BRAND.email + "  |  " + SM_BRAND.phone + "  |  " + SM_BRAND.web],
    ["Generated: " + new Date().toLocaleString("en-IN")],
    []
  ];
}

/* ===== "Fully customisable + roles" strip on all demo pages ===== */
function smInsertStrip(){
  var bar = document.querySelector(".demo-bar");
  if (!bar || document.getElementById("smCustomStrip")) return;
  var d = document.createElement("div");
  d.id = "smCustomStrip";
  d.style.cssText = "display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0 18px;padding:10px 14px;border-radius:12px;border:1px dashed rgba(229,169,60,0.45);background:rgba(229,169,60,0.05);font-size:0.84rem;color:var(--silver);";
  d.innerHTML = '⚙️ <b style="color:var(--white);">Fully customisable</b> — every feature, field &amp; workflow is developed as per <b style="color:var(--gold);">your business requirement</b>. &nbsp;·&nbsp; 👤 <b style="color:var(--white);">User &amp; Admin role-based access</b> is supported in every system.';
  bar.parentNode.insertBefore(d, bar.nextSibling);
}

/* ===== KPI value auto-fit (all pages) ===== */
(function(){
  var style = document.createElement("style");
  style.textContent = ".kpi{min-width:0;} .kpi-value{white-space:nowrap;}";
  document.head.appendChild(style);

  function fitOne(el){
    el.style.fontSize = "";
    var fs = parseFloat(getComputedStyle(el).fontSize);
    var guard = 0;
    while (el.scrollWidth > el.clientWidth && fs > 12 && guard < 40){
      fs -= 1; el.style.fontSize = fs + "px"; guard++;
    }
  }
  function fitAll(){ document.querySelectorAll(".kpi-value").forEach(fitOne); }

  var t = null;
  function schedule(){ clearTimeout(t); t = setTimeout(fitAll, 60); }

  function init(){
    smInsertStrip();
    fitAll();
    if ("MutationObserver" in window){
      new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
    }
    window.addEventListener("resize", schedule);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
