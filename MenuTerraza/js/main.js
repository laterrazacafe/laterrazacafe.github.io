'use strict';

gsap.registerPlugin(ScrollTrigger);

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initHero();
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

// ─── MENÚ ─────────────────────────────────────────────────────────────────────
const menuPreviewImages = {
  carta: ['assets/GranocafeMenu.png'],
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
  comidaYPostres: [
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
  $('#view-menu')?.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    playPreview('carta');
  });

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

    const isMenuEntry = tabKey === 'carta';
    const image = new Image();
    activeImage = image;
    image.alt = '';
    if (isMenuEntry) image.classList.add('menu-entry-preview');
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

    const sweepLegDuration = isMenuEntry ? 0.325 : 0.7;
    const centerHold = isMenuEntry ? 0.5 : 1;

    if (reducedMotion.matches) {
      animation = gsap.delayedCall(isMenuEntry ? sweepLegDuration * 2 : centerHold, removeImage);
      return;
    }

    animation = gsap.timeline({ onComplete: removeImage })
      .fromTo(image,
        { y: '-100vh' },
        { y: 0, duration: sweepLegDuration, ease: 'power3.out' }
      )
      .to(image, { y: '100vh', duration: sweepLegDuration, ease: 'power3.in' }, sweepLegDuration + centerHold);
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
        const prefijo = group.suplemento ? '+ $' : '$';
        const precio = item.precio != null ? `${prefijo}${item.precio}` : '';
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
