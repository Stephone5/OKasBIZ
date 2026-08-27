/*!
 * <okc-atlas> — Oklahoma City nine-quadrant atlas as a self-contained custom element.
 *
 *   <script type="module" src="/okc-atlas.element.js"></script>
 *   <okc-atlas></okc-atlas>
 *
 * Everything renders inside a shadow root, so this element's CSS cannot reach the rest
 * of your site and your site's CSS cannot reach it. No dependencies, no build step.
 * The only network call is the Google Fonts stylesheet; set FONTS to "" to skip it and
 * the element falls back to your page's fonts.
 *
 * The same data also sits in ./data/*.json if you would rather query it than render it.
 */
const FONTS = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

const CSS  = "\n:host{\n  --ink:#0F1B24; --ink-soft:#31434F; --paper:#E8EDEF; --paper-2:#DCE4E7;\n  --card:#F5F8F9; --rule:#9FB3BD; --rule-faint:#C3D0D6;\n  --signal:#E0A32E; --brick:#B4413A; --field:#2E7D5B;\n  --r-lg:16px; --r-md:11px; --r-sm:7px; --r-pill:999px;\n}\n*{box-sizing:border-box}\nhtml,body{margin:0;padding:0}\nbody{background:var(--paper);color:var(--ink);font-family:'IBM Plex Sans',system-ui,sans-serif;\n  font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}\nbody::before{content:\"\";position:fixed;inset:0;pointer-events:none;z-index:0;\n  background-image:linear-gradient(var(--rule-faint) 1px,transparent 1px),\n    linear-gradient(90deg,var(--rule-faint) 1px,transparent 1px);\n  background-size:64px 64px;opacity:.3}\n.wrap{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:0 28px 90px}@media(max-width:48rem){.wrap{padding:0 16px 90px}}\nmark{background:rgba(224,163,46,.45);color:inherit;padding:0 2px;border-radius:4px}\n\nheader.mast{padding:32px 0 6px}\n.kicker{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.18em;\n  text-transform:uppercase;color:var(--ink-soft);margin:0 0 8px}\nh1{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(34px,6vw,56px);\n  line-height:.95;margin:0 0 8px;text-transform:uppercase}\nh1 em{font-style:normal;color:var(--signal)}\n.dek{max-width:62ch;color:var(--ink-soft);margin:0}\n\n.doors{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin:24px 0 22px}\n.door{text-align:left;background:var(--card);border:1px solid var(--rule);border-radius:var(--r-lg);\n  padding:16px 18px;cursor:pointer;transition:.14s;color:var(--ink)}\n.door:hover{border-color:var(--ink);background:#fff}\n.door[aria-selected=\"true\"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}\n.door[aria-selected=\"true\"] p{color:#A9BCC5}\n.door:focus-visible{outline:3px solid var(--signal);outline-offset:2px}\n.door b{display:block;font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:21px;\n  text-transform:uppercase;letter-spacing:.04em;line-height:1.1;margin-bottom:4px}\n.door p{margin:0;font-size:13px;color:var(--ink-soft);line-height:1.45}\n\n.sechead{display:flex;align-items:baseline;gap:12px;margin:0 0 10px;flex-wrap:wrap}\nh2{font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;font-size:21px;\n  letter-spacing:.06em;margin:0;font-weight:700}\n.note{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink-soft)}\n\n.panel{background:var(--card);border:1px solid var(--rule);border-radius:var(--r-lg);\n  padding:16px 18px;margin-bottom:16px}\n.fam{margin-bottom:14px}\n.fam h4{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;letter-spacing:.05em;\n  text-transform:uppercase;color:var(--ink);margin:0 0 10px;padding-bottom:5px;\n  border-bottom:1px solid var(--rule-faint)}\n.subhead{display:flex;gap:9px;align-items:baseline;flex-wrap:wrap;margin:11px 0 7px}\n.subhead span{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.12em;\n  text-transform:uppercase;color:var(--ink-soft)}\n.subhead em{font-style:normal;font-size:11.5px;color:var(--rule)}\n.chip.rec{border-style:dashed}\n.chip.rec.on{border-style:dashed;background:var(--ink-soft);border-color:var(--ink-soft)}\n.fam{padding-bottom:18px}\n.fam:last-child{padding-bottom:0}\n\n.chips{display:flex;gap:7px;flex-wrap:wrap}\n.chip{font-family:'IBM Plex Sans',sans-serif;font-size:13px;padding:7px 13px;border-radius:var(--r-pill);\n  border:1px solid var(--rule);background:transparent;color:var(--ink-soft);cursor:pointer;\n  transition:.11s;display:inline-flex;gap:7px;align-items:center}\n.chip:hover:not(:disabled){border-color:var(--ink);color:var(--ink);background:#fff}\n.chip.on,.chip[aria-pressed=\"true\"]{background:var(--ink);color:var(--paper);border-color:var(--ink)}\n.chip:disabled{opacity:.34;cursor:not-allowed}\n.chip:focus-visible{outline:3px solid var(--signal);outline-offset:2px}\n.cov{font-family:'IBM Plex Mono',monospace;font-size:10px;opacity:.65}\n\n.stackstrip{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\n.stackchip{display:inline-flex;align-items:center;gap:9px;background:var(--ink);color:var(--paper);\n  border-radius:var(--r-pill);padding:7px 8px 7px 15px;font-size:13px}\n.stackchip b{font-family:'Barlow Condensed',sans-serif;font-size:16px;text-transform:uppercase;\n  letter-spacing:.04em;font-weight:600}\n.stackchip span{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#A9BCC5}\n.xbtn{background:#24384A;border:none;color:#C3D0D6;border-radius:var(--r-pill);width:22px;height:22px;\n  cursor:pointer;font-size:11px;line-height:1;padding:0}\n.xbtn:hover{background:var(--brick);color:#fff}\n.btn{font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.05em;\n  font-size:14px;font-weight:600;padding:8px 15px;border:1px solid var(--rule);background:transparent;\n  color:var(--ink-soft);cursor:pointer;border-radius:var(--r-pill);transition:.12s}\n.btn:hover{border-color:var(--ink);color:var(--ink);background:#fff}\n.btn.sm{font-size:12.5px;padding:6px 13px}\n.btn:focus-visible{outline:3px solid var(--signal);outline-offset:2px}\n\n.mapframe{margin:4px 0 20px}\n.hwy-top,.hwy-bot{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;\n  font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.05em;color:var(--ink-soft);\n  text-align:center;text-transform:uppercase}\n.hwy-top{margin-bottom:5px} .hwy-bot{margin-top:5px}\n.maprow{display:flex;align-items:stretch;gap:6px}\n.hwy-side{writing-mode:vertical-rl;font-family:'IBM Plex Mono',monospace;font-size:10px;\n  letter-spacing:.05em;color:var(--ink-soft);text-transform:uppercase;display:flex;align-items:center;\n  justify-content:center;padding:2px}\n.hwy-side.left{transform:rotate(180deg)}\n.qgrid{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;border:2px solid var(--ink);\n  border-radius:var(--r-lg);padding:6px;background:var(--paper-2)}\n.qtile{text-align:left;cursor:pointer;border:1px solid var(--rule);background:var(--card);\n  border-radius:var(--r-md);padding:11px 12px 12px;min-height:110px;display:flex;flex-direction:column;\n  gap:2px;transition:.12s;color:var(--ink)}\n.qtile:hover{border-color:var(--ink);background:#fff}\n.qtile[aria-pressed=\"true\"]{background:var(--ink);border-color:var(--ink);color:var(--paper)}\n.qtile[aria-pressed=\"true\"] .qsub,.qtile[aria-pressed=\"true\"] .qstat{color:#A9BCC5}\n.qtile:focus-visible{outline:3px solid var(--signal);outline-offset:2px}\n.qid{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:26px;line-height:1}\n.qname{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:14px;text-transform:uppercase;\n  letter-spacing:.04em;line-height:1.15}\n.qsub{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--ink-soft);line-height:1.4}\n.qstat{font-family:'IBM Plex Mono',monospace;font-size:9.5px;color:var(--ink-soft);margin-top:auto}\n\n.thead{display:grid;gap:12px;padding:0 15px 7px;align-items:end}\n.th{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;\n  color:var(--ink-soft);text-align:left}\n.th.num{text-align:right}\n.zrow{display:grid;gap:12px;align-items:center;padding:12px 15px;cursor:pointer;background:var(--card);\n  border:1px solid var(--rule-faint);border-radius:var(--r-md);margin-bottom:7px;transition:.1s}\n.zrow:hover{background:#fff;border-color:var(--ink)}\n.zrow.muted{opacity:.62;border-style:dashed}\n.zrow:focus-visible{outline:3px solid var(--signal);outline-offset:1px}\n.zzip{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:16px}\n.qrank{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--ink-soft);letter-spacing:.1em}\n.qtitle{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:21px;line-height:1.05;\n  text-transform:uppercase;letter-spacing:.03em}\n.ztag{font-size:12px;color:var(--ink-soft);line-height:1.35;margin-top:2px}\n.num{font-family:'IBM Plex Mono',monospace;font-size:13px;text-align:right}\n.num .na{color:var(--rule);font-size:11px}\n.num .val{display:inline-block}\n.pctl{display:inline-block;margin-left:8px;font-size:10px;color:var(--ink-soft);background:var(--paper-2);\n  border-radius:var(--r-pill);padding:1px 6px;min-width:26px;text-align:center}\n.split{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--ink-soft);margin:16px 0 9px;\n  padding-left:2px;line-height:1.6}\n\n.fcard{background:var(--card);border:1px solid var(--rule-faint);border-radius:var(--r-md);\n  padding:13px 16px;margin-bottom:7px}\n.fmeta{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-bottom:6px}\n.tagpill{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.07em;text-transform:uppercase;\n  padding:3px 9px;border-radius:var(--r-pill);background:var(--paper-2);color:var(--ink-soft);\n  border:1px solid var(--rule-faint)}\nbutton.tagpill{cursor:pointer}\nbutton.tagpill:hover{border-color:var(--ink);color:var(--ink)}\n.tagpill.q{background:var(--ink);color:var(--paper);border-color:var(--ink)}\n.ftext{font-size:14px;line-height:1.55;margin:0}\n.empty{padding:26px 4px;color:var(--ink-soft);font-size:13.5px;line-height:1.65;max-width:70ch}\n\n.pill{font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;padding:3px 8px;\n  letter-spacing:.04em;white-space:nowrap;color:#fff;border-radius:var(--r-pill)}\n.g-a{background:var(--field)} .g-b{background:#4C8C6E} .g-c{background:var(--signal);color:var(--ink)}\n.g-d{background:var(--brick)} .g-n{background:var(--rule);color:var(--ink)}\n\n#q{width:100%;font-family:'IBM Plex Mono',monospace;font-size:15px;padding:12px 18px;\n  border:2px solid var(--ink);background:var(--card);color:var(--ink);border-radius:var(--r-pill)}\n#q:focus{outline:3px solid var(--signal);outline-offset:2px}\n#q::placeholder{color:#7C8F99}\n\n.scrim{position:fixed;inset:0;background:rgba(15,27,36,.55);z-index:900;opacity:0;pointer-events:none;\n  transition:.18s}\n.scrim.on{opacity:1;pointer-events:auto}\n.drawer{position:fixed;top:0;right:0;height:100%;width:min(680px,100%);z-index:901;background:var(--paper);\n  border-left:2px solid var(--ink);transform:translateX(100%);transition:transform .22s ease;\n  overflow-y:auto;padding:0 24px 60px;border-radius:var(--r-lg) 0 0 var(--r-lg)}\n.drawer.on{transform:translateX(0)}\n.dhead{position:sticky;top:0;background:var(--paper);padding:20px 0 12px;border-bottom:2px solid var(--ink);\n  margin-bottom:18px;z-index:2}\n.dclose{position:absolute;top:20px;right:0;background:none;border:1px solid var(--rule);\n  border-radius:var(--r-pill);font-family:'IBM Plex Mono',monospace;font-size:12px;padding:6px 12px;\n  cursor:pointer;color:var(--ink)}\n.dclose:hover{border-color:var(--ink)}\n.dtitle{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:30px;text-transform:uppercase;\n  line-height:1;margin:0 74px 4px 0}\n.dsub{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink-soft);letter-spacing:.05em}\n.dsec{margin-bottom:22px}\n.dsec h4{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;\n  color:var(--ink-soft);margin:0 0 9px;padding-bottom:5px;border-bottom:1px solid var(--rule-faint)}\n.dstats{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:7px}\n.dstat{background:var(--card);border:1px solid var(--rule-faint);border-radius:var(--r-sm);padding:9px 11px}\n.dstat b{display:block;font-family:'IBM Plex Mono',monospace;font-size:15px;font-weight:600}\n.dstat span{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft)}\n.dlist{margin:0;padding:0;list-style:none}\n.dlist li{padding:8px 0 8px 16px;border-bottom:1px solid var(--rule-faint);font-size:13.5px;\n  position:relative;line-height:1.45}\n.dlist li::before{content:\"\";position:absolute;left:0;top:15px;width:7px;height:2px;background:var(--signal);\n  border-radius:2px}\n.dlist li:last-child{border-bottom:none}\n.bound{font-family:'IBM Plex Mono',monospace;font-size:12px;display:grid;grid-template-columns:auto 1fr;\n  gap:5px 14px;margin:0}\n.bound dt{color:var(--ink-soft);letter-spacing:.08em;text-transform:uppercase;font-size:10px;padding-top:2px}\n.bound dd{margin:0}\n.caveat{font-size:12.5px;color:var(--ink-soft);border-left:3px solid var(--signal);padding:9px 13px;\n  background:rgba(224,163,46,.08);border-radius:0 var(--r-sm) var(--r-sm) 0;line-height:1.6}\n\n.cmppick{display:flex;gap:14px;align-items:end;flex-wrap:wrap}\n.cmppick>div{flex:1 1 210px;min-width:0}\n.cmppick .vs{flex:0 0 auto;font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;\n  font-size:16px;color:var(--ink-soft);padding-bottom:9px;letter-spacing:.1em}\n.cmppick label{display:block;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.12em;\n  text-transform:uppercase;color:var(--ink-soft);margin-bottom:6px}\n.cmppick select{width:100%;font-family:'IBM Plex Sans',sans-serif;font-size:14px;padding:10px 12px;\n  border:1px solid var(--rule);border-radius:var(--r-pill);background:#fff;color:var(--ink)}\n.cmppick select:focus-visible{outline:3px solid var(--signal);outline-offset:2px}\n.cmpgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px}\n.cmphead{background:var(--ink);color:var(--paper);border-radius:var(--r-md);padding:13px 16px}\n.cmphead b{display:block;font-family:'Barlow Condensed',sans-serif;font-size:23px;\n  text-transform:uppercase;letter-spacing:.03em;line-height:1.05}\n.cmphead span{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:#A9BCC5}\n.cmptable{width:100%;border-collapse:separate;border-spacing:0;background:var(--card);\n  border:1px solid var(--rule-faint);border-radius:var(--r-md);overflow:hidden;margin-bottom:22px}\n.cmptable th,.cmptable td{padding:10px 14px;border-bottom:1px solid var(--rule-faint);text-align:left}\n.cmptable tr:last-child th,.cmptable tr:last-child td{border-bottom:none}\n.cmptable th{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.08em;\n  text-transform:uppercase;color:var(--ink-soft);font-weight:400;width:30%}\n.cmptable td{font-family:'IBM Plex Mono',monospace;font-size:13px;width:35%}\n.cmptable td.lead{background:rgba(224,163,46,.16);font-weight:600}\n.cmptable td .na{color:var(--rule);font-size:11px}\n.basis{display:block;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);\n  margin-top:2px;opacity:.75}\n.catblock{margin-bottom:18px}\n.catblock>h3{font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;font-size:17px;\n  letter-spacing:.05em;margin:0 0 8px;display:flex;gap:10px;align-items:baseline}\n.catblock>h3 .n{font-family:'IBM Plex Mono',monospace;font-size:10.5px;color:var(--ink-soft)}\n.cmpcol{display:flex;flex-direction:column;gap:7px}\n.cmpcol .fcard{margin:0}\n.cmpcol .none{background:transparent;border:1px dashed var(--rule-faint);border-radius:var(--r-md);\n  padding:12px 15px;font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--rule)}\n@media (max-width:760px){.cmpgrid{grid-template-columns:1fr}}\n\n.drill{background:var(--paper-2);border:1px solid var(--rule);border-radius:var(--r-md);\n  padding:14px 18px;margin:-3px 0 9px}\n.drillsec{margin-bottom:14px}\n.drillsec:last-of-type{margin-bottom:0}\n.drillsec h5{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;\n  text-transform:uppercase;color:var(--ink-soft);margin:0 0 7px;display:flex;gap:8px;align-items:baseline}\n.drillsec h5 span{background:var(--ink);color:var(--paper);border-radius:var(--r-pill);\n  padding:1px 8px;font-size:10px;letter-spacing:0}\n.det{color:var(--ink-soft);font-size:12px}\n.none{font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--rule);margin:0}\n.kindgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;margin-bottom:8px}\n.kindcard{background:var(--card);border:1px solid var(--rule-faint);border-radius:var(--r-md);\n  padding:13px 16px}\n.kindcard.bare{background:transparent;border-style:dashed}\n.kindcard h5{font-family:'Barlow Condensed',sans-serif;text-transform:uppercase;font-size:16px;\n  letter-spacing:.05em;margin:0 0 8px;display:flex;gap:8px;align-items:baseline}\n.kindcard h5 span{font-family:'IBM Plex Mono',monospace;font-size:11px;background:var(--ink);\n  color:var(--paper);border-radius:var(--r-pill);padding:1px 8px}\n.kindcard.bare h5 span{background:var(--rule);color:var(--ink)}\n.kindcard .dlist li{font-size:13px;padding:6px 0 6px 14px}\n.kindcard .dlist li::before{top:13px}\n.basis{display:block;font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-soft);\n  opacity:.8;margin-top:1px}\n\nfooter{margin-top:46px;padding-top:18px;border-top:2px solid var(--ink);\n  font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--ink-soft);line-height:1.75}\n\n@media (max-width:900px){\n  .qtile{min-height:92px;padding:9px} .qid{font-size:20px} .qname{font-size:11px} .qsub{font-size:9px}\n  .hwy-side,.hwy-top,.hwy-bot{font-size:8px}\n  .thead{display:none}\n  .zrow{grid-template-columns:1fr 1fr!important;gap:8px}\n  .zrow>div:first-child{grid-column:1/-1}\n  .num{text-align:left}\n  .drawer{padding:0 16px 60px;border-radius:0}\n}\n@media (prefers-reduced-motion:reduce){*{transition:none!important}}\n"
const HTML = "<div class=\"wrap\">\n\n<header class=\"mast\">\n  <p class=\"kicker\">Oklahoma City \u00b7 nine highway-bounded quadrants \u00b7 31 areas \u00b7 29 research categories</p>\n  <h1>Section <em>Atlas</em></h1>\n\n</header>\n\n<div class=\"doors\" role=\"tablist\">\n  <button class=\"door\" id=\"mode-build\" role=\"tab\" aria-selected=\"true\">\n    <b>Build a question</b>\n    <p>Pick what you want a lot of, or a little of. All nine quadrants line up against it.</p></button>\n  <button class=\"door\" id=\"mode-place\" role=\"tab\" aria-selected=\"false\">\n    <b>Start with a quadrant</b>\n    <p>Its road boundaries, its ZIPs, everything named inside it, every finding.</p></button>\n</div>\n\n<div id=\"pane-build\">\n  <div class=\"panel\">\n    <div class=\"sechead\"><h2>Pick your conditions</h2></div>\n    <div id=\"shelf\"></div>\n  </div>\n  <div id=\"stack\" style=\"margin-bottom:20px\"></div>\n  <div id=\"tableOut\"></div>\n</div>\n\n<div id=\"pane-place\" hidden>\n  <div class=\"mapframe\">\n    <div class=\"hwy-top\"><span>Kilpatrick Tpke</span><span>Kilpatrick Tpke</span><span>Kilpatrick Tpke</span></div>\n    <div class=\"maprow\">\n      <div class=\"hwy-side left\">Kilpatrick \u00b7 I-44 \u00b7 I-35</div>\n      <div class=\"qgrid\" id=\"qgrid\"></div>\n      <div class=\"hwy-side\">SH-74 \u00b7 Broadway \u00b7 I-35 \u00b7 Sooner</div>\n    </div>\n    <div class=\"hwy-bot\"><span>SH-152 \u00b7 I-240</span><span>I-240</span><span>I-240</span></div>\n  </div>\n  <div id=\"placeOut\"></div>\n</div>\n\n<footer>\n  Nine quadrants, bounded by the highways listed on each one. Quantities count named items in the\n  research, so they are a floor. Figures are averaged across the ZIPs that fall inside a quadrant,\n  and every one shows how many of those ZIPs it rests on.\n</footer>\n</div>"

