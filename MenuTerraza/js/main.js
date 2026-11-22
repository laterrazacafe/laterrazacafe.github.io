'use strict';

gsap.registerPlugin(ScrollTrigger);

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initHero();
  initVideoScroll();
  initMenu();
  initRevealAnimations();
  initMobileMenu();
});

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;
  ScrollTrigger.create({
    trigger: 'body',
    start: '60px top',
    onEnter:     () => navbar.classList.add('nav-solid'),
    onLeaveBack: () => navbar.classList.remove('nav-solid'),
  });
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function initHero() {
  const logoWrap  = $('#hero-logo-wrap');
  const granosImg = $('#granos-img');
  const scrollCue = $('#scroll-cue');

  if (logoWrap) {
    gsap.to(logoWrap, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  if (granosImg) {
    gsap.to(granosImg, {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    });
  }

  if (scrollCue) {
    gsap.to(scrollCue, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '25% top',
        scrub: true,
      },
    });
  }
}

// ─── VIDEO SCROLL ─────────────────────────────────────────────────────────────
function initVideoScroll() {
  const wrapper     = $('#video-scroll-wrapper');
  const video       = $('#cafe-video');
  const ambientText = $('#ambient-text');
  const tazaReveal  = $('#taza-reveal');
  const tazaWrap    = $('#taza-wrap');

  if (!wrapper || !video) return;

  const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const LERP     = isMobile ? 0.08 : 0.042;
  const MIN_SEEK = isMobile ? 80 : 0; // ms — limita seeks en mobile para reducir decode

  let targetProgress = 0;
  let smoothProgress = 0;
  let ambientShown   = false;
  let rafId          = null;
  let sectionActive  = false;
  let lastSeekTs     = 0;

  video.pause();
  video.currentTime = 0;

  function tick(ts) {
    if (!sectionActive) { rafId = null; return; }

    smoothProgress += (targetProgress - smoothProgress) * LERP;

    if ((ts - lastSeekTs) >= MIN_SEEK && video.readyState >= 2 && video.duration > 0) {
      const t = Math.min(smoothProgress * video.duration, video.duration - 0.001);
      if (Math.abs(video.currentTime - t) > 0.012) {
        video.currentTime = t;
        lastSeekTs = ts;
      }
    }

    updateVideoOverlays(smoothProgress);
    rafId = requestAnimationFrame(tick);
  }

  function updateVideoOverlays(p) {
    if (p >= 0.45 && !ambientShown) {
      ambientShown = true;
      gsap.to(ambientText, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' });
    } else if (p < 0.35 && ambientShown) {
      ambientShown = false;
      gsap.to(ambientText, { opacity: 0, y: 14, duration: 0.5 });
    }

    if (p >= 0.82) {
      const tazaP   = Math.min((p - 0.82) / 0.18, 1);
      const bgAlpha = tazaP * 0.93;
      const scale   = 1.06 - tazaP * 0.06;
      tazaReveal.style.opacity       = tazaP;
      tazaReveal.style.background    = `rgba(26,15,10,${bgAlpha})`;
      tazaReveal.style.pointerEvents = tazaP > 0.5 ? 'auto' : 'none';
      if (tazaWrap) tazaWrap.style.transform = `scale(${scale})`;
    } else {
      tazaReveal.style.opacity       = 0;
      tazaReveal.style.pointerEvents = 'none';
      if (tazaWrap) tazaWrap.style.transform = 'scale(1.06)';
    }
  }

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate(self) {
      targetProgress = self.progress;
    },
    onToggle(self) {
      sectionActive = self.isActive;
      if (sectionActive && !rafId) rafId = requestAnimationFrame(tick);
    },
  });

  window.addEventListener('pagehide', () => {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  });
}

// ─── MENÚ ─────────────────────────────────────────────────────────────────────
const menuPreviewImages = {
  bebidasCalientes: [
    'Animaciones/Calientes/BebidaCalienteMenu.png',
    'Animaciones/Calientes/CapuchinoGlassMenu.png',
    'Animaciones/Calientes/TisanaMenu.png',
  ],
  bebidasFrias: [
    'Animaciones/Frios/FrapOreoMenu.png',
    'Animaciones/Frios/FrappeCajetaMenu.png',
    'Animaciones/Frios/FresascremafrapMenu.png',
    'Animaciones/Frios/FrutosrojosMenu.png',
    'Animaciones/Frios/matcharocasMenu.png',
    'Animaciones/Frios/RocasAmericanMenu.png',
  ],
  postres: [
    'Animaciones/Postres/ChocoflanMenu.png',
    'Animaciones/Postres/RoldecanelaMenu.png',
    'Animaciones/Postres/StrudelMenu.png',
  ],
};

function initMenu() {
  const tabs    = $$('.menu-tab');
  const content = $('#menu-content');
  if (!content || !tabs.length) return;

  const playPreview = createMenuPreview($('#menu-preview'));
  let currentTab = 'bebidasCalientes';
  renderTab(currentTab, content, false);

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const newTab = btn.dataset.tab;
      playPreview(newTab);
      if (newTab === currentTab) return;

      currentTab = newTab;
      tabs.forEach(t => t.classList.remove('active-tab'));
      btn.classList.add('active-tab');

      gsap.killTweensOf(content);
      gsap.to(content, {
        opacity: 0, y: -10, duration: 0.2, ease: 'power2.in',
        onComplete() {
          renderTab(newTab, content, true);
          gsap.fromTo(content,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        },
      });
    });
  });
}

