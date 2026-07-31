document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');

    if (mobileMenuBtn && mobileNav && closeBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });

        closeBtn.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    }
});
(function(){
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- SPLASH ---------- */
  var splash = document.getElementById("splash");
  var body = document.body;

  function revealHero(){
    document.getElementById("bigText").classList.add("show");
    document.getElementById("topline").classList.add("show");
    document.getElementById("heroStats").classList.add("show");
    document.getElementById("nameBlock").classList.add("show");
    document.getElementById("subtext").classList.add("show");
    document.getElementById("ctaRow").classList.add("show");
    document.getElementById("scrollHint").classList.add("show");
    buildHeadline();
    // Figure wipe-reveal fires slightly after the topline, alongside the headline.
    setTimeout(function(){
      document.getElementById("heroFigure").classList.add("show");
    }, reduceMotion ? 0 : 120);
  }

  function endSplash(){
    splash.classList.add("fade");
    body.classList.remove("no-scroll");
    setTimeout(function(){ splash.classList.add("hidden"); }, 380);
    revealHero();
  }

  if(reduceMotion){
    splash.classList.add("hidden");
    body.classList.remove("no-scroll");
    revealHero();
  } else {
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ splash.classList.add("animate"); });
    });
    setTimeout(endSplash, 1350);
  }

  /* ---------- HEADLINE WORD-REVEAL ---------- */
  function buildHeadline(){
    var el = document.getElementById("headline");
    var text = "I architect resilient full-stack systems, autonomous AI pipelines, and high-performance algorithms.";
    var accentWords = ["resilient","autonomous","high-performance"];
    var words = text.split(" ");
    el.innerHTML = "";
    words.forEach(function(w, i){
      var outer = document.createElement("span");
      outer.className = "word";
      var inner = document.createElement("span");
      inner.className = "word-inner";
      if(accentWords.indexOf(w.replace(/[^a-zA-Z-]/g,"")) !== -1){
        inner.classList.add("accent-word");
      }
      inner.textContent = w + (i < words.length - 1 ? "\u00A0" : "");
      outer.appendChild(inner);
      el.appendChild(outer);
      var delay = reduceMotion ? 0 : i * 55;
      setTimeout(function(){ inner.classList.add("show"); }, delay);
    });
  }

  /* ---------- BURGER MENU ---------- */
  var burgerBtn = document.getElementById("burgerBtn");
  var menuPanel = document.getElementById("menuPanel");
  burgerBtn.addEventListener("click", function(){
    var isOpen = body.classList.toggle("menu-open");
    burgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && body.classList.contains("menu-open")){
      body.classList.remove("menu-open");
      burgerBtn.setAttribute("aria-expanded","false");
      menuPanel.setAttribute("aria-hidden","true");
    }
  });

  /* ---------- NEURAL NETWORK SVG (ambient reveal layer content) ---------- */
  (function buildNet(){
    var g = document.getElementById("netGroup");
    var layers = [ [120,450],[420,180,450,720],[760,120,320,580,780],[1100,180,450,720],[1400,450] ];
    var pts = [];
    layers.forEach(function(col){
      var x = col[0];
      for(var i=1;i<col.length;i++){ pts.push([x, col[i]]); }
    });
    var frag = document.createDocumentFragment();
    for(var i=0;i<pts.length;i++){
      for(var j=i+1;j<pts.length;j++){
        var a = pts[i], b = pts[j];
        if(Math.abs(a[0]-b[0]) <= 380 && Math.abs(a[0]-b[0]) > 0 && Math.random() > 0.55){
          var line = document.createElementNS("http://www.w3.org/2000/svg","line");
          line.setAttribute("class","link");
          line.setAttribute("x1",a[0]); line.setAttribute("y1",a[1]);
          line.setAttribute("x2",b[0]); line.setAttribute("y2",b[1]);
          frag.appendChild(line);
        }
      }
    }
    pts.forEach(function(p){
      var c = document.createElementNS("http://www.w3.org/2000/svg","circle");
      c.setAttribute("class","node");
      c.setAttribute("cx",p[0]); c.setAttribute("cy",p[1]); c.setAttribute("r", 5 + Math.random()*4);
      frag.appendChild(c);
    });
    g.appendChild(frag);
  })();

  /* ---------- CANVAS SPOTLIGHT + FIGURE SCAN (mouse-tracked mask) ---------- */
  var canvas = document.getElementById("reveal-canvas");
  var ctx = canvas.getContext("2d");
  var revealLayer = document.getElementById("revealLayer");
  var heroFigure = document.getElementById("heroFigure");
  var figureReveal = document.getElementById("figureReveal");

  var mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  var smooth = { x: mouse.x, y: mouse.y };
  var hasMoved = false;

  function resizeCanvas(){
    canvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    canvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  window.addEventListener("pointermove", function(e){
    mouse.x = e.clientX; mouse.y = e.clientY; hasMoved = true;
  }, { passive:true });

  function loop(){
    if(!reduceMotion){
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;
    } else {
      smooth.x = mouse.x; smooth.y = mouse.y;
    }

    // Drive the CSS mask on the ambient background reveal layer.
    revealLayer.style.setProperty("--mx", smooth.x + "px");
    revealLayer.style.setProperty("--my", smooth.y + "px");

    // Drive the CSS mask on the Nightwing reveal (red) image — coordinates
    // are computed relative to the figure's own box so the mask lines up
    // with the art regardless of scroll position or viewport size.
    var rect = heroFigure.getBoundingClientRect();
    var fx = smooth.x - rect.left;
    var fy = smooth.y - rect.top;
    figureReveal.style.setProperty("--fx", fx + "px");
    figureReveal.style.setProperty("--fy", fy + "px");

    // Paint a lightweight scanner ring on the canvas for extra cybernetic flavor.
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(hasMoved){
      var x = smooth.x * dpr, y = smooth.y * dpr;
      var r = 90 * dpr;
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,255,0.55)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x,y,r*0.55,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle = "rgba(0,229,255,0.25)";
      ctx.beginPath(); ctx.moveTo(x - r*1.3, y); ctx.lineTo(x - r*0.7, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + r*0.7, y); ctx.lineTo(x + r*1.3, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y - r*1.3); ctx.lineTo(x, y - r*0.7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y + r*0.7); ctx.lineTo(x, y + r*1.3); ctx.stroke();
      ctx.restore();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})();