class OKCAtlas extends HTMLElement {
  connectedCallback(){
    if(this._up) return; this._up = true;
    if(FONTS && !document.querySelector("link[data-okc-atlas-fonts]")){
      const l = document.createElement("link");
      l.rel = "stylesheet"; l.href = FONTS; l.setAttribute("data-okc-atlas-fonts","");
      document.head.appendChild(l);
    }
    const root = this.attachShadow({mode:"open"});
    const doc = document;
    const style = doc.createElement("style"); style.textContent = CSS;
    const mount = doc.createElement("div"); mount.className = "okc-root";
    mount.innerHTML = HTML;
    root.append(style, mount);
    boot(root, doc);
  }
}

function boot(root, doc){
  const Q = {
  Q1:{id:"Q1",name:"Northwest Rim",pos:1,
   sub:"Bethany · Warr Acres · Yukon",
   b:{n:"Kilpatrick Turnpike",e:"SH-74 (Lake Hefner Pkwy)",s:"Route 66 / NW 39th Expwy",w:"Kilpatrick Turnpike (west leg)"},
   zips:["73008","73132","73099"],
   character:"Four city halls, two counties, three school districts. Growth is entirely at the western end; Bethany is shrinking.",
   anchors:["Southwestern Christian University, 7210 NW 39th Expwy — private four-year, 336 full-time undergrads, 10-acre campus, Intl Pentecostal Holiness Church","Rockwell Industrial Park, N Rockwell — small-bay flex tied to Wiley Post Airport, suites 1,800–3,500 SF, 90/10 warehouse-office","Wiley Post Airport","Putnam City school district administration (in Warr Acres)","Express Clydesdales · Railroad Museum · AMC West End Pointe 8"],
   facts:["Warr Acres incorporated Feb 1948 after Bethany tried to annex it. 10,452 people in 2020, up 4.1% from 2010.","Woodlawn Park is doubly enclaved: 0.12 sq mi, 160 residents, peaked at 220 in 1970, zero commercial development. Bethany and OKC provide its services.","Bethany is 5.2 sq mi, fully surrounded by OKC, approaching build-out, and declining at about 0.49% a year.","Yukon grows 2.95% a year. Founded 1891 by A.N. Spencer, named for the Yukon River during the Klondike rush.","NW 39th Expressway is Bethany's commercial spine at 20,000–30,000 vehicles a day. Total leasable commercial inventory in Bethany: 21 spaces, 29,336 SF. The comprehensive plan calls the corridor financially stagnant.","Oklahoma Czech Festival, Yukon — first Saturday of October since 1966, 22,000–30,000 attendees, claimed largest free outdoor festival in the state. 2026 is the 60th and a registered Route 66 Centennial event.","Czech Hall (NRHP, built 1899, rebuilt 1925) has held weekly dances since 1925.","Yukon TIF #1: $37 million, sales/use/hotel increment, established March 2014, expires 2039."],
  },
  Q2:{id:"Q2",name:"Nichols Hills Wedge",pos:2,
   sub:"Nichols Hills · The Village",
   b:{n:"Kilpatrick Turnpike",e:"Broadway Extension",s:"Route 66 / NW 39th Expwy",w:"SH-74 (Lake Hefner Pkwy)"},
   zips:["73116","73120"],
   character:"The metro's wealth concentration and its densest retail. Built out; development means redevelopment.",
   anchors:["Penn Square Mall — 1,083,937 SF, 145 stores, 5 anchors, Simon 94.5% owner. Opened 1960, enclosed 1982, $100M renovation 1988.","Classen Curve + The Triangle + Nichols Hills Plaza — 290,598 SF combined at roughly $500/SF annual sales. Apple, Lululemon, Whole Foods in their only Oklahoma locations.","Chisholm Creek — 180-acre mixed-use at Western & Memorial. Top Golf, Cabela's, iFLY, Argon apartments (280 units), St. Anthony Healthplex, Shops at Market Street.","Love's Travel Stops headquarters (The Village)","Casady School (The Village)"],
   facts:["Nichols Hills was created in fall 1928 when ten clapboard shacks went up overnight so G.A. Nichols's business partners could claim legal residency and petition for incorporation the next day. Lot sales reportedly topped $1M in the first week.","Designed by Hare & Hare of Kansas City across a 2,780-acre development. Roads were curved deliberately; commercial districts were placed only at the perimeter, and that zoning still holds.","Depression-era investors defaulted and petitioned OKC to annex the town. OKC refused.","Nichols Hills city: median household income $207,567, poverty 2.77%, population 3,870.","Fire ISO Class 2 with 15 career firefighters running 700–800 calls a year, plus automatic aid from The Village.","73120 has the smallest average household in the study at 2.03 people. Family households there earn a median $97,721 against $45,620 for nonfamily households.","12901 N Western: a 50-acre former nursery bought for $7.6M with a $350M mixed-use pitch. Nothing built. The city placed a lien in 2024 after a dozen complaints. 13,000 vehicles pass it daily.","Quail Springs Mall is at 35.61333 N — north of the Kilpatrick, outside this quadrant."],
  },
  Q3:{id:"Q3",name:"Northeast Quarter",pos:3,
   sub:"Forest Park · Lake Aluma · Smith Village",
   b:{n:"Kilpatrick Turnpike",e:"I-35",s:"Route 66 / NW 39th Expwy",w:"Broadway Extension"},
   zips:["73111","73114","73131"],
   character:"The quadrant is splitting, not moving together: 73111 has lost 14% of its population since 2000 while 73131 holds the study's highest share of $200k+ households.",
   anchors:["Adventure District, NE 50th & MLK — OKC Zoo (1,900+ animals, 119 acres), Science Museum Oklahoma, Remington Park Racetrack & Casino, National Cowboy & Western Heritage Museum, USA Softball Hall of Fame Complex, 45th Infantry Division Museum, Cinemark, OmniDome","NEOKCR Small Business Accelerator — eight cohorts to date","Henrietta B. Foster Center for Northeast Small Business Development — $15M from MAPS 4, in the formerly segregated YMCA building","Millwood School District · W.K. Jackson Leadership Academy · Parkview Adventist Academy","Boomtown OKC — 19 acres at NE MLK and NE 63rd, volleyball facility, phases opening 2025"],
   facts:["Adventure District claims 10M+ annual visitors; OKCRetail cites 3.3M. Within 3 miles: 19,613 residents, 25,311 workers, average household income $36,780.","Smart Saver at NE 23rd and MLK closed August 2019, leaving northeast OKC without a full grocery store. Six dollar stores operate in 73111 alone.","The Market at Eastpoint opened spring 2021 — ~7,000 SF at 1708 NE 23rd, run by RestoreOKC with Homeland, seeded by a $300,000 Life.Church investment.","A 2016 Lynn Institute study found higher morbidity in every major disease than the rest of the state, and an 18-year life-expectancy gap against citywide averages.","Northeast Renaissance TIF: $62M project costs across Increment Districts #9 and #15, expecting to stimulate at least $355M in private investment ($120M affordable residential, $235M retail/commercial).","Lake Aluma is the only 100%-rural municipality in the study: 0.28 sq mi, 87 people, 37 households, 90% of residents in management or professional work, no commercial development.","Forest Park incorporated in 1956 after an OKC annexation attempt. Median age 55.3; 31.6% over 65.","Pivot, 201 NE 50th, is the only shelter inside the quadrant — ages 16–24 only, three surge beds during the Nov 2025 freeze.","Only two bank branches sit in 73111, both KeyBank. 73114's six branches cluster on the western edge along Britton and the Broadway Extension.","Industrial here is small-bay: 35 listed spaces averaging 21,904 SF at $10.00/SF, including 2023 new construction in 73111."],
  },
  Q4:{id:"Q4",name:"West Corridor",pos:4,
   sub:"West OKC · Yukon edge · Canadian County",
   b:{n:"Route 66 / NW 39th Expwy",e:"I-44",s:"I-40",w:"Kilpatrick Turnpike"},
   zips:["73127"],
   character:"Young, growing, working-poor family quadrant with the largest for-sale development land north of I-40 and no business-support institution inside its boundaries.",
   anchors:["Westgate Marketplace, 6400 W Reno — CBRE calls it a top-tier super-regional destination; I-40 is the sole western collector for retail trade into the metro","Westgate Office Commerce Center, 10401 W Reno — 183 acres across 9 lots, $6,000,000, no pipelines or easements, for sale (not ground lease)","Celestica / 7725 Connect, 7725 W Reno — telephone and telegraph apparatus, formerly Lucent","NTT Data · Paycom · Alliance Steel (8600 W Reno) · Love Box Co · Kirby-Smith Machinery · Pro-Fab (airframe components)","Francis Tuttle Reno Campus, 7301 W Reno","Workforce Community Hope Center + Work Ready Oklahoma, 7201 NW 10th — colocated public workforce hub","Reaching Our City food pantry, 7710 NW 10th — serves fifteen ZIP codes"],
   facts:["Richard Tanenbaum bought the abandoned steel skeleton of a Corning fiber optic plant in 2001, finished it, added a fifth floor, and landed NTT Data there in 2017. He holds 190 acres around it.","Westgate Park Residential: 444 units across 15 buildings on 20 acres, built 2024, from $1,085. Oklahoma City address, Canadian County, Mustang school attendance zone.","CACI, a federal cyber and intelligence contractor, considered the former Western Electric/AT&T plant at Council and Reno — 550 jobs averaging $56,999. Incentives: ~$575,000 forgivable loan plus $800,000 payment.","73127 splits 66.31% Oklahoma County / 33.69% Canadian County — the most evenly split ZIP in the study.","SBDC coverage splits at that county line: UCO serves the Oklahoma County side, CV Tech's El Reno campus serves the Canadian County side. Two businesses two miles apart fall under different service territories.","Southwestern Christian University ran a two-thousand-student campus at 4700 NW 10th through the 1970s, one of the largest private junior colleges in the country. It sold the campus in 1981, moved four miles north, and enrollment fell to forty.","5.7% of housing units lack complete plumbing and 6.2% lack complete kitchens — the highest deficiency rates in the study area.","39% of the foreign-born population is Honduran. Canadian County farms average 346 acres against Oklahoma County's 93.","Rudy Construction, 2104 N MacArthur: $5,250,106 across 11 Army Corps contracts — the largest federal contract holder in the ZIP.","No TIF district covers this quadrant."],
  },
  Q5:{id:"Q5",name:"Uptown & Plaza",pos:5,
   sub:"Uptown 23rd · Plaza District · Asian District · Paseo",
   b:{n:"Route 66 / NW 39th Expwy",e:"I-235 / Broadway",s:"I-40",w:"I-44"},
   zips:["73106","73103","73118","73112","73107"],
   character:"An employment center with a small, single, renting, non-family population on top of it. The clearest measured gentrification signal in the study.",
   anchors:["Oklahoma City University, NW 23rd & Blackwelder — 104 acres, 2,982 students, 788 employees, founded 1904 by Anton H. Classen","OSU–Oklahoma City, 900 N Portland — 110 acres, 4,134–4,949 students, open admissions","INTEGRIS Baptist Medical Center, 3300 NW Expwy — INTEGRIS system headquarters, 16 hospitals statewide","INTEGRIS Baptist North Portland, 5501 N Portland — 238 beds, founded 1931 by the Free Methodist Church as Deaconess","Chesapeake Energy / Expand Energy, 6100 N Western — corporate headquarters","Shepherd Center, 2401 NW 23rd — 714,312 SF of office in the former first enclosed mall in OKC","Townsco Contracting, 1704 NW 6th — $36.9M across 124 federal contracts","Plaza District Association + Plaza Business Alliance, 1745 NW 16th"],
   facts:["73106 holds 571 business establishments employing 10,966 people on a $730,103,000 annual payroll — a near 1:1 jobs-to-residents ratio found nowhere else.","Average AGI in 73106 moved from $28,990 (2004) to $43,149 (2012) to $57,853 (2020) while EITC claims fell from 35.3% of returns to 20.4%.","3,010 of 73106's 6,243 housing units were built 1939 or earlier — the oldest stock in the study — now carrying a $335,596 median value against $222,100 statewide.","Racial home-value spread in 73106 is $211,556, from $416,910 (White non-Hispanic) to $205,354 (two or more races). Q4's spread is about $41,000.","Shepherd Mall opened November 1964 as OKC's first fully enclosed mall on land George Shepherd claimed in the 1889 land run. All anchors gone by 2003.","Plaza District Association has worked NW 16th since 1997 — starting with living-room meetings and weekend weed pulling — and reports over $17 million in investment and 60+ businesses, run by 1 full-time and 3 part-time staff. Over 1 million visitors a year.","Lyric Theatre bought and restored the Plaza Theatre in 2005, which is credited with the district's turn.","RAPID NW, the metro's only BRT, crossed 1 million riders on Dec 25, 2025 — 1,400 a day on a 9.5-mile corridor, roughly 15% of EMBARK's weekday boardings.","Chesapeake's well count fell from ~14,900 (2018) to 7,400 (2021) to 5,000 (2024). The Anadarko Basin position disappears from the filings between 2018 and 2021.","17 full-service bank branches across five ZIPs. First National Bank of Oklahoma at 5101 N Western holds $196,746K in deposits; Regent Bank at 1900 NW Expwy holds $159,029K.","439 people were counted in emergency and transitional shelters in 73106 group quarters in 2010. Two of the nine churches in the ZIP are urban ministries rather than congregations.","Four Classen Corridor TIF increment districts plus the Core to Shore area. Only quadrant with a single city government and a single county across its whole area."],
  },
  Q6:{id:"Q6",name:"Capitol & Health Center",pos:6,
   sub:"State Capitol · OU Health · Innovation District · Deep Deuce",
   b:{n:"Route 66 / NW 39th Expwy",e:"I-35",s:"I-40",w:"I-235 / Broadway"},
   zips:["73104","73105","73117","73102"],
   character:"The most institutionally dense quadrant in the study — and the one holding both the newest high-value housing and the lowest-income ZIP anywhere in it.",
   anchors:["Oklahoma State Capitol, 2300 N Lincoln — 452,508 SF, built 1917, dome completed 2002, NHL","OU Health University of Oklahoma Medical Center, 700 NE 13th — 773 staffed beds, ~5,200 employees, Level I trauma, only comprehensive academic hospital in the state","Oklahoma Children's Hospital — only Level I pediatric trauma center in Oklahoma","OU Health Sciences Center — 200 acres, 19 buildings, 800 academic and 2,400 administrative staff, 4,000 students, one of four US health centers with seven professional colleges","Stephenson Cancer Center — one of 70 NCI-designated centers · Harold Hamm Diabetes Center","Oklahoma City Innovation District, 300 NE 9th — $76.7M MAPS 4 budget","Convergence at NE 8th & I-235 — 5.5 acres, 230,000 SF Class A tower, Innovation Hall, both completed 2025, by Gardner Tanenbaum","Oliver Hodge Building, 2500 N Lincoln — State Dept of Education, 376 employees, $3.1B budget","Oklahoma City National Memorial & Museum, 620 N Harvey — 350,000 visitors a year","Continental Resources, 20 N Broadway · The Petroleum Alliance, 500 NE 4th"],
   facts:["OMES manages roughly two million square feet of state property. The Lincoln Boulevard buildings itemized in the study total over 1.03 million SF on their own.","The $364 million, 456,000 SF patient bed tower — 144 beds and 32 operating rooms — was the largest hospital expansion in Oklahoma history and the first ground-up construction at OU Medical Center since 1975. Designed by Perkins + Will, shaped like a butte.","73104 holds the study's worst crime grade (D+, index 179) and a $341,300 median home value on housing built mostly in the 2000s.","73117 is the only ZIP in the study classified Lower Class, at $23,413 median household income.","Deep Deuce was the largest African-American downtown neighborhood in OKC in the 1940s and 50s and the hottest jazz and blues center in the region by the late 1920s. It produced Charlie Christian, Jimmy Rushing and Ralph Ellison. Four NRHP buildings survive.","Zelia N. Page Breaux taught Christian and Rushing at Douglass High School, then at NE 6th and High.","Downtown holds six individual TIF districts. The Downtown/MAPS district expires in 2026 with an expected $20 million surplus.","Core to Shore is authorized for up to $528 million after an April expansion into Capitol Hill.","10 full-service bank branches plus a loan production office sit within 0.3 miles in 73102 — the densest banking cluster in the state.","The Heartland Flyer, running since June 1999 at 80,876 riders in FY2025, lost Texas and Oklahoma funding in April 2026 and is scheduled to stop August 31, 2026.","Scissortail Park: 70 acres, Upper and Lower connected by the Skydance Bridge over I-40. Lower Park completed Fall 2022.","MAPS 4 stadium: 8,000 seats on nine acres that held the Producers Cooperative Oil Mill for decades. A $30M gap was covered from existing TIF balances.","Downtown housing plan targets 375% unit growth by 2060. A John Rex Charter high school is targeted for Fall 2027."],
  },
  Q7:{id:"Q7",name:"Airport Wedge",pos:7,
   sub:"Will Rogers · FAA · Air National Guard",
   b:{n:"I-40",e:"H.E. Bailey / I-44",s:"SH-152 (Airport Rd / SW 15th)",w:"SH-4 (Mustang Road)"},
   zips:["73179","73108"],
   character:"The only quadrant with both a major federal civilian campus and an active military flying mission. Subsidized through federal grants and ground leases, not TIF.",
   anchors:["FAA Mike Monroney Aeronautical Center — 6,300 federal employees, contractors and students; 133 buildings on ~1,100 acres; second largest employer in OKC, fourth in the state; $1.65B annual impact, $356M+ payroll","Will Rogers Air National Guard Base — 137th Special Operations Wing, plus 137th SOG, 137th AES, 137th SOSS, 146th ASOS, 185th SOS and active-duty 17th SOS. OA-1K Skyraider IIs on the flightline March 2026.","Will Rogers World Airport — $89.8M East Concourse (150,000 SF, 4 gates), $115M revenue bond authorization, AAR 80,000 SF hangar operational Jan 2026 with 200 jobs","OKC Logistics Park, SW 29th & Council — 1,006,931 SF on 58 acres","OKC Outlets, 7624 W Reno — 394,661 SF, 87–94 stores, opened Aug 2011","SW 29th industrial spine — ClimateMaster, CECO Door, Cameron, FMC Energy, Air Liquide, Big D Industries, Eaton, Dana, Nabors Drilling","Regional Food Bank of Oklahoma HQ, 3355 S Purdue — 825+ programs, 53 counties, 136,000+ Oklahomans weekly","INTEGRIS Community Hospital OKC West, 300 S Rockwell — 22,475 SF, opened June 2019","99s Museum of Women Pilots — largest women aviator collection in the world"],
   facts:["Foreign Trade Zone 106 Site 1 covers 1,091 acres inside the Will Rogers complex.","No TIF district covers this quadrant. Subsidy runs through FAA and state aerospace grants, airport revenue bonds, FTZ duty deferral, and below-market ground leases. Tulsa International uses dedicated increment districts; OKC has not.","Two ZIPs, one boundary, same school district, opposite worlds: 73108 sits at 36.3% poverty with an $89,707 median home value and 55% Spanish-speaking households; 73179 sits at 4.1% poverty with a $305,360 median home value.","73179 grew 165.7% in the 1990s, the fastest-growing residential ZIP in the study. 73128 grew 47.4% from 2018–2023.","86% of 73108's foreign-born population is Honduran. 45% of 73179's is Thai, 16% Malaysian, 14% Liberian.","No emergency shelter bed exists inside the quadrant despite the Regional Food Bank being headquartered here.","With SH-152 as the south line, Lariat Landing (SW 59th to SW 104th) falls entirely outside — as does Metro Tech's Aviation Campus at 5600 S MacArthur.","Oklahoma County agriculture: 1,111 farms on 102,861 acres, down 23% since 2017, net cash farm income negative $10.96M."],
  },
  Q8:{id:"Q8",name:"South Side",pos:8,
   sub:"Capitol Hill · Stockyards · Wheeler",
   b:{n:"I-40",e:"Sooner Road / I-35",s:"I-240",w:"I-44 / H.E. Bailey"},
   zips:["73109","73129","73119","73139"],
   character:"The metro's working-industrial and labor-supply quadrant, and the origin of its industrial economy. Largest household sizes, lowest educational attainment, lowest cost of living.",
   anchors:["Oklahoma National Stockyards — world's largest stocker and feeder cattle market, 500,000+ head a year, $1B+ annual economic impact, 130+ direct jobs, nine commission firms","INTEGRIS Southwest Medical Center, 4401 S Western — 406 beds, Level II trauma, opened 1965","Santa Fe South Schools, HQ inside Crossroads Mall — 4,620 students across 10 schools, largest brick-and-mortar charter district in Oklahoma","Crossroads Mall / Plaza Mayor, I-35 & I-240 — 60–63 acres, I-2 zoned, bought for ~$9M by the Crossroads Renewal Project","Calle Dos Cinco / Historic Capitol Hill, 319 SW 25th — Main Street since 1997, $14.8M reinvestment","RIVERSPORT Adventures & Rapids — $45M whitewater center, USRowing National High Performance Center, 2028 Olympic canoe slalom venue","Wheeler District — 158 acres on the south bank, Santa Monica Ferris wheel","Wynn Construction, 1312 S Walker — $27,847,131 across 78 federal contracts","ARK Ramos Foundry, 1321 S Walker · Central Oklahoma Produce · Fred Jones Truck Shop"],
   facts:["The stockyards opened October 3, 1910. Morris & Co. employed nearly 10% of the city's workforce in a town of 60,000. Together the early packing plants meant $3.5M invested and 2,400 jobs — OKC's first major industrial installation.","Peak: a million head a year by the early 1980s, the number one cattle market in the nation. Over a hundred million head have passed through since 1910.","Part of the historic district was considered for a county jail site.","Capitol Hill was an incorporated city from 1904 — before statehood — until OKC annexed it in 1911 for $12,000. It still keeps its own chamber, newspaper and downtown on Commerce Street.","73109 is 65.5% Hispanic; only 44.0% of residents speak English at home; 79% of the foreign-born are Honduran.","Home values by race are inverted here: Asian $152,852 and Black $122,008 both exceed White non-Hispanic at $110,817.","Largest families in the study: 774 five-person, 249 six-person, and 244 seven-or-more-person households. Highest carpool rate at 20.6%.","Lowest educational attainment in the study: 62.4% high school or higher, 7.6% bachelor's.","Crossroads Mall opened Feb 13, 1974 as one of the ten largest malls in the United States and closed October 31, 2017. Over 190,000 cars a day pass its frontage.","Santa Fe South Pathways Middle College, on the OCCC campus, was the first middle college program in Oklahoma and was ranked the #1 charter high school in the state by U.S. News in 2023.","Plaza Calle Dos Cinco — $2M, ribbon-cut Sept 24, 2025, funded by ARPA and CDBG through the Strong Neighborhoods Initiative. Fiestas de las Américas draws upwards of 20,000.","A fossil fuel electric power generation establishment with 100–249 employees operates in 73109.","Tinker AFB sits immediately east of Sooner Road: 25,000–30,689 personnel, $4.83B total annual economic impact, largest single-site employer in Oklahoma."],
  },
  Q9:{id:"Q9",name:"East Side",pos:9,
   sub:"Del City · Midwest City · Tinker",
   b:{n:"I-40",e:"Sooner Road",s:"I-240",w:"I-35"},
   zips:["73115","73110","73130","73135","73141","73150","73145"],
   character:"The only quadrant majority-controlled by municipalities other than Oklahoma City, and the only one running its own sustained TIF program. Income runs fourfold west to east.",
   anchors:["Tinker Air Force Base — 25,000–30,689 personnel, 5,033+ acres, 716 buildings, 15.9M SF, $1.76B federal payroll, $4.83B total annual impact. Host of the Air Force Sustainment Center and the OKC Air Logistics Center.","SSM Health St. Anthony Hospital – Midwest, 2825 Parklawn — 255 beds, 860–914 employees, largest employer in Midwest City","Rose State College, 6420 SE 15th — 116 acres, 7,313 students, 632 employees, chartered by public vote in 1968","Mid-Del Public Schools — 14,600+ students, 930 employees","Town Center Plaza (TIF 2006) · Sooner Rose Shopping Center (TIF 2017) · Regal Warren Theatre · 120+ restaurants","Century Martial Arts, 1000 Century Blvd — 220 employees","Walmart Supercenter (389) · Sam's Club (154) · Home Depot (140) · Crest Foods (175)","Mid-Del Career Technology Center · Rose State Fab Lab, open to the public with 3-D printers"],
   facts:["Del City was incorporated Oct 9, 1948, founded by George I. Epperly and named for his daughter Delaphene. It grew as housing for Tinker personnel.","It peaked near 28,500 in the early 1980s and sits at 21,822 today — a 23% decline it has never recovered, caused by the oil bust.","20.4% of Del City workers are public sector, the highest share in the study. There is a Vietnam-era veteran concentration 1.03 times greater than any other conflict.","Del City poverty splits 14.3% White non-Hispanic against 40.7% Black.","73115 has the best housing quality in the study — 0.7% lacking plumbing, 2.2% lacking kitchens — and the most residential stability, with 90% in the same house a year ago.","Del City lost its hometown bank twice in three years: First Continental Bank & Trust failed May 11, 1984, and United Oklahoma Bank was resolved March 17, 1987.","Midwest City covers 25 square miles, holds the greatest concentration of technology companies in Oklahoma, and has attracted Boeing, Pratt & Whitney and Rolls Royce.","Four Midwest City TIF districts since 2006: Town Center Plaza (2006), Sooner Rose (2017), North Side Improvement for industrial (2023), and a proposed I-40 Corridor district (2026) on a 15-acre city-owned tract at SE 29th and Douglas where over 100,000 cars pass daily.","Rose State and Mid-Del Technology Center offer complimentary tuition for most Mid-Del graduates — a debt-free pathway from high school to associate degree.","Income runs from $23,413 in 73117 at the western edge to $92,318 in 73150 at the eastern edge, continuing to $104,601 in Choctaw beyond it.","16+ bank branches plus five credit unions including Tinker Federal — the military economy produces a credit union concentration found nowhere else.","Mid-Del Youth & Family Center, 2801 Parklawn — the metro's dedicated shelter for children and adolescents 0–17."],
  }
  };

  /* ============================ ZIP RECORDS ============================
     inc = median household income · pov = poverty % · home = median home value
     safe = commercial-aggregator safety grade + index · null where not published */
  const Z = [
  {z:"73179",q:"Q7",place:"SW / Airport south",inc:null,pov:4.1,home:305360,rent:19,pop:8673,safe:null,
   tag:"Lowest poverty rate recorded in the study. Grew 165.7% in the 1990s — the fastest-growing residential ZIP found.",
   more:["Foreign-born mix: 45% Thai, 16% Malaysian, 14% Liberian","19% renters","Western Heights school district — the same district as 73108","Regional Food Bank of Oklahoma headquarters at 3355 S Purdue"]},
  {z:"73108",q:"Q7",place:"Stockyards / SW inner",inc:null,pov:36.3,home:89707,rent:62,pop:null,safe:{g:"C",i:151},
   foreign:28.6,tag:"Highest poverty rate in the study at 36.3%, against 4.1% one boundary away in 73179.",
   more:["55% of households speak Spanish","28.6% foreign-born, 86% of them Honduran","62% renters","Same Western Heights district as 73179"]},
  {z:"73132",q:"Q1",place:"Warr Acres / NW",inc:60419,pov:null,home:null,rent:47,pop:28394,safe:null,
   dens:3614,tag:"Density 3,614 per sq mi. Housing stock is mostly 1970s; 53% owner-occupied.",
   more:["Population: 24,910 (2000) → 26,432 (2010) → 28,394 (2024)","30% of residents receive Social Security","2,643 single-parent households; 1,726 households on SNAP"]},
  {z:"73008",q:"Q1",place:"Bethany",inc:57459,pov:20.46,home:null,rent:null,pop:null,safe:null,
   tag:"Bethany is declining about 0.49% a year and approaching build-out at 5.2 sq mi, fully surrounded by OKC.",
   more:["Total leasable commercial inventory: 21 spaces, 29,336 SF","NW 39th Expressway carries 20,000–30,000 vehicles a day","Southern Nazarene University and Southwestern Christian University both sit on or near the 39th Street line"]},
  {z:"73099",q:"Q1",place:"Yukon",inc:88030,pov:8.75,home:304475,rent:null,pop:23630,safe:null,
   dens:890,tag:"Growing 2.95% a year — the growth end of the northwest. Canadian County.",
   more:["26.54 sq mi, density 890 per sq mi, council-manager government","Founded 1891 by A.N. Spencer, named for the Yukon River","Czech Festival draws 22,000–30,000 the first Saturday of October","Yukon TIF #1: $37M, established March 2014, expires 2039"]},
  {z:"73116",q:"Q2",place:"Nichols Hills",inc:81226,pov:6.5,home:null,rent:null,pop:null,safe:null,
   bach:56,commute:18,tag:"Average household income $181,851 and per capita $86,109 — the widest gap between median and average in the study, meaning a heavy top tail.",
   more:["53.5–59% hold a bachelor's degree or higher","Average commute 18 minutes","Nichols Hills city proper: $207,567 median income, 2.77% poverty, 3,870 residents","Classen Curve, The Triangle and Nichols Hills Plaza run about $500/SF in annual sales"]},
  {z:"73120",q:"Q2",place:"Memorial Road corridor",inc:64745,pov:8.4,home:null,rent:null,pop:36530,safe:null,
   hh:2.03,tag:"Smallest average household in the study at 2.03 people across 17,747 households.",
   more:["Family households earn a median $97,721; nonfamily households $45,620","53.3% female","Majority race residing is White; majority race in public schools is African American","1,552 households on SNAP"]},
  {z:"73111",q:"Q3",place:"Northeast / MLK",inc:40340,pov:26.1,home:99000,rent:null,pop:10904,safe:{g:"B-",i:154},
   col:84.9,tag:"Lost roughly 14% of its population since 2000 and carries a 16.62% housing vacancy rate — the highest of any ZIP examined.",
   more:["988 vacant housing units out of 5,946","Per capita income $25,649; family poverty 26.1%","Six dollar stores operate in this ZIP alone; no full grocery store since Smart Saver closed in August 2019","Only two bank branches, both KeyBank","Cost of living index 84.9","Millwood High School, M.L. King Jr Elementary, Thelma R. Parks Elementary, W.K. Jackson Leadership Academy"]},
  {z:"73114",q:"Q3",place:"Britton / N Broadway",inc:54936,pov:23,home:118400,rent:62,pop:null,safe:null,
   dens:1963,tag:"62% renters at a $118,400 median home value. Density 1,963 per sq mi.",
   more:["Six bank branches cluster here on the quadrant's western edge","First Enterprise Bank, Oklahoma Fidelity Bank and BancFirst all operate branches","Primarily Black or African American"]},
  {z:"73131",q:"Q3",place:"Northeast corner",inc:137849,pov:null,home:368825,rent:null,pop:null,safe:null,
   tag:"30.3% of households earn above $200,000 — the highest share recorded anywhere in the study.",
   more:["Average household income $154,880; per capita $61,371","Sits in the same quadrant as 73111, four miles away at $40,340"]},
  {z:"73127",q:"Q4",place:"West OKC",inc:44925,pov:25.9,home:174190,rent:58,pop:26293,safe:{g:"B+",i:139},
   dens:2166,age:31,bach:15.3,unemp:7.0,foreign:20.6,commute:22.0,snap:32,tag:"Youngest median age (30.7–32), highest birth rate (7.6% of women 15–50 gave birth last year), and highest SNAP participation (32%) in the study.",
   more:["Splits 66.31% Oklahoma County / 33.69% Canadian County","40.2% Hispanic; majority race in public schools is Hispanic","20.6% foreign-born, 39% of them Honduran","5.7% of units lack complete plumbing, 6.2% lack complete kitchens — highest deficiency in the study","752 businesses; 7.0% unemployment; 15.3% bachelor's or higher","EITC claimed on 30.9% of returns averaging $2,694","1,477 renter households have no vehicle","Putnam City and Western Heights districts, plus a Mustang attendance zone at Westgate"]},
  {z:"73106",q:"Q5",place:"Uptown / OCU / Asian District",inc:61232,pov:21.3,home:335596,rent:65,pop:12341,safe:{g:"B-",i:134},
   dens:3936,hh:2.0,age:31.4,bach:43.2,unemp:3.2,foreign:16.6,commute:17.9,snap:12.1,tag:"571 businesses employing 10,966 people on a $730M payroll against ~12,000 residents. A near 1:1 jobs-to-residents ratio found nowhere else.",
   more:["3,010 of 6,243 housing units built 1939 or earlier — oldest stock in the study","Median value $335,596 against $222,100 statewide; property taxes $2,671 against $1,672","Average AGI: $28,990 (2004) → $43,149 (2012) → $57,853 (2020)","43.2% bachelor's or higher; 17.8% graduate or professional","3.2% unemployment; 17.9-minute mean commute, shortest in the study","10.7% work at home","Ranks in the 3rd percentile for safety nationally; crime costs $2,446 per resident a year","439 people counted in emergency and transitional shelters (2010 group quarters)","Racial home-value spread of $211,556 — the widest recorded","Foreign-born origins: Honduras 25%, Thailand 20%, El Salvador 9%"]},
  {z:"73103",q:"Q5",place:"Uptown 23rd / Heritage Hills",inc:null,pov:null,home:null,rent:null,pop:4636,safe:{g:"B+",i:155},
   tag:"Best safety grade in the inner city, immediately east of 73106's 3rd-percentile ranking.",
   more:["Uptown 23rd Business Improvement District covers NW 22nd–24th from Broadway to Shartel","NW 23rd carries over 30,000 vehicles a day, among the highest counts in OKC","Tower Theatre, the Gold Dome, the Milk Bottle","Stride Bank at 1225 N Broadway"]},
  {z:"73118",q:"Q5",place:"Crown Heights / Western Ave",inc:null,pov:null,home:null,rent:null,pop:15219,safe:null,
   unemp:3.2,tag:"Seven bank branches within roughly half a mile on Western and Classen. 3.2% unemployment.",
   more:["First National Bank of Oklahoma, 5101 N Western — $196,746K deposits","Regent Bank, 1900 NW Expressway — $159,029K deposits","The only Q5 ZIP where the majority race residing and the majority race in public schools match","Chesapeake / Expand Energy headquarters at 6100 N Western"]},
  {z:"73112",q:"Q5",place:"NW Expressway / May",inc:null,pov:null,home:null,rent:null,pop:34293,safe:{g:"B+",i:126},
   snap:15.3,col:85.8,tag:"Both INTEGRIS hospitals sit here — the system headquarters at 3300 NW Expressway and the 238-bed North Portland campus.",
   more:["16,335 housing units, 9.86% vacant","2,307 households on SNAP (15.3%)","449 births last year, 416 of them to married households","Cost of living index 85.8","Length of stay since moving in is significantly above the state average"]},
  {z:"73107",q:"Q5",place:"Shepherd / Portland",inc:null,pov:null,home:null,rent:null,pop:29393,safe:{g:"B+",i:135},
   unemp:3.6,tag:"Shepherd Center — 714,312 SF of office in what opened in 1964 as the first enclosed mall in Oklahoma City — is effectively the ZIP's entire office vacancy at 116,997 SF.",
   more:["OSU–Oklahoma City, 900 N Portland: 110 acres, 4,134–4,949 students","3.6% unemployment","Majority race residing is White; majority in public schools is Hispanic","Population skews late 20s to early 40s with very few families","Built on George Shepherd's 1889 land run homestead claim"]},
  {z:"73104",q:"Q6",place:"Health Center / Innovation District",inc:null,pov:null,home:341300,rent:null,pop:2151,safe:{g:"D+",i:179},
   tag:"Worst safety grade in the study and a $341,300 median home value on housing built mostly in the 2000s — both at once.",
   more:["OU Medical Center: 773 staffed beds, ~5,200 employees, Level I trauma","OU Health Sciences Center: 200 acres, 800 academic and 2,400 administrative staff, 4,000 students","Innovation District: $76.7M MAPS 4 budget","Convergence: 5.5 acres, 230,000 SF Class A tower plus Innovation Hall, both completed 2025","The Petroleum Alliance at 500 NE 4th","Newest housing stock of any inner-quadrant ZIP","Very few families; rentals most commonly 1 bedroom"]},
  {z:"73105",q:"Q6",place:"State Capitol",inc:null,pov:null,home:null,rent:null,pop:4898,safe:{g:"C-",i:158},
   tag:"The Capitol Complex: 452,508 SF Capitol plus over 1.03 million SF of state office buildings on Lincoln Boulevard.",
   more:["OMES manages roughly two million SF of state property","Oliver Hodge Building — State Dept of Education, 376 employees, $3.1B budget","State Banking Department, 43 employees, $6.2M budget","Governor's Mansion at 820 NE 23rd, built 1928","Oklahoma Bankers Association at 643 NE 41st","18 industrial space listings"]},
  {z:"73117",q:"Q6",place:"Northeast inner / Deep Deuce east",inc:23413,pov:null,home:104506,rent:null,pop:8049,safe:{g:"C-",i:170},
   tag:"The lowest median household income recorded anywhere in the study, and the only ZIP classified Lower Class.",
   more:["Average household income $43,189","Majority race residing and majority race in public schools are both African American","Otwell's — the small family-owned grocery that was the area's only store after Smart Saver closed","Portions also carry Del City and Midwest City postal names"]},
  {z:"73102",q:"Q6",place:"Downtown core",inc:null,pov:null,home:null,rent:null,pop:3029,safe:{g:"B",i:132},
   tag:"Ten full-service bank branches plus a loan production office within 0.3 miles — the densest banking cluster in Oklahoma.",
   more:["Oklahoma City National Memorial & Museum, 620 N Harvey — 350,000 visitors a year","Continental Resources headquarters at 20 N Broadway","Over 13,310,000 SF of leasable office downtown and over 80,000 workers","Santa Fe Depot / Intermodal Hub — $130M MAPS 3 allocation"]},
  {z:"73109",q:"Q8",place:"Capitol Hill",inc:43868,pov:28.4,home:110272,rent:57,pop:21732,safe:{g:"B-",i:139},
   dens:4004,hh:2.8,age:32.4,bach:7.6,unemp:5.5,foreign:26.2,commute:22.6,snap:30,col:84.1,tag:"65.5% Hispanic. Only 44.0% of residents speak English at home. Largest households in the study at 2.8 people.",
   more:["26.2% foreign-born, 79% of them Honduran","Lowest educational attainment in the study: 62.4% high school or higher, 7.6% bachelor's","Lowest cost of living index in the study at 84.1","Home values by race are inverted: Asian $152,852 and Black $122,008 both exceed White non-Hispanic at $110,817","Highest carpool rate at 20.6%","774 five-person, 249 six-person and 244 seven-or-more-person households","Average AGI $30,138 against $63,060 statewide — widest gap in the study","EITC on 31.9% of returns; 18.2% of returns report business profit or loss at +$12,368","Steady growth: 16,821 (1990) → 19,453 (2000) → 20,594 (2010) → 21,732 (2024)","85 people counted in emergency and transitional shelters; 145 in correctional residential facilities","Capitol Hill HS, Capitol Hill ES, Cesar Chavez Alternative MS, Christian Heritage Academy"]},
  {z:"73129",q:"Q8",place:"Southeast / Shields",inc:null,pov:null,home:null,rent:null,pop:null,safe:{g:"B-",i:154},
   tag:"Southeast High School, 5401 S Shields — a magnet school since its 1994 reopening, 848 students.",
   more:["Opened 1950, closed 1990, reopened 1994 with four technology programs requiring application","Students spent their first semester back in makeshift classrooms at the FAA building","Simmons Bank Capitol Hill at 3131 Shields"]},
  {z:"73119",q:"Q8",place:"Southwest",inc:null,pov:null,home:null,rent:null,pop:null,safe:{g:"B",i:126},
   tag:"One of the better safety indices on the south side.",
   more:["Served by the St James Episcopal Church food pantry, which covers nine south-side ZIPs"]},
  {z:"73139",q:"Q8",place:"South / I-240",inc:null,pov:null,home:null,rent:null,pop:null,safe:{g:"B+",i:134},
   tag:"South OKC Chamber of Commerce sits here at 701 SW 74th.",
   more:["Prosperity Bank I-240 Branch at 1245 W I-240 Service Rd","Simmons Bank South Pennsylvania at 9921 S Pennsylvania"]},
  {z:"73115",q:"Q9",place:"Del City",inc:46810,pov:22.6,home:130465,rent:null,pop:21822,safe:null,
   dens:2902,age:34.5,col:85.1,tag:"Best housing quality in the study — 0.7% lacking plumbing, 2.2% lacking kitchens — and the most residentially stable, with 90% in the same house a year ago.",
   more:["Peaked near 28,500 in the early 1980s; never recovered from the oil bust","20.4% of workers are public sector, highest in the study — a direct Tinker effect","Poverty splits 14.3% White non-Hispanic against 40.7% Black","Vietnam-era veteran concentration 1.03 times greater than any other conflict","454 births last year: 187 married, 250 unmarried","Lost its hometown bank twice: First Continental failed May 1984, United Oklahoma resolved March 1987","Arvest has served Del City since 1984; BancFirst, FNB Community and City National also operate branches"]},
  {z:"73110",q:"Q9",place:"Midwest City",inc:51228,pov:20,home:126100,rent:52,pop:33156,safe:null,
   dens:3565,age:34,col:84.7,tag:"2.65% of the entire metro population lives in this one ZIP. Flat at roughly 33,000 across a quarter century.",
   more:["Average household income $65,734; per capita $29,095","659 businesses; average worker earnings $34,719","Among the highest percentages of residents who attended college of any ZIP — the Rose State and Tinker effect","Two school districts: Mid-Del and Oklahoma City Public Schools","563 births last year: 276 married, 287 unmarried","Extremely large number of single parents","Midwest City High School, 213 E Elm — 1,324 students, the Bombers","SSM Health St. Anthony Midwest: 255 beds, 860–914 employees"]},
  {z:"73130",q:"Q9",place:"Midwest City east / Douglas",inc:71189,pov:null,home:null,rent:null,pop:null,safe:null,
   tag:"Average household income $90,772, per capita $37,369.",
   more:["Arvest, FNB Community, First National Bank and Trust, Sooner State Bank and IBC all operate branches on Douglas","Proposed I-40 Corridor TIF centers on a 15-acre city tract at SE 29th and Douglas where over 100,000 cars pass daily"]},
  {z:"73135",q:"Q9",place:"SE / Sooner Road",inc:63478,pov:null,home:196643,rent:null,pop:null,safe:{g:"B+",i:89},
   tag:"Strongest safety index in the eastern half at 89.",
   more:["Average household income $76,794; per capita $30,851","First Command Financial Services at 5605 SE 67th serves the military market"]},
  {z:"73141",q:"Q9",place:"Spencer / NE edge",inc:58670,pov:null,home:132005,rent:null,pop:null,safe:{g:"B-",i:156},
   tag:"The suburban-to-rural transition line. Raw parcels are listed as land here rather than improved property.",
   more:["Average household income $65,002","Spencer proper (73084) carries a $118,478 median home value"]},
  {z:"73150",q:"Q9",place:"Nicoma Park",inc:92318,pov:null,home:345745,rent:null,pop:null,safe:null,
   tag:"Highest median household income in the eastern half of the study at $92,318.",
   more:["Average household income $121,639; per capita $44,989","Choctaw/Nicoma Park Schools; Life Christian Academy at 11601 Jeffords","Very thin market: 5 homes under $350k with a median 197 days on market","Choctaw beyond it: $104,601 median income, $265,600 median home value"]},
  {z:"73145",q:"Q9",place:"Tinker AFB",inc:64856,pov:null,home:null,rent:null,pop:null,safe:null,
   tag:"The base ZIP. 25,000–30,689 personnel, $1.76B federal payroll, $4.83B total annual economic impact.",
   more:["5,033+ acres, 716 buildings, 15.9 million SF, two-runway airfield","Host of the Air Force Sustainment Center — 32,000+ personnel, three-star command","Depot maintenance for the B-1B, E-3, B-52, C/KC-135, E-6B and 25 other aircraft","Average household income $72,031","Named for Maj Gen Clarence L. Tinker of Pawhuska, the first Native American major general and the first American general killed in WWII","Privatized base housing at 5601 Twining Dr"]}
  ];

  /* ================= 29 RESEARCH CATEGORIES, IN SIX FAMILIES =================
     Each category carries the keyword rule used to pull matching findings out of
     the record. Grouping is a browsing aid; the findings themselves are the data. */
  const FAM=[
   {k:"work", label:"Economy & work"},
   {k:"people",label:"People & households"},
   {k:"land",  label:"Land & place"},
   {k:"inst",  label:"Institutions"},
   {k:"move",  label:"Getting around"},
   {k:"risk",  label:"Risk & need"}
  ];
  const CATS=[
   {k:"smallbiz", f:"work", label:"Small businesses",        re:/small business|businesses|establishments|independent|boutique|shopkeep|storefront|self-employ|profit or loss|chamber/i},
   {k:"support",  f:"work", label:"Entrepreneurial support", re:/accelerator|incubator|SBDC|small business development|chamber|Main Street|business alliance|fab lab|workforce|training|Foster Center|NEOKCR|Calle Dos Cinco|Plaza District Association/i},
   {k:"banks",    f:"work", label:"Banks",                   re:/bank|branch|deposits|credit union|FDIC|BancFirst|MidFirst|Arvest|KeyBank|lending/i},
   {k:"employers",f:"work", label:"Large employers",         re:/employe|employer|payroll|workforce|jobs|personnel|staff|headquarters|largest.*employer|[0-9,]+ (?:employees|personnel|staff)/i},
   {k:"industry", f:"work", label:"Industrial",              re:/industrial|manufactur|foundry|warehouse|logistics|distribution|plant|packing|fabricat|plating|smelting|SF of|square feet|truck|freight/i},
   {k:"retail",   f:"work", label:"Retail",                  re:/retail|mall|shopping|store|outlet|grocery|restaurant|Walmart|anchor|leasable|Marketplace|Town Center|Plaza/i},
   {k:"oilgas",   f:"work", label:"Oil & gas",               re:/oil|gas|energy|petroleum|drilling|wells|Chesapeake|Continental|Expand Energy|refin|compressor|oilfield/i},
   {k:"invest",   f:"work", label:"Investment activity",     re:/TIF|increment|MAPS|bond|grant|incentive|invest|redevelop|\$[0-9][0-9,.]*\s*(?:million|billion|M\b)|forgivable|Opportunity Zone|purchased for|acquired/i},

   {k:"residential",f:"people",label:"Residential",          re:/hous(?:ing|e)|home value|renters|apartment|units|mortgage|rent|owner-occupied|median value|plumbing|kitchen|vacan|build-out|subdivision/i},
   {k:"families", f:"people",label:"Families",               re:/famil|household|children|births|single-parent|married|unmarried|kids|grandchild|person household|average household/i},
   {k:"income",   f:"people",label:"Income",                 re:/income|AGI|earnings|salary|wage|per capita|earned income credit|EITC|\$[0-9]{2},[0-9]{3}/i},
   {k:"density",  f:"people",label:"Population density",     re:/density|per sq mi|per square mile|square miles|sq mi|urban|rural/i},
   {k:"growth",   f:"people",label:"Growth & decline",       re:/grow|growth|decline|declin|population|lost|peaked|shrink|increase|rose|fell|since 20|since 19|%\s*(?:from|since)/i},
   {k:"poverty",  f:"people",label:"Poverty",                re:/poverty|SNAP|EITC|below 50%|hardship|food insecur|low-income|disadvantaged/i},

   {k:"farm",     f:"land",  label:"Farm land",              re:/farm|agricultur|cattle|wheat|cropland|pasture|ranch|livestock|acres of farmland|stockyard/i},
   {k:"undev",    f:"land",  label:"Undeveloped land",       re:/acre|vacant land|undeveloped|greenfield|parcel|lot|shovel-ready|assembl|raw land|ground lease|for sale/i},
   {k:"parks",    f:"land",  label:"Parks & water",          re:/park|trail|river|lake|creek|reservoir|refuge|garden|green space|boathouse|whitewater|Scissortail/i},
   {k:"jurisdiction",f:"land",label:"Municipal jurisdiction",re:/incorporat|annex|city hall|municipal|county|city limits|enclave|mayor|council-manager|sq mi|jurisdiction|school district|Del City|Midwest City|Bethany|Yukon|Nichols Hills/i},

   {k:"schools",  f:"inst",  label:"Schools",                re:/school|student|district|elementary|charter|high school|academy|Mid-Del|Putnam City|Millwood|Western Heights|Santa Fe South|graduat/i},
   {k:"colleges", f:"inst",  label:"Universities & colleges",re:/universit|college|campus|enrollment|undergrad|associate degree|tuition|Rose State|OCCC|OCU|OSU|Francis Tuttle|Metro Tech|career tech/i},
   {k:"churches", f:"inst",  label:"Churches",               re:/church|baptist|methodist|pentecostal|catholic|congregation|ministry|A\.M\.E|Nazarene|faith-based|parish/i},
   {k:"hospitals",f:"inst",  label:"Hospitals",              re:/hospital|beds|medical|health|trauma|clinic|INTEGRIS|SSM|OU Health|nursing|physician|Healthplex/i},
   {k:"govmil",   f:"inst",  label:"Government & military",  re:/Capitol|state|federal|FAA|Tinker|Air Force|Guard|base|military|veteran|OMES|agency|Department of|contract|Wing|Squadron|armory|police|fire (?:department|station)/i},

   {k:"landmarks",f:"move",  label:"Landmarks",              re:/landmark|NRHP|historic|museum|monument|memorial|theatre|theater|tower|depot|Route 66|built 1[89]|opened 1[89]|founded 1[89]/i},
   {k:"culture",  f:"move",  label:"Culture & entertainment",re:/festival|museum|theatre|theater|jazz|music|arts|casino|zoo|entertainment|visitors|nightlife|bowling|cinema|attraction|district/i},
   {k:"transit",  f:"move",  label:"Transit",                re:/transit|bus|BRT|streetcar|EMBARK|RAPID|rail|Amtrak|Heartland Flyer|route|ridership|commute|carpool|vehicles a day|VPD/i},
   {k:"airports", f:"move",  label:"Airports & aviation",    re:/airport|aviation|runway|airfield|Will Rogers|Wiley Post|hangar|aerospace|flight|aircraft|concourse|FTZ/i},

   {k:"crime",    f:"risk",  label:"Crime & safety",         re:/crime|safety|safest|percentile|police|offender|index [0-9]|grade [A-F]/i},
   {k:"homeless", f:"risk",  label:"Homelessness & services",re:/homeless|shelter|pantry|food bank|transitional|Point-in-Time|Key to Home|rescue mission|Curbside|beds for|winter shelter/i}
  ];
  const CATBY=Object.fromEntries(CATS.map(c=>[c.k,c]));

  /* ================= FINDINGS INDEX ================= */
  const FACTS=[];
  function pushFact(t,q,zip,kind){
    const cats=CATS.filter(c=>c.re.test(t)).map(c=>c.k);
    FACTS.push({t,q,zip,kind,cats:cats.length?cats:["growth"]});
  }
  Object.values(Q).forEach(q=>{
    pushFact(q.character,q.id,null,"Shape of the quadrant");
    q.anchors.forEach(a=>pushFact(a,q.id,null,"Anchor"));
    q.facts.forEach(f=>pushFact(f,q.id,null,"Finding"));
  });
  Z.forEach(z=>{
    pushFact(z.tag,z.q,z.z,"What stands out");
    (z.more||[]).forEach(m=>pushFact(m,z.q,z.z,"Finding"));
  });
  const catCount=k=>FACTS.filter(f=>f.cats.includes(k)).length;
  const catCountQ=(k,qid)=>FACTS.filter(f=>f.cats.includes(k)&&f.q===qid).length;

  /* ================= RANKABLE MEASURES =================
     Every measure below is a published figure. `hi` names the direction that reads
     as "more of it". Coverage is shown in the UI because most are not published
     for every ZIP. */
  const GRADES=["F","D-","D","D+","C-","C","C+","B-","B","B+","A-","A","A+"];
  const gradeRank=z=>z.safe?Math.max(GRADES.indexOf(z.safe.g),-1):null;
  const MEAS=[
   {k:"inc",   f:"people",label:"Median household income", get:z=>z.inc,  fmt:v=>"$"+v.toLocaleString()},
   {k:"pov",   f:"people",label:"Poverty rate",            get:z=>z.pov,  fmt:v=>v+"%"},
   {k:"pop",   f:"people",label:"Population",              get:z=>z.pop,  fmt:v=>v.toLocaleString()},
   {k:"dens",  f:"people",label:"Population density",      get:z=>z.dens, fmt:v=>v.toLocaleString()+"/sq mi"},
   {k:"hh",    f:"people",label:"Average household size",  get:z=>z.hh,   fmt:v=>v+" people"},
   {k:"age",   f:"people",label:"Median age",              get:z=>z.age,  fmt:v=>v+" years"},
   {k:"snap",  f:"people",label:"SNAP participation",      get:z=>z.snap, fmt:v=>v+"%"},
   {k:"foreign",f:"people",label:"Foreign-born share",     get:z=>z.foreign,fmt:v=>v+"%"},
   {k:"home",  f:"land",  label:"Median home value",       get:z=>z.home, fmt:v=>"$"+v.toLocaleString()},
   {k:"rent",  f:"land",  label:"Renter share",            get:z=>z.rent, fmt:v=>v+"%"},
   {k:"col",   f:"land",  label:"Cost of living index",    get:z=>z.col,  fmt:v=>v+" (US=100)"},
   {k:"safe",  f:"risk",  label:"Safety grade",            get:gradeRank, fmt:(v,z)=>z.safe.g},
   {k:"bach",  f:"inst",  label:"Bachelor's or higher",    get:z=>z.bach, fmt:v=>v+"%"},
   {k:"unemp", f:"work",  label:"Unemployment",            get:z=>z.unemp,fmt:v=>v+"%"},
   {k:"commute",f:"move", label:"Mean commute",            get:z=>z.commute,fmt:v=>v+" min"},
   {k:"findings",f:"work",label:"Total findings on record", get:z=>FACTS.filter(f=>f.zip===z.z||(f.q===z.q&&!f.zip)).length,
     fmt:v=>v+" findings"}
  ];
  CATS.forEach(c=>MEAS.push({
    k:"cat:"+c.k, f:c.f, label:c.label+" on record", cat:true,
    get:z=>{const n=FACTS.filter(f=>(f.zip===z.z||(f.q===z.q&&!f.zip))&&f.cats.includes(c.k)).length;
      return n||null},
    fmt:v=>v+" recorded"
  }));

  const MEASBY=Object.fromEntries(MEAS.map(m=>[m.k,m]));
  const coverage=m=>Z.filter(z=>m.get(z)!=null).length;

  /* percentile position of a ZIP on one measure, 0–100, among ZIPs that publish it */
  function pct(m,z,dir){
    const v=m.get(z); if(v==null) return null;
    const vals=Z.map(x=>m.get(x)).filter(x=>x!=null).sort((a,b)=>a-b);
    if(vals.length<2) return 50;
    const below=vals.filter(x=>x<v).length, equal=vals.filter(x=>x===v).length;
    const p=((below+equal/2)/vals.length)*100;
    return dir==="hi"?p:100-p;
  }

  /* ================= SEARCH ================= */
  const SYN={
   safe:"safety grade crime",safest:"safety grade crime",crime:"safety grade crime",
   rich:"income wealth household",wealthy:"income household",wealthiest:"income household",
   cheap:"home value cost of living",cheapest:"home value cost of living",
   house:"home value housing renters owner",houses:"home value housing",
   home:"home value housing",homes:"home value housing",
   business:"businesses establishments employer chamber",businesses:"establishments employer chamber",
   kids:"school students children elementary",school:"school students district charter",
   schools:"school students district charter",job:"employer employees payroll workforce",
   jobs:"employer employees payroll workforce",work:"employer employees payroll workforce",
   poor:"poverty income SNAP",poverty:"poverty SNAP income",
   spanish:"spanish hispanic honduran language",hispanic:"hispanic spanish honduran latino",
   latino:"hispanic spanish honduran latino",immigrant:"foreign-born honduran thai naturalized",
   food:"grocery pantry food bank restaurant",grocery:"grocery food pantry store",
   transit:"transit bus BRT streetcar EMBARK RAPID route",bus:"transit BRT EMBARK route",
   church:"church baptist methodist ministry congregation",
   park:"park trail river lake recreation",hospital:"hospital beds medical health trauma",
   college:"university college campus students enrollment",
   university:"university college campus students enrollment",
   growing:"growth population grew increase",growth:"growth population grew increase",
   shrinking:"decline lost population",military:"tinker air force base guard FAA federal",
   bank:"bank branch deposits credit union",banks:"bank branch deposits credit union",
   oil:"oil gas energy petroleum drilling wells chesapeake",
   gas:"oil gas energy petroleum",energy:"oil gas energy petroleum chesapeake",
   industrial:"industrial warehouse manufacturing foundry logistics",
   warehouse:"industrial warehouse logistics distribution",
   factory:"industrial manufacturing foundry plant",
   rent:"renters rental housing",renters:"renters rental housing",
   veteran:"veteran military tinker guard",tif:"TIF increment financing",
   retail:"retail mall shopping center stores",mall:"mall retail shopping center",
   airport:"airport aviation FAA runway rogers",aviation:"airport aviation FAA aerospace",
   land:"land acres lot vacant undeveloped parcel",acres:"land acres lot parcel",
   traffic:"vehicles a day VPD traffic corridor",
   art:"museum theatre theater gallery arts festival culture"
  };
  const STOP=new Set(["the","a","an","of","in","for","to","and","is","are","with","on","at","where",
   "what","which","best","most","my","i","me","near","can","should","would","do","does","how","who",
   "there","that","this","its","it","be","have","has","was","were","from","by","or","but","as"]);
  const expand=t=>t.toLowerCase().split(/[^a-z0-9$]+/).filter(w=>w.length>2&&!STOP.has(w))
    .map(w=>{const g=[w];if(SYN[w])g.push(...SYN[w].split(" "));return g});
  const matches=(hay,gs)=>gs.every(g=>g.some(t=>t.length>2&&hay.includes(t)));
  const zipText=z=>[z.z,z.place,z.tag,(z.more||[]).join(" ")].join(" ").toLowerCase();
  const quadText=z=>{const q=Q[z.q];return [q.name,q.sub,q.character,q.anchors.join(" "),
    q.facts.join(" "),Object.values(q.b).join(" ")].join(" ").toLowerCase()};
  const haystack=z=>zipText(z)+" "+quadText(z);
  const factText=f=>(f.t+" "+f.q+" "+(f.zip||"")).toLowerCase();
  function relevance(z,gs){const a=zipText(z),b=quadText(z);let s=0;
    gs.forEach(g=>{let zh=0,qh=0;g.forEach(t=>{if(t.length>2){if(a.includes(t))zh++;if(b.includes(t))qh++}});s+=zh*3+qh});
    return s}
  function factRel(f,gs){const t=factText(f);let s=0;
    gs.forEach(g=>g.forEach(x=>{if(x.length>2&&t.includes(x))s++}));return s}
  function highlight(text,gs){
    if(!gs||!gs.length)return text;
    const terms=[...new Set(gs.flat())].filter(t=>t.length>2).sort((a,b)=>b.length-a.length)
      .map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
    if(!terms.length)return text;
    return text.replace(new RegExp("("+terms.join("|")+")","gi"),"<mark>$1</mark>");
  }
  const money=n=>n==null?null:"$"+n.toLocaleString();
  const gClass=g=>{if(!g)return"g-n";const c=g[0].toLowerCase();return"g-"+(["a","b","c","d"].includes(c)?c:"n")};


  /* =====================================================================
     THE COUNTABLE REGISTRY
     Named things the research actually recorded, filed under the quadrant
     whose highway boundaries contain them. Counts here are counts of named
     items in the record, so they are a floor, not a census.
     ===================================================================== */
  const KINDS=[
   {k:"schools",   f:"inst",  label:"Schools",              one:"school"},
   {k:"colleges",  f:"inst",  label:"Colleges & universities",one:"campus"},
   {k:"hospitals", f:"inst",  label:"Hospitals & clinics",  one:"facility"},
   {k:"churches",  f:"inst",  label:"Churches",             one:"church"},
   {k:"employers", f:"work",  label:"Large employers",      one:"employer"},
   {k:"industrial",f:"work",  label:"Industrial tenants",   one:"tenant"},
   {k:"retail",    f:"work",  label:"Retail centers",       one:"center"},
   {k:"banks",     f:"work",  label:"Bank branches",        one:"branch"},
   {k:"support",   f:"work",  label:"Business support",     one:"organization"},
   {k:"tif",       f:"work",  label:"TIF districts",        one:"district"},
   {k:"cities",    f:"land",  label:"Municipalities",       one:"municipality"},
   {k:"parks",     f:"land",  label:"Parks & water",        one:"park"},
   {k:"landmarks", f:"move",  label:"Landmarks & museums",  one:"landmark"},
   {k:"transit",   f:"move",  label:"Transit lines",        one:"line"},
   {k:"airports",  f:"move",  label:"Airfields",            one:"airfield"},
   {k:"govmil",    f:"inst",  label:"Government & military",one:"installation"},
   {k:"services",  f:"risk",  label:"Shelters & pantries",  one:"site"}
  ];
  const KINDBY=Object.fromEntries(KINDS.map(k=>[k.k,k]));

  /* name · detail — one row per named item found in the research */
  const ENT={
  Q1:{
   schools:[["Putnam City High School","Warr Acres"],["Putnam City School District administration","Warr Acres"]],
   colleges:[["Southwestern Christian University","7210 NW 39th Expwy, Bethany · 336 full-time undergrads, 10 acres"],
     ["Southern Nazarene University","Bethany"]],
   churches:[["Church of the Nazarene congregations","Bethany denominational cluster"]],
   employers:[["Wiley Post Airport operators","N Rockwell"]],
   industrial:[["Rockwell Industrial Park","120 N Rockwell · 6.65 acres, suites 1,800–3,500 SF, 90/10 warehouse-office"]],
   retail:[["NW 39th Expressway corridor","Bethany commercial spine · 20,000–30,000 VPD, 21 spaces, 29,336 SF"]],
   tif:[["Yukon TIF #1","$37M sales/use/hotel · est. March 2014, expires 2039"]],
   cities:[["Bethany","5.2 sq mi, surrounded by OKC, declining 0.49%/yr"],
     ["Warr Acres","10,452 (2020), +4.1% since 2010, incorporated Feb 1948"],
     ["Woodlawn Park","0.12 sq mi, 160 people, doubly enclaved, no commercial development"],
     ["Yukon","23,630 (2020), 26.54 sq mi, Canadian County, +2.95%/yr"]],
   landmarks:[["Czech Hall","NRHP · built 1899, rebuilt 1925, weekly dances since 1925"],
     ["Czech Mural","1989, Bill Firquain"],["Yukon Historical Museum","3-story former school"],
     ["Express Clydesdales",""],["Railroad Museum",""],["Cactus Jack's",""],["AMC West End Pointe 8",""]],
   airports:[["Wiley Post Airport","N Rockwell"]]
  },
  Q2:{
   schools:[["Casady School","The Village"],["Bishop McGuinness High School","Western Avenue District"]],
   hospitals:[["St. Anthony Healthplex","Chisholm Creek"]],
   employers:[["Love's Travel Stops headquarters","The Village"]],
   retail:[["Penn Square Mall","1,083,937 SF · 145 stores, 5 anchors, Simon 94.5%"],
     ["Classen Curve","McClendon / Rand Elliott, opened 2010–11"],
     ["The Triangle",""],["Nichols Hills Plaza","combined 290,598 SF at ~$500/SF annual sales"],
     ["Chisholm Creek","180 acres · Top Golf, Cabela's, iFLY, Shops at Market Street"]],
   banks:[["Branches serving Nichols Hills and The Village","Northwest OKC Chamber banking directory"]],
   cities:[["Nichols Hills","1.98 sq mi, 3,870 (2020), est. 1929, median income $207,567"],
     ["The Village","9,538 (2020)"]],
   landmarks:[["Norman-style entry towers","NW 63rd and Western, G.A. Nichols grand entry"]],
   support:[["Northwest OKC Chamber of Commerce","shared with Q1"]]
  },
  Q3:{
   schools:[["M.L. King Junior Elementary","1201 NE 48th · OKC district"],
     ["Thelma R. Parks Elementary","1501 NE 30th · OKC district"],
     ["W.K. Jackson Leadership Academy","5700 N Kelley Ste A · charter"],
     ["Millwood High School","6718 N MLK Ave · Millwood district"],
     ["Parkview Adventist Academy","4201 N MLK Ave · private"],
     ["Little Light Christian School","3301 N MLK Ave · private"]],
   churches:[["Saint John Church",""],["Union Church",""],["Wildewood Christian Church",""],
     ["Unity Baptist Church",""],["Trinity Presbyterian Church",""],["Temple of Healing",""],
     ["Tabernacle Baptist Church",""],["Saint Mark Baptist Church",""],["Saint Jude Missionary Baptist Church",""]],
   employers:[["Oklahoma City Zoo","1,900+ animals, 500+ species, 119 acres"],
     ["Science Museum Oklahoma",""],["Remington Park Racetrack & Casino",""],
     ["National Cowboy & Western Heritage Museum",""],["USA Softball Hall of Fame Complex","Devon Park"],
     ["Oklahoma City-County Health Department",""],["Cinemark",""]],
   industrial:[["Northeast OKC industrial submarket","35 spaces · avg 21,904 SF at $10.00/SF"]],
   retail:[["The Market at Eastpoint","1708 NE 23rd · ~7,000 SF, RestoreOKC with Homeland"],
     ["Northeast Town Center","NE 36th · $7M, Save-A-Lot anchor"],
     ["North Eastern Shopping Center",""],["Park Estates Shopping Center",""]],
   banks:[["KeyBank","2323 N MLK Ave"],["KeyBank","2501 NE 23rd St"],["KeyBank","13200 N Western Ave"],
     ["First Enterprise Bank","1000 W Britton Rd"],["First Enterprise Motor Bank","1011 NW 92nd St"],
     ["Oklahoma Fidelity Bank","9400 N Broadway Ext"],["BancFirst","702 E Memorial Rd"]],
   support:[["NEOKCR Small Business Accelerator","eight cohorts to date"],
     ["Henrietta B. Foster Center","$15M from MAPS 4, in the formerly segregated YMCA"],
     ["NE Resource Center","1415 NE 23rd St"],["Oklahoma Bankers Association","643 NE 41st St"]],
   tif:[["Northeast Renaissance Increment District #9","$31M, 2015–2041, ad valorem and sales tax"],
     ["Northeast Renaissance Increment District #15","$19M, Sept 2021 – Aug 2046, six noncontiguous areas"]],
   cities:[["Forest Park","1.83 sq mi, 1,049 (2020), incorporated 1956, median age 55.3"],
     ["Lake Aluma","0.28 sq mi, 87 people, 100% rural, incorporated 1952"],
     ["Smith Village","0.027 sq mi, 49 people, founded by Rose Smith"]],
   parks:[["Park Plaza",""],["Oklahoma Veterans Cemetery",""]],
   landmarks:[["National Cowboy & Western Heritage Museum",""],["World of Wings Museum",""],
     ["45th Infantry Division Museum",""],["OmniDome",""]],
   services:[["Pivot","201 NE 50th · ages 16–24, 3 surge beds"]],
   transit:[["EMBARK Route 003",""],["EMBARK Route 018",""]]
  },
  Q4:{
   schools:[["Council Grove ES","7721 W Melrose Ln · Western Heights"],
     ["Greenvale ES","901 Greenvale Rd · Western Heights"],
     ["Mayfield MS","1600 N Purdue · Putnam City"]],
   colleges:[["Francis Tuttle Reno Campus","7301 W Reno · career tech, not degree-granting"]],
   churches:[["Fathers House Church",""],["Our Savior Lutheran Church",""],["Zion Worship Center",""],
     ["Zion Pentecostal Church",""],["Western Oaks Church of the Nazarene",""],
     ["West Tenth Street Baptist Church",""],["Victory Worship Center",""],
     ["Saint Thomas Malunkara Orthodox Church","Indian Orthodox, only one in the study area"],
     ["Saint Johns United Methodist Church",""]],
   employers:[["NTT Data","Westgate One, Sara Rd & Reno"],["Paycom",""],
     ["Celestica","7725 W Reno · formerly Lucent Technologies"],
     ["Kirby-Smith Machinery","6715 W Reno · $1,293,986 in federal contracts"],
     ["Rudy Construction","2104 N MacArthur · $5,250,106, 11 Army Corps contracts"],
     ["Pro-Fab Inc","910 N Morgan Rd · $858,615, airframe and de-icing components"],
     ["Workforce Community Hope Center","7201 NW 10th"],["Work Ready Oklahoma","7201 NW 10th"]],
   industrial:[["Alliance Steel Incorporated","8600 W Reno · metal doors, sash, frames; TRI reporter"],
     ["Love Box Co","305 N Rockwell · corrugated boxes"],
     ["Mail-Well Envelope","501 N Ann Arbor"],
     ["DCI Industries","5716 NW 4th · electroplating; TRI reporter"],
     ["Dresser Industries Security Division","9600 NW 4th"],
     ["Carrier Corporation","6752 Melrose Ln"],["Metro Sign Corporation","$192,724 Air Force"],
     ["Thompson Diesel",""],["Belzona Oklahoma",""],["Darr Equipment",""],
     ["Westgate Office Commerce Center","10401 W Reno · 183 acres, 9 lots, $6,000,000"]],
   retail:[["Westgate Marketplace","6400 W Reno · CBRE top-tier super-regional"],
     ["Westoaks Village Shopping Center",""],["Windsor Hills Shopping Center",""],
     ["MacArthur Plaza",""],["Meridian Plaza",""]],
   support:[["Oklahoma SBDC at UCO","serves the Oklahoma County side"],
     ["SBDC at CV Tech El Reno","serves the Canadian County side"]],
   cities:[["Oklahoma City","99.86% of 73127"],["Bethany","0.14% of 73127"]],
   parks:[["Grove Park",""],["Melrose Park",""],["Lytle Park",""],["Black Park",""],["Harlow Park",""],
     ["Lela Park",""],["Lake Overholser",""],["Stinchcomb Wildlife Refuge",""],["Dolese Youth Park",""]],
   landmarks:[["Oklahoma City Fire Department Station 31",""],["Adventure N' Dreams","5915 NW 23rd"],
     ["David's Sport Center","6301 NW 10th"]],
   services:[["Reaching Our City","7710 NW 10th · pantry serving fifteen ZIP codes"]],
   govmil:[["OCFD Station 31",""]]
  },
  Q5:{
   schools:[["Classen HS of Advanced Studies","1901 N Ellison · OKC district"],
     ["Classen MS of Advanced Studies","1901 N Ellison · OKC district"],
     ["Dove Science Academy","1112 NW 23rd · charter"],
     ["Eugene Field ES","1515 N Klein"],["Gatewood ES","1821 NW 21"],
     ["Astec Charter MS","2401 NW 23rd Ste 39a"],["Astec Charter Elementary","2600 General Pershing Blvd"],
     ["Buchanan Elementary","4126 NW 18th"],["Hawthorne Elementary","2300 NW 15th"],
     ["Mark Twain Elementary","2451 W Main"],["Taft MS","2901 NW 23rd"],
     ["Messiah Lutheran School","3600 NW Expwy · private"]],
   colleges:[["Oklahoma City University","NW 23rd & Blackwelder · 104 acres, 2,982 students, 788 employees"],
     ["OSU–Oklahoma City","900 N Portland · 110 acres, 4,134–4,949 students"]],
   hospitals:[["INTEGRIS Baptist Medical Center","3300 NW Expwy · system HQ, 16 hospitals statewide"],
     ["INTEGRIS Baptist North Portland","5501 N Portland · 238 beds, founded 1931 as Deaconess"],
     ["INTEGRIS BMCO physicians' offices","3435 NW 56 Ste 500"],
     ["Psych Plus Health","4220 N Classen Blvd Ste F"],
     ["A Chance to Change Foundation","5228 Classen Circle"]],
   churches:[["Wesley United Methodist",""],["Victory Assembly of God",""],["University Place Christian",""],
     ["United Methodist Church North",""],["Trinity Baptist",""],["Saint Francis of Assisi",""],
     ["Skyline Urban Ministry","urban ministry, not a congregation"],["Second United Methodist",""],
     ["Presbyterian Urban Mission","urban ministry, not a congregation"]],
   employers:[["Oklahoma City University","788 employees"],
     ["INTEGRIS Baptist Medical Center","system headquarters"],
     ["Chesapeake Energy / Expand Energy","6100 N Western · corporate headquarters"],
     ["OSU–Oklahoma City",""],
     ["Townsco Contracting","1704 NW 6th · $36,912,016 across 124 federal contracts"],
     ["Pureservice Corporation","1528 Linwood · $16,754,337 across 70 contracts"],
     ["Shepherd Center","2401 NW 23rd · 714,312 SF multi-tenant office"]],
   industrial:[["Black & Decker US Inc","1318 Linwood"],
     ["Climate Craft Inc","1427 NW 3rd · Summit Machine Tool / LSB"],
     ["Advance Packaging Co","1814 NW 4th"],
     ["Chemical Products Corporation","419 N Virginia · formal enforcement action"],
     ["All State Electric Motor & Equipment","1839 Linwood"],["Be Mac Transport","115 S Ellison"],
     ["Summit Machine Tool Manufacturing","518 N Indiana"],["EMSCO Electric Supply","1101 W Sheridan"],
     ["Schwab Meat Co","1111 Linwood"]],
   retail:[["Shepherd Center","2401 NW 23rd · opened 1964 as OKC's first enclosed mall, 630,000 SF"],
     ["50 Penn Place","1900 NW Expwy · 185,000 SF, opened 1973"],
     ["Uptown 23rd storefronts","2,000 SF street retail, BID established 2019"],
     ["Century Center Mall",""]],
   banks:[["First National Bank of Oklahoma","5101 N Western · $196,746K deposits"],
     ["Regent Bank","1900 NW Expwy · $159,029K deposits"],
     ["Valliance Bank","1601 NW Expwy"],["First Fidelity Bank","5100 N Classen Blvd"],
     ["International Bank of Commerce","4902 N Western Ave"],["MidFirst Bank","5800 N Western Ave"],
     ["Bank of America","4114 N Classen Blvd"],["Simmons Bank Waterford","6301 Waterford Blvd"],
     ["MidFirst Bank","501 NW Grand Blvd"],["Simmons Bank Classen","2523 N Classen Blvd"],
     ["Chase Bank","2200 N Western Ave"],["IBC Bank Portland","2301 N Portland Ave"],
     ["Bank of Oklahoma Windsor Hills","2601 N Meridian"],["UMB Bank Penn Square","5636 N Pennsylvania"],
     ["Chase Bank","3724 N May Ave"],["InterBank North May","4921 N May Ave"],
     ["Sovereign Bank","3030 NW Expwy Ste 1"],["Prosperity Bank","3333 NW Expwy"],
     ["Stride Bank","1225 N Broadway Ave"],["MidFirst 23rd & May",""]],
   support:[["Plaza District Association","1745 NW 16th · 501c3, working since 1997"],
     ["Plaza Business Alliance","1745 NW 16th · 501c6"],
     ["Uptown 23rd Business Improvement District","est. 2019"]],
   tif:[["Classen Corridor district — NW 36th/Shartel/NW 14th/Blackwelder",""],
     ["Classen Corridor district — NW 23rd/Western/NW 22nd/Classen",""],
     ["Classen Corridor district — NW 11th/Western/NW 7th/Virginia",""],
     ["Classen Corridor district — NW 13th/Harvey/NW 7th/Western",""]],
   cities:[["Oklahoma City","entire quadrant, Oklahoma County only"]],
   parks:[["Highley Park",""],["Military Park",""],["McKinley Park",""],["Harn Park",""],
     ["Fairlawn Cemetery",""],["Hebrew Cemetery",""]],
   landmarks:[["Tower Theatre","construction began 1936"],["The Gold Dome",""],["The Milk Bottle",""],
     ["The Classen","high-rise condominium"],["Plaza Theatre","restored by Lyric Theatre, 2005"],
     ["OCU gothic towers",""]],
   transit:[["RAPID NW","9.5 mi, 32 platforms, 1,400 riders/day, 1M riders by Dec 2025"],
     ["OKC Streetcar Downtown Loop","northern terminus at Midtown"]],
   govmil:[["OCFD Station 1",""],["OCFD Station 10",""]]
  },
  Q6:{
   schools:[["John Rex Charter high school","founding principal recruited for Fall 2027"],
     ["Douglass High School","historically at NE 6th and High, later relocated"]],
   colleges:[["OU Health Sciences Center","200 acres, 19 buildings, 4,000 students, seven professional colleges"]],
   hospitals:[["OU Health University of Oklahoma Medical Center","700 NE 13th · 773 beds, ~5,200 employees, Level I trauma"],
     ["Oklahoma Children's Hospital","only Level I pediatric trauma center in Oklahoma"],
     ["Stephenson Cancer Center","one of 70 NCI-designated centers"],
     ["Harold Hamm Diabetes Center",""],["Dean McGee Eye Institute",""],
     ["Oklahoma Medical Research Foundation",""],["Veterans Affairs Hospital",""],
     ["Oklahoma Blood Institute",""]],
   churches:[["Calvary Baptist Church","NRHP 78002244, Deep Deuce"],
     ["Avery Chapel A.M.E.","Dr. Haywood was a member 61 years"]],
   employers:[["OU Medical Center","~5,200 employees"],
     ["OU Health Sciences Center","800 academic, 2,400 administrative"],
     ["Oklahoma State Capitol","legislature, governor, judiciary and agencies"],
     ["State Department of Education","2500 N Lincoln · 376 employees, $3.1B budget"],
     ["State Banking Department","2900 N Lincoln · 43 employees, $6.2M budget"],
     ["Continental Resources","20 N Broadway"],
     ["Oklahoma City Innovation District","300 NE 9th · ~10 employees, $76.7M MAPS 4"],
     ["The Petroleum Alliance","500 NE 4th Ste 200"]],
   industrial:[["Producers Cooperative Oil Mill site","nine acres, now the MAPS 4 stadium"],
     ["73105 industrial listings","18 spaces"]],
   retail:[["Bricktown","0.27 sq mi · restaurants, hotels, ballpark, canal"],
     ["Automobile Alley","0.025 sq mi · former car dealerships"],
     ["Deep Deuce","independent boutiques and restaurants"]],
   banks:[["Intrust Bank Leadership Square Two","211 N Robinson"],["Arvest Tower","201 Robert S Kerr"],
     ["Valliance Bank Downtown","210 Park Ave"],["Armstrong Bank","115 Park Ave"],
     ["BOKF OKC Downtown","499 W Sheridan"],["International Bank of Commerce","100 Park Ave"],
     ["Prism Bank Park Ave LPO","101 Park Ave · loan production office"],
     ["UMB Bank Downtown","600 N Robinson"],["BancFirst","220 N Broadway"],
     ["JPMorgan Chase","320 N Broadway"],["MidFirst Bank","901 N Lincoln Blvd"],
     ["BancFirst","1111 N Lincoln"],
     ["Federal Reserve Bank of Kansas City, OKC Branch","opened Aug 2, 1920"]],
   support:[["Oklahoma City Innovation District","nonprofit, $76.7M MAPS 4 budget"],
     ["Convergence","NE 8th & I-235 · 5.5 acres, 230,000 SF tower, Innovation Hall, 2025"],
     ["Oklahoma Department of Commerce","adjacent to Convergence"],
     ["State Chamber of Oklahoma","adjacent to Convergence"]],
   tif:[["Downtown/MAPS Tax Increment District","created 2000, expires 2026 with ~$20M surplus"],
     ["Core to Shore Reinvestment Area","authorized to $528M after the April Capitol Hill expansion"],
     ["Four further downtown increment districts","six total downtown"]],
   cities:[["Oklahoma City","entire quadrant, Oklahoma County only"]],
   parks:[["Scissortail Park","70 acres · Upper 40, Lower 30, Skydance Bridge"],
     ["Stiles Park","part of Convergence"],["Depot Park",""],["Oklahoma River","southern edge"]],
   landmarks:[["Oklahoma City National Memorial & Museum","620 N Harvey · 350,000 visitors/yr, NHL"],
     ["Oklahoma State Capitol","452,508 SF, built 1917, dome 2002, NHL"],
     ["Governor's Mansion","820 NE 23rd · built 1928, 13,366 SF"],
     ["Santa Fe Depot","100 S E.K. Gaylord · built 1934, Art Deco"],
     ["Littlepage Hotel Building","NRHP 95001500, Deep Deuce"],
     ["Melvin Luster House","NRHP 83002101, Deep Deuce"],
     ["Haywood Building","331½ NE 2nd Street"],
     ["Oklahoma City Museum of Art",""],["Chickasaw Bricktown Ballpark",""],
     ["Skydance Bridge",""]],
   transit:[["OKC Streetcar Downtown Loop","4.86 mi, 22 stops"],
     ["OKC Streetcar Bricktown Loop","2.04 mi, 9 stops, Fri–Sun"],
     ["Heartland Flyer","206 mi to Fort Worth · 80,876 riders FY2025, ending Aug 31, 2026"],
     ["Santa Fe Intermodal Hub","$130M MAPS 3"]],
   govmil:[["Oklahoma State Capitol","2300 N Lincoln"],
     ["2101 N Lincoln","built 1938, 162,074 SF, completion est. Oct 2026"],
     ["2100 N Lincoln","Supreme Court and Administrative Offices of the Court, 145,500 SF"],
     ["2501 N Lincoln","161,884 SF · Pardon & Parole, Nursing, Charter School Board"],
     ["3115 N Lincoln","93,000 SF · OMES Information Services"],
     ["2920 N Lincoln","8,440 SF · Pharmacy, Dentistry, Veterinary boards"],
     ["Oliver Hodge Building","2500 N Lincoln · State Dept of Education"],
     ["Will Rogers Office Building","2401 N Lincoln · Capitol Improvement Authority"],
     ["Oklahoma National Guard Armory","200 NE 23rd · built 1938 by the WPA"],
     ["Veterans Affairs Hospital","OU campus"],
     ["Oklahoma City National Memorial","3.12 of 3.3 acres federal"]],
   services:[["Key to Home Partnership","city and Homeless Alliance encampment-to-housing program"],
     ["Homeless Alliance Winter Shelter","1601 NW 4th · 300 beds, 3,538 guests in season one"],
     ["City Rescue Mission","800 W California"],["Jesus House",""],
     ["Salvation Army Center of Hope","1001 N Pennsylvania · 120 beds"],
     ["Curbside Chronicle","1M copies sold, 72,000 hours of employment in 2023"]]
  },
  Q7:{
   colleges:[["FAA Academy","training, not degree-granting"]],
   hospitals:[["INTEGRIS Community Hospital OKC West","300 S Rockwell · 22,475 SF, opened June 2019"]],
   employers:[["FAA Mike Monroney Aeronautical Center","6,300 employees · 133 buildings, ~1,100 acres, $1.65B impact"],
     ["Will Rogers World Airport",""],["AAR","80,000 SF hangar, 200 jobs, operational Jan 2026"],
     ["ClimateMaster","LSB Industries, SW 29th"],["CECO Door Products","ASSA ABLOY, SW 29th"],
     ["Cameron / Cooper Cameron",""],["FMC Energy Systems",""],["Air Liquide",""],
     ["Nabors Drilling USA","5500 S Rockwell"]],
   industrial:[["OKC Logistics Park","SW 29th & Council · 1,006,931 SF on 58 acres"],
     ["2400 S Council","590,950 SF, 100% leased"],["2800 S Council","415,981 SF available"],
     ["Big D Industries",""],["Eaton Corp",""],["Dana Corp",""],["ChemCentral",""],
     ["Foreign Trade Zone 106 Site 1","1,091 acres inside the Will Rogers complex"]],
   retail:[["OKC Outlets","7624 W Reno · 394,661 SF, 87–94 stores, opened Aug 2011"],
     ["Mustang Shopping Center","213K+ SF, on the SH-152 line"],
     ["Silver City Town Center","89K+ SF, on the SH-152 line"],
     ["Mustang Trade Center","141K+ SF, on the SH-152 line"]],
   banks:[["First Fidelity Meridian Ave","1400 S Meridian · $31,488K deposits"]],
   cities:[["Oklahoma City","airport complex and industrial spine"]],
   landmarks:[["99s Museum of Women Pilots","4300 Amelia Earhart Dr · largest women aviator collection in the world"]],
   transit:[["EMBARK Route 11","S 29 St Crosstown · 57 stops, 69% on-time, rank 3 of 34"],
     ["EMBARK Route 9","W Reno Crosstown · 25 stops"]],
   airports:[["Will Rogers World Airport","$89.8M East Concourse, 150,000 SF, 4 gates"],
     ["Will Rogers Air National Guard Base","137th Special Operations Wing"]],
   govmil:[["FAA Mike Monroney Aeronautical Center","6,300 personnel, 4th largest employer in the state"],
     ["Will Rogers Air National Guard Base","137th SOW, 137th SOG, 137th AES, 137th SOSS, 146th ASOS, 185th SOS, 17th SOS"]],
   services:[["Regional Food Bank of Oklahoma","3355 S Purdue · 825+ programs, 53 counties, 136,000+ weekly"]]
  },
  Q8:{
   schools:[["Capitol Hill High School","500 SW 36 · OKC district"],
     ["Capitol Hill ES","2717 S Robinson"],["Cesar Chavez Alternative MS","420 SW 10th"],
     ["Christian Heritage Academy","1139 SW 48th · private"],
     ["U.S. Grant High School","OKC district"],
     ["Southeast High School","5401 S Shields · magnet since 1994, 848 students"],
     ["Santa Fe South Schools","7000 Crossroads Blvd · 4,620 students across 10 schools"],
     ["Santa Fe South Pathways Middle College","on the OCCC campus · #1 charter high school in Oklahoma, 2023"]],
   colleges:[["Oklahoma City Community College","7777 S May · 143 acres, 11,469 students (just south of the I-240 line)"],
     ["OCCC Capitol Hill Center","123 SW 25th"]],
   hospitals:[["INTEGRIS Southwest Medical Center","4401 S Western · 406 beds, Level II trauma, opened 1965"]],
   churches:[["Western Hills Baptist",""],["Walker Avenue Baptist",""],["United Pentecostal Church South",""],
     ["Templo de Alabanza","Spanish-language congregation"],["Sykes Christian Methodist",""],
     ["Sunnyside Baptist",""],["Southwood Baptist",""],["Southwest Tabernacle of Praise",""],
     ["Southwest Freewill Baptist",""]],
   employers:[["Oklahoma National Stockyards","$1B+ annual impact, 130+ direct jobs, nine commission firms"],
     ["INTEGRIS Southwest Medical Center","over 1,000 employees"],
     ["Santa Fe South Schools","4,620 students across 10 campuses"],
     ["Wynn Construction","1312 S Walker · $27,847,131 across 78 federal contracts"],
     ["Evans Enterprises","1536 S Western · $3,374,752"],
     ["Community Action Agency of Oklahoma and Canadian Counties","319 SW 25th"]],
   industrial:[["ARK Ramos Foundry & Manufacturing","1321 S Walker · secondary smelting, TRI reporter"],
     ["Diversified Plating","2109 W Sheridan · two formal enforcement actions"],
     ["American Sanitation","1801 Santa Fe Ave"],["Genuine Parts Co","700 S Western"],
     ["Central Oklahoma Produce","920 SW 2nd"],["Fred Jones Truck Shop","330 SW 2nd"],
     ["Automotive Transportation / Leaseway","616 S Western"],
     ["Crossroads Mall site","60.45–63.31 acres, I-2 zoned, rail-adjacent"]],
   retail:[["Crossroads Mall / Plaza Mayor","I-35 & I-240 · opened 1974, closed 2017, 1,268,000 SF at peak"],
     ["Calle Dos Cinco commercial district","SW 25th · $14.8M reinvestment since 1997"],
     ["Park Terrace Shopping Center",""],["Walker Square",""],["Esplanade Village",""]],
   banks:[["Simmons Bank Capitol Hill","3131 Shields Blvd"],["MidFirst Bank","810 SW 44"],
     ["Simmons Bank South Pennsylvania","9921 S Pennsylvania"],
     ["Prosperity Bank I-240","1245 W I-240 Service Rd"]],
   support:[["Calle Dos Cinco in Historic Capitol Hill","319 SW 25th · Main Street since 1997"],
     ["Capitol Hill Business Improvement District","Walker to Shields, SW 24th to SW 27th"],
     ["South OKC Chamber of Commerce","701 SW 74th"],
     ["OCCC Capitol Hill Center","123 SW 25th"]],
   cities:[["Oklahoma City","predominant, Oklahoma County"],
     ["Capitol Hill","incorporated 1904, annexed 1911 for $12,000, keeps its own chamber and newspaper"]],
   parks:[["Wiley Post Park",""],["Wheeler Park",""],["Vineyard Park",""],["Perez Park",""],
     ["Oliver Park",""],["Lippart Park",""],["Oklahoma River","$53M reclamation completed 2004"],
     ["RIVERSPORT Rapids","$45M, 11 acres"],["Boathouse District","100+ acres"]],
   landmarks:[["Oklahoma National Stockyards","founded October 3, 1910"],
     ["Stockyards City Historic District","Main Street USA program"],
     ["Union Station",""],["Knob Hill Theater","former Oklahoma Opry"],
     ["Plaza Calle Dos Cinco","$2M, ribbon-cut Sept 24, 2025"],
     ["Santa Monica Ferris wheel","relocated to the Wheeler District"],
     ["SandRidge Sky Trail","80 ft, world's tallest adventure course of its kind"]],
   transit:[["EMBARK Route 12",""],["EMBARK Route 13/13N",""]],
   govmil:[["OCFD Station 4",""],["OCFD Station 7",""],["OCFD Station 19",""],["EMSA West Division",""]],
   services:[["Grace Rescue Mission","on the city's overnight provider list"],
     ["St James Episcopal Church pantry","serves nine south-side ZIPs"],
     ["OCCC Food Pantry",""]],
   tif:[["Core to Shore expansion into Capitol Hill","April expansion, authorized to $528M total"]]
  },
  Q9:{
   schools:[["Midwest City High School","213 E Elm · Mid-Del, 1,324 students, the Bombers"],
     ["Mid-Del Public Schools","14,600+ students"],
     ["Mid-Del Career Technology Center","1621 Maple Dr"],
     ["Life Christian Academy","11601 Jeffords Ave, Nicoma Park"],
     ["Cleveland Bailey ES","3301 Sunvalley Dr"],["Country Estates ES","1609 Felix Pl"],
     ["Ridgecrest ES","137 W Ridgewood Dr"],["Midwest City MS","7400 E Reno"],
     ["Midwest City ES","2211 S Midwest Blvd"]],
   colleges:[["Rose State College","6420 SE 15th · 116 acres, 7,313 students, 632 employees, chartered by vote 1968"],
     ["Eastern Oklahoma County Technology Center","4601 N Choctaw Rd"]],
   hospitals:[["SSM Health St. Anthony Hospital – Midwest","2825 Parklawn Dr · 255 beds, 860–914 employees"],
     ["Sienna Extended Care & Rehab","9221 Harmony Dr · 140 employees"]],
   employers:[["Tinker Air Force Base","25,000–30,689 personnel, $4.83B annual impact (just east of Sooner Rd)"],
     ["SSM Health St. Anthony Midwest","860–914 employees"],
     ["Mid-Del Public Schools","930 employees"],["Rose State College","632 employees"],
     ["City of Midwest City","442 employees"],["Walmart Stores","389 employees"],
     ["Century Martial Arts","1000 Century Blvd · 220 employees"],
     ["Crest Foods","175 employees"],["Sam's Wholesale Club","6521 SE 29th · 154 employees"],
     ["Home Depot","1600 S Sooner Rd · 140 employees"],
     ["Confidence Chevrolet-Buick/GMC","6100 Tinker Diagonal · 135 employees"]],
   industrial:[["Century Martial Arts","1000 Century Blvd · manufacturer and distributor"],
     ["Boeing","Tinker sustainment work"],["Pratt & Whitney","Tinker sustainment work"],
     ["Rolls Royce","Tinker sustainment work"],
     ["North Side Improvement District","TIF 2023, supports industrial development"]],
   retail:[["Town Center Plaza","TIF-financed 2006, national retail plus independents"],
     ["Sooner Rose Shopping Center","TIF district 2017"],
     ["Walmart Supercenter","9101 NE 23rd"],["Sam's Wholesale Club","6521 SE 29th"],
     ["Home Depot","1600 S Sooner Rd"],["Crest Foods",""]],
   banks:[["Arvest Bank Del City","4580 SE 29th · serving Del City since 1984"],
     ["Arvest Bank Midwest City","1900 S Douglas"],["BancFirst Midwest City","5605 SE 15th"],
     ["BancFirst 15th and Sooner Rd",""],["BancFirst Del City","4200 S Sunnylane Rd"],
     ["BancFirst I-240 & Sooner Road",""],["FNB Community Bank Del City","4330 SE 29th"],
     ["FNB Community Bank Midwest City","2911 S Air Depot Blvd"],
     ["FNB Community Bank Douglas Blvd","1213 Douglas Blvd"],
     ["First National Bank and Trust","2600 S Douglas Blvd"],
     ["Sooner State Bank","10100 SE 15th"],["IBC Bank Douglas Blvd","2200 S Douglas Blvd"],
     ["JPMorgan Chase","7005 SE 15th"],["BMO Bank","1201 S Air Depot Blvd"],
     ["City National Bank Del City Walmart","5401 Tinker Diagonal"],
     ["MidFirst Bank","201 N Midwest Blvd"],
     ["Tinker Federal Credit Union","credit union"],["Navy Federal Credit Union","credit union"],
     ["WEOKIE Federal Credit Union","credit union"],["Oklahoma Federal Credit Union","credit union"],
     ["True Sky Federal Credit Union","credit union"]],
   support:[["Rose State College Workforce Development","customized training and certification"],
     ["Rose State Fab Lab","open to the public, 3-D printers"],
     ["Mid-Del Career Technology Center","free customized training for business and industry"],
     ["Eastern Oklahoma County Technology Center","4601 N Choctaw Rd"]],
   tif:[["Town Center Plaza TIF","2006, Midwest City's first"],
     ["Sooner Rose Shopping Center TIF","2017"],
     ["North Side Improvement District","2023, industrial"],
     ["I-40 Corridor Improvement Increment District","proposed 2026, 15 acres at SE 29th and Douglas"]],
   cities:[["Del City","7.52 sq mi, 21,822 (2020), incorporated Oct 9, 1948"],
     ["Midwest City","25 sq mi, 58,409 (2020), incorporated March 11, 1943"],
     ["Nicoma Park","eastern edge"],["Spencer","eastern edge"],["Choctaw","beyond the eastern edge"]],
   parks:[["Midwest City parks, golf courses and trails",""],["Del City war memorials",""]],
   landmarks:[["Regal Warren Theatre","described as the most modern cinema in the state"],
     ["Komet Go-Cart Track","3101 Tinker Diagonal"],["AMF Sunny Lanes","4330 SE 15th"],
     ["Jamaica Joe's","5920 SE 15th"]],
   airports:[["Tinker AFB airfield","two runways (just east of Sooner Rd)"]],
   govmil:[["Tinker Air Force Base","5,033+ acres, 716 buildings, 15.9M SF, largest single-site employer in Oklahoma"],
     ["Air Force Sustainment Center","32,000+ military and civilian personnel"],
     ["Oklahoma City Air Logistics Center","depot maintenance for B-1B, E-3, B-52, C/KC-135, E-6B"],
     ["Navy Strategic Communications Wing ONE",""],
     ["Midwest City Police Department and City Hall","100 N Midwest Blvd · 207 employees"]],
   services:[["Mid-Del Youth & Family Center","2801 Parklawn Ste 201 · shelter for ages 0–17"]]
  }
  };
  const entOf=(qid,kind)=>(ENT[qid]&&ENT[qid][kind])||[];
  const entCount=(qid,kind)=>entOf(qid,kind).length;


  /* ================= QUADRANT-LEVEL MEASURES ================= */
  const QIDS=Object.values(Q).sort((a,b)=>a.pos-b.pos).map(q=>q.id);
  const zipsOf=qid=>Z.filter(z=>z.q===qid);

  /* rolled up from the ZIPs sitting inside the quadrant's boundaries */
  const ROLL=[
   {k:"inc", f:"people",label:"Median household income",agg:"avg",fld:"inc",
    fmt:v=>"$"+v.toLocaleString()},
   {k:"pov", f:"people",label:"Poverty rate",agg:"avg",fld:"pov",dp:1,
    fmt:v=>v+"%"},
   {k:"home",f:"land",  label:"Median home value",agg:"avg",fld:"home",
    fmt:v=>"$"+v.toLocaleString()},
   {k:"rent",f:"land",  label:"Renter share",agg:"avg",fld:"rent",dp:1,
    fmt:v=>v+"%"},
   {k:"pop", f:"people",label:"Population",agg:"sum",fld:"pop",
    fmt:v=>v.toLocaleString()},
   {k:"dens",f:"people",label:"Population density",agg:"avg",fld:"dens",
    fmt:v=>v.toLocaleString()+"/sq mi"},
   {k:"age", f:"people",label:"Median age",agg:"avg",fld:"age",dp:1,
    fmt:v=>v+" yrs"},
   {k:"hh",  f:"people",label:"Average household size",agg:"avg",fld:"hh",dp:2,
    fmt:v=>v+" people"},
   {k:"safe",f:"risk",  label:"Safety grade",agg:"grade",fld:"safe",
    fmt:v=>GRADES[Math.round(v)]||"—"},
   {k:"bach",f:"inst",  label:"Bachelor's or higher",agg:"avg",fld:"bach",dp:1,
    fmt:v=>v+"%"},
   {k:"unemp",f:"work", label:"Unemployment",agg:"avg",fld:"unemp",dp:1,
    fmt:v=>v+"%"},
   {k:"snap",f:"people",label:"SNAP participation",agg:"avg",fld:"snap",dp:1,
    fmt:v=>v+"%"},
   {k:"foreign",f:"people",label:"Foreign-born share",agg:"avg",fld:"foreign",dp:1,
    fmt:v=>v+"%"},
   {k:"commute",f:"move",label:"Mean commute",agg:"avg",fld:"commute",dp:1,
    fmt:v=>v+" min"},
   {k:"col",f:"land",   label:"Cost of living index",agg:"avg",fld:"col",dp:1,
    fmt:v=>v+" (US=100)"}
  ];
  function rollValue(qid,m){
    const zs=zipsOf(qid);
    if(m.agg==="grade"){
      const v=zs.map(gradeRank).filter(x=>x!=null&&x>=0);
      return v.length?{v:v.reduce((a,b)=>a+b,0)/v.length,n:v.length,of:zs.length}:null;
    }
    const v=zs.map(z=>z[m.fld]).filter(x=>x!=null);
    if(!v.length) return null;
    if(m.agg==="sum") return {v:v.reduce((a,b)=>a+b,0),n:v.length,of:zs.length};
    const mean=v.reduce((a,b)=>a+b,0)/v.length;
    const p=Math.pow(10,m.dp||0);
    return {v:Math.round(mean*p)/p,n:v.length,of:zs.length};
  }
  /* the countable registry, one measure per kind */
  const QUANT=KINDS.map(k=>({k:"n:"+k.k,f:k.f,kind:k.k,label:k.label,count:true}));
  const QMEAS=[...QUANT,...ROLL];
  const QMEASBY=Object.fromEntries(QMEAS.map(m=>[m.k,m]));
  function qValue(qid,m){
    if(m.count){const n=entCount(qid,m.kind);return {v:n,n:null,txt:n+" "+(n===1?KINDBY[m.kind].one:KINDBY[m.kind].label.toLowerCase())}}
    const r=rollValue(qid,m);
    return r?{v:r.v,n:r.n,of:r.of,txt:m.fmt(r.v)}:null;
  }
  function qPct(m,qid,dir){
    const mine=qValue(qid,m); if(!mine) return null;
    const vals=QIDS.map(x=>qValue(x,m)).filter(x=>x).map(x=>x.v).sort((a,b)=>a-b);
    if(vals.length<2) return 50;
    const below=vals.filter(x=>x<mine.v).length, eq=vals.filter(x=>x===mine.v).length;
    const p=((below+eq/2)/vals.length)*100;
    return dir==="hi"?p:100-p;
  }

  /* ================= STATE ================= */
  const S={mode:"build",picks:[],quad:null,cats:new Set(),open:new Set()};
  const $=id=>root.getElementById(id);
  const scrollToEl=id=>{const e=$(id);if(e&&e.scrollIntoView)e.scrollIntoView({behavior:"smooth",block:"start"})};
  const el=(t,c,h)=>{const e=doc.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};

  function setMode(m){
    S.mode=m;
    ["build","place"].forEach(k=>{
      $("mode-"+k).setAttribute("aria-selected",k===m);
      $("pane-"+k).hidden=k!==m;
    });
    render();
  }

  /* ================= BUILD A QUESTION ================= */
  function renderBuild(){
    const shelf=$("shelf"); shelf.innerHTML="";
    const chipFor=m=>{
      const on=S.picks.some(p=>p.k===m.k);
      const b=el("button","chip"+(on?" on":""),m.label);
      b.type="button"; b.setAttribute("aria-pressed",on);
      b.addEventListener("click",()=>{
        const i=S.picks.findIndex(p=>p.k===m.k);
        if(i<0)S.picks.push({k:m.k}); else S.picks.splice(i,1);
        render();
      });
      return b;
    };
    FAM.forEach(fam=>{
      const ms=QMEAS.filter(m=>m.f===fam.k);
      if(!ms.length) return;
      const g=el("div","fam"); g.appendChild(el("h4",null,fam.label));
      const row=el("div","chips");
      ms.forEach(m=>row.appendChild(chipFor(m)));
      g.appendChild(row); shelf.appendChild(g);
    });

    const stack=$("stack");
    if(!S.picks.length){
      stack.innerHTML=`<p class="empty">Pick one and every quadrant lines up against it. Pick more and they stack.</p>`;
    }else{
      stack.innerHTML="";
      const strip=el("div","stackstrip");
      S.picks.forEach((p,i)=>{
        const m=QMEASBY[p.k];
        const c=el("span","stackchip",`<b>${m.label}</b>`);
        const x=el("button","xbtn","\u2715"); x.type="button";
        x.setAttribute("aria-label","Remove "+m.label);
        x.addEventListener("click",()=>{S.picks.splice(i,1);render()});
        c.appendChild(x); strip.appendChild(c);
      });
      const clr=el("button","btn sm","Clear"); clr.type="button";
      clr.addEventListener("click",()=>{S.picks=[];S.open.clear();render()});
      strip.appendChild(clr); stack.appendChild(strip);
    }
    renderTable();
  }

  function renderTable(){
    const host=$("tableOut");
    if(!S.picks.length){host.innerHTML="";return}
    const picks=S.picks;
    const rows=QIDS.map(qid=>{
      const parts=picks.map(p=>{const m=QMEASBY[p.k];
        return {m,val:qValue(qid,m),pct:qPct(m,qid,"hi")}});
      const known=parts.filter(x=>x.pct!=null);
      return {qid,parts,known:known.length,
        score:known.length?Math.round(known.reduce((a,b)=>a+b.pct,0)/known.length):null};
    }).sort((a,b)=>(b.score??-1)-(a.score??-1)||a.qid.localeCompare(b.qid));
    rows.forEach((r,i)=>r.rank=i+1);

    const cols=`minmax(150px,1.2fr) ${picks.map(()=>"minmax(112px,1fr)").join(" ")} 56px`;
    let h=`<div class="sechead"><h2>All nine, ranked</h2>
      <span class="note">tap a row to see what is being counted</span></div>
      <div class="thead" style="grid-template-columns:${cols}"><span class="th">Quadrant</span>`;
    picks.forEach(p=>{h+=`<span class="th num">${QMEASBY[p.k].label}</span>`});
    h+=`<span class="th num">Fit</span></div>`;

    rows.forEach(r=>{
      const q=Q[r.qid], open=S.open.has(r.qid);
      h+=`<div class="zrow" tabindex="0" role="button" data-q="${r.qid}" style="grid-template-columns:${cols}">
        <div><div class="qrank">${r.rank}</div><div class="qtitle">${q.name}</div>
          <div class="ztag">${q.id} · ${q.sub}</div></div>`;
      r.parts.forEach(p=>{
        h+=`<div class="num">${!p.val?'<span class="na">no data</span>'
          :`<span class="val">${p.val.txt}</span>`+
            (p.val.n!=null?`<span class="basis">${p.val.n} of ${p.val.of} ZIPs</span>`:"")+
            `<span class="pctl">${Math.round(p.pct)}</span>`}</div>`;
      });
      h+=`<div class="num"><b>${r.score==null?"—":r.score}</b></div></div>`;
      if(open){
        h+=`<div class="drill">`;
        picks.forEach(p=>{
          const m=QMEASBY[p.k];
          if(m.count){
            const items=entOf(r.qid,m.kind);
            h+=`<div class="drillsec"><h5>${KINDBY[m.kind].label} in ${r.qid} <span>${items.length}</span></h5>`;
            h+= items.length
              ? `<ul class="dlist">${items.map(([n,d])=>`<li><b>${n}</b>${d?` <span class="det">${d}</span>`:""}</li>`).join("")}</ul>`
              : `<p class="none">Nothing named under this in the record for ${r.qid}.</p>`;
            h+=`</div>`;
          }else{
            const zs=zipsOf(r.qid).filter(z=>m.agg==="grade"?z.safe:z[m.fld]!=null);
            h+=`<div class="drillsec"><h5>${m.label} by ZIP <span>${zs.length} of ${zipsOf(r.qid).length}</span></h5>`;
            h+= zs.length
              ? `<ul class="dlist">${zs.map(z=>`<li><b>${z.z}</b> ${z.place} <span class="det">${
                  m.agg==="grade"?z.safe.g:m.fmt(z[m.fld])}</span></li>`).join("")}</ul>`
              : `<p class="none">No ZIP inside ${r.qid} publishes this.</p>`;
            h+=`</div>`;
          }
        });
        h+=`<p style="margin:10px 0 0"><button class="btn sm" data-goq="${r.qid}">Open ${r.qid} in full →</button></p></div>`;
      }
    });
    host.innerHTML=h;
    host.querySelectorAll("[data-q]").forEach(r=>{
      const t=()=>{const id=r.dataset.q;S.open.has(id)?S.open.delete(id):S.open.add(id);renderTable()};
      r.addEventListener("click",t);
      r.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();t()}});
    });
    host.querySelectorAll("[data-goq]").forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();S.quad=b.dataset.goq;S.cats.clear();setMode("place");setTimeout(()=>scrollToEl("placeOut"),60);
    }));
  }

  /* ================= START WITH A PLACE ================= */
  function renderGrid(){
    const g=$("qgrid"); g.innerHTML="";
    Object.values(Q).sort((a,b)=>a.pos-b.pos).forEach(q=>{
      const named=KINDS.reduce((n,k)=>n+entCount(q.id,k.k),0);
      const b=el("button","qtile",
        `<span class="qid">${q.id}</span><span class="qname">${q.name}</span>
         <span class="qsub">${q.sub}</span>
         <span class="qstat">${zipsOf(q.id).length} ZIPs · ${named} named · ${FACTS.filter(f=>f.q===q.id).length} findings</span>`);
      b.type="button"; b.setAttribute("aria-pressed",S.quad===q.id);
      b.addEventListener("click",()=>{S.quad=S.quad===q.id?null:q.id;S.cats.clear();render();
        if(S.quad)scrollToEl("placeOut")});
      g.appendChild(b);
    });
  }
  function renderPlace(){
    renderGrid();
    const host=$("placeOut");
    if(!S.quad){host.innerHTML=`<p class="empty">Pick a quadrant.</p>`;return}
    const q=Q[S.quad], zs=zipsOf(S.quad);
    let h=`<div class="panel"><div class="sechead"><h2>${q.id} · ${q.name}</h2>
        <span class="note">${q.sub}</span></div>
      <p style="margin:10px 0 14px">${q.character}</p>
      <dl class="bound"><dt>North</dt><dd>${q.b.n}</dd><dt>East</dt><dd>${q.b.e}</dd>
        <dt>South</dt><dd>${q.b.s}</dd><dt>West</dt><dd>${q.b.w}</dd>
        <dt>ZIPs inside</dt><dd>${zs.map(z=>`${z.z} <span class="det">${z.place}</span>`).join(" · ")||"none mapped"}</dd></dl></div>`;

    h+=`<div class="sechead"><h2>What is in it</h2></div><div class="kindgrid">`;
    KINDS.forEach(k=>{
      const items=entOf(S.quad,k.k);
      h+=`<div class="kindcard${items.length?"":" bare"}">
        <h5>${k.label} <span>${items.length}</span></h5>
        ${items.length?`<ul class="dlist">${items.map(([n,d])=>
          `<li><b>${n}</b>${d?` <span class="det">${d}</span>`:""}</li>`).join("")}</ul>`
          :`<p class="none">Nothing named in the record.</p>`}</div>`;
    });
    h+=`</div>`;

    h+=`<div class="sechead" style="margin-top:26px"><h2>Findings</h2>
      <span class="note">${FACTS.filter(f=>f.q===S.quad).length}</span></div>`;
    h+=`<div class="panel"><div class="chips">`;
    CATS.forEach(c=>{
      const n=catCountQ(c.k,S.quad);
      h+=`<button class="chip${S.cats.has(c.k)?" on":""}" type="button" data-cat="${c.k}"
        aria-pressed="${S.cats.has(c.k)}"${n?"":" disabled"}>${c.label} <span class="cov">${n}</span></button>`;
    });
    h+=`</div></div>`;
    const sel=[...S.cats];
    FACTS.filter(f=>f.q===S.quad&&(!sel.length||f.cats.some(c=>sel.includes(c)))).forEach(f=>{
      h+=`<div class="fcard"><div class="fmeta">
        ${f.zip?`<span class="tagpill">ZIP ${f.zip}</span>`:`<span class="tagpill">quadrant-wide</span>`}
        ${f.cats.slice(0,3).map(c=>`<span class="tagpill">${CATBY[c].label}</span>`).join("")}</div>
        <p class="ftext">${f.t}</p></div>`;
    });
    host.innerHTML=h;
    host.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>{
      const c=b.dataset.cat;S.cats.has(c)?S.cats.delete(c):S.cats.add(c);renderPlace()}));
  }

  function render(){
    if(S.mode==="build")renderBuild();
    if(S.mode==="place")renderPlace();
  }

  ["build","place"].forEach(m=>$("mode-"+m).addEventListener("click",()=>setMode(m)));
  renderGrid(); setMode("build");
}

if(!customElements.get("okc-atlas")) customElements.define("okc-atlas", OKCAtlas);
export default OKCAtlas;