function createMenuPreview(container) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeImage;
  let animation;

  return async function playPreview(tabKey) {
    if (!container) return;

    animation?.kill();
    animation = null;
    activeImage?.remove();
    activeImage = null;

    const images = menuPreviewImages[tabKey];
    if (!images) return;

    const image = new Image();
    activeImage = image;
    image.alt = '';
    image.src = images[Math.floor(Math.random() * images.length)];

    try {
      await image.decode();
    } catch {
      if (image === activeImage) activeImage = null;
      return;
    }

    // Una selección posterior invalida la imagen, incluso si seguía cargando.
    if (image !== activeImage) return;

    container.append(image);
    const removeImage = () => {
      image.remove();
      activeImage = null;
      animation = null;
    };

    if (reducedMotion.matches) {
      animation = gsap.delayedCall(1, removeImage);
      return;
    }

    animation = gsap.timeline({ onComplete: removeImage })
      .fromTo(image,
        { y: '-100vh' },
        { y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .to(image, { y: '100vh', duration: 0.7, ease: 'power3.in' }, '+=1');
  };
}

function renderTab(tabKey, container, animate) {
  const data = menuData[tabKey];
  if (!data) return;

  let html = '';

  data.groups.forEach(group => {
    html += '<div class="menu-group">';

    if (group.name) {
      html += `<div class="menu-group-header">${group.name}</div>`;
      if (group.sizes) {
        html += `
          <div class="size-header-row">
            <span class="size-header-cell">CH</span>
            <span class="size-header-cell">MED</span>
            <span class="size-header-cell">GRA</span>
          </div>`;
      }
    }

    group.items.forEach((item, idx) => {
      if (group.sizes) {
        const chVal  = item.ch   != null ? `$${item.ch}`  : '—';
        const medVal = item.med  != null ? `$${item.med}` : '—';
        const graVal = item.gra  != null ? `$${item.gra}` : '—';
        const chC    = item.ch   != null ? 'price-value'  : 'price-value price-null';
        const medC   = item.med  != null ? 'price-value'  : 'price-value price-null';
        const graC   = item.gra  != null ? 'price-value'  : 'price-value price-null';

        html += `
          <div class="menu-item-row" style="animation-delay:${idx * 30}ms">
            <span class="menu-item-name">${item.name}</span>
            <div class="menu-prices">
              <div class="menu-price-col"><span class="${chC}">${chVal}</span></div>
              <div class="menu-price-col"><span class="${medC}">${medVal}</span></div>
              <div class="menu-price-col"><span class="${graC}">${graVal}</span></div>
            </div>
          </div>`;
      } else {
        const precio = item.precio != null ? `$${item.precio}` : '';
        const desc   = item.desc ? `<div class="menu-item-desc">${item.desc}</div>` : '';
        html += `
          <div class="menu-item-row" style="animation-delay:${idx * 30}ms">
            <div>
              <span class="menu-item-name">${item.name}</span>
              ${desc}
            </div>
            <span class="menu-price-single">${precio}</span>
          </div>`;
      }
    });

    html += '</div>';
  });

  container.innerHTML = html;

  if (animate) {
    gsap.from($$('.menu-item-row', container), {
      opacity: 0, y: 8, stagger: 0.028, duration: 0.35, ease: 'power2.out',
    });
  } else {
    $$('.menu-item-row', container).forEach(row => gsap.set(row, { opacity: 0, y: 10 }));
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter() {
        gsap.to($$('.menu-item-row', container), {
          opacity: 1, y: 0, stagger: 0.025, duration: 0.4, ease: 'power2.out',
        });
      },
    });
  }
}

// ─── REVEAL ANIMATIONS ────────────────────────────────────────────────────────
function initRevealAnimations() {
  gsap.from('#menu-header', {
    opacity: 0, y: 30, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#menu-header', start: 'top 85%', once: true },
  });

  gsap.from($$('.menu-tab'), {
    opacity: 0, y: 12, stagger: 0.08, duration: 0.5, ease: 'power2.out',
    scrollTrigger: { trigger: '.menu-tab', start: 'top 90%', once: true },
  });

  gsap.from('#nosotros h2, #nosotros p, #nosotros img', {
    opacity: 0, y: 24, stagger: 0.12, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '#nosotros', start: 'top 80%', once: true },
  });
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const btn  = $('#mobile-menu-btn');
  const menu = $('#mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) {
      gsap.to(menu, {
        height: 0, opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => menu.classList.add('hidden'),
      });
    } else {
      menu.classList.remove('hidden');
      gsap.fromTo(menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
    lucide.createIcons();
  });

  $$('.mobile-nav', menu).forEach(link => {
    link.addEventListener('click', () => {
      gsap.to(menu, {
        height: 0, opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => menu.classList.add('hidden'),
      });
    });
  });
}
