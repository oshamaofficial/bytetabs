/**
 * ByteTabs — Official Script
 * High-End Digital Product Studio & Technology Agency
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* Header JavaScript Start */
  initHeaderScroll();
  initMobileNav();
  /* Header JavaScript End */

  /* Hero JavaScript Start */
  initHeroAnimations();
  initServicesCoverflow();
  initAuraContinuousWave();
  /* Hero JavaScript End */

  /* Laptop Showcase JavaScript Start */
  initLaptopScrollAnimation();
  /* Laptop Showcase JavaScript End */

  /* Services Section JavaScript Start */
  initServicesScrollAnimation();
  /* Services Section JavaScript End */

  /* Clients Section JavaScript Start */
  initClientsScrollAnimation();
  /* Clients Section JavaScript End */

  /* Stats Section JavaScript Start */
  initStatsSpinAnimation();
  /* Stats Section JavaScript End */

  /* Our Tech Stack Section JavaScript Start */
  initTechStackScrollAnimation();
  /* Our Tech Stack Section JavaScript End */

  /* Why Choose Section JavaScript Start */
  initWhyChooseScrollAnimation();
  /* Why Choose Section JavaScript End */

  /* Brand Partners Section JavaScript Start */
  initBrandPartnersScrollAnimation();
  /* Brand Partners Section JavaScript End */

  /* Testimonials Section JavaScript Start */
  initTestimonialsSlider();
  /* Testimonials Section JavaScript End */

  /* Recalculate ScrollTrigger positions shortly after DOM render & browser scroll restoration */
  setTimeout(() => {
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }, 150);
});

/* ==========================================================================
   Header JavaScript Start
   ========================================================================== */

/**
 * Handles the transparent-to-scrolled header transition.
 * Sits directly over the hero initially with zero background,
 * and adds an elegant warm cream backdrop when scrolled past 30px.
 */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const scrollThreshold = 30;
  let ticking = false;

  function updateHeaderState() {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollY > scrollThreshold) {
      if (!header.classList.contains('is-scrolled')) {
        header.classList.add('is-scrolled');
      }
    } else {
      if (header.classList.contains('is-scrolled')) {
        header.classList.remove('is-scrolled');
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  }, { passive: true });

  // Run initial check on load
  updateHeaderState();
}

/**
 * Controls the Mobile Navigation Overlay & Drawer.
 * Includes smooth GSAP choreography, focus trap, and touch accessibility.
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileNavClose');
  const overlay = document.getElementById('mobileNavOverlay');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  if (!toggleBtn || !overlay) return;

  let isOpen = false;

  function openMenu() {
    if (isOpen) return;
    isOpen = true;

    overlay.classList.add('is-active');
    body.classList.add('menu-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');

    // Smooth entrance choreography with GSAP if available
    if (window.gsap) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        const tl = gsap.timeline();
        tl.fromTo('.mobile-nav-backdrop', 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo('.mobile-nav-drawer', 
          { xPercent: 100 }, 
          { xPercent: 0, duration: 0.45, ease: 'power3.out' }, 
          '-=0.2'
        )
        .fromTo('.mobile-nav-item', 
          { y: 25, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: 'power2.out' }, 
          '-=0.25'
        )
        .fromTo('.mobile-nav-footer', 
          { y: 15, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 
          '-=0.2'
        );
      }
    }

    if (closeBtn) {
      closeBtn.focus();
    }
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;

    toggleBtn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');

    if (window.gsap) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.to('.mobile-nav-drawer', {
          xPercent: 100,
          duration: 0.35,
          ease: 'power3.in',
          onComplete: () => {
            overlay.classList.remove('is-active');
            body.classList.remove('menu-open');
          }
        });
        gsap.to('.mobile-nav-backdrop', {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in'
        });
      } else {
        overlay.classList.remove('is-active');
        body.classList.remove('menu-open');
      }
    } else {
      overlay.classList.remove('is-active');
      body.classList.remove('menu-open');
    }

    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  // Close menu and navigate smoothly when a mobile nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* ==========================================================================
   Header JavaScript End
   ========================================================================== */

/* ==========================================================================
   Hero JavaScript Start
   ========================================================================== */

/**
 * Handles cinematic entrance animation for Hero title lines, body copy, CTA, and Concentric Aura Rings.
 * Fully respectful of prefers-reduced-motion.
 */
function initHeroAnimations() {
  if (!window.gsap) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  // High-end editorial title entrance: staggered masked slide-up per line
  tl.from('.hero-title-line-inner', {
    yPercent: 110,
    autoAlpha: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    clearProps: 'transform,opacity,visibility'
  }, 0.1);

  // Hero description paragraph: smooth, gentle glide (calibrated slightly slower pace)
  tl.from('.hero-description', {
    y: 26,
    autoAlpha: 0,
    duration: 1.15,
    ease: 'power3.out',
    clearProps: 'transform,opacity,visibility'
  }, 0.52);

  // Hero consultation CTA button: graceful, buttery entrance
  tl.from('.hero-actions', {
    y: 24,
    autoAlpha: 0,
    duration: 1.1,
    ease: 'power3.out',
    clearProps: 'transform,opacity,visibility'
  }, 0.70);

  // 3D Coverflow entrance: floating rise into radiant aura
  tl.from('#servicesCoverFlow', {
    y: 35,
    autoAlpha: 0,
    duration: 1.2,
    ease: 'power3.out',
    clearProps: 'opacity,visibility'
  }, 0.25);
}

/**
 * Continuous infinite radial wave animation for the concentric aura rings.
 * Ripples outward slowly, smoothly, and endlessly like calm water waves.
 * Strictly unidirectional (outward expansion only, dissolving into 0 opacity before reset).
 * Does not bounce, yoyo, or shrink back.
 * Preserves the original clean white circle colors and subtle transparencies.
 */
function initAuraContinuousWave() {
  if (!window.gsap) return;

  const rings = document.querySelectorAll('.aura-ring');
  if (!rings.length) return;

  // Kill any previous tweens
  gsap.killTweensOf(rings);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    rings.forEach((ring, i) => {
      gsap.set(ring, {
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        transformOrigin: '50% 50%',
        scale: 1 + i * 0.6,
        opacity: Math.max(0.08, 0.40 - i * 0.07)
      });
    });
    return;
  }

  const totalRings = rings.length;
  const cycleDuration = 18.0; // Slower, calm, majestic luxury pace (calibrated for slow, fluid ripples)
  const interval = cycleDuration / totalRings; // Perfectly equal spacing between consecutive waves

  rings.forEach((ring, i) => {
    // Initial centering & transform origin
    gsap.set(ring, {
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      scale: 0.8,
      opacity: 0
    });

    // Unidirectional outward ripple timeline (strictly monotonic scale expansion, constant speed)
    const tl = gsap.timeline({
      repeat: -1
    });

    // Animate scale linearly so adjacent rings always remain perfectly equidistant
    tl.fromTo(ring,
      {
        scale: 0.8
      },
      {
        scale: 3.8,
        duration: cycleDuration,
        ease: 'none'
      },
      0
    );

    // Animate opacity in parallel: bloom in from behind cards, then gently fade out into outer space
    tl.fromTo(ring,
      {
        opacity: 0
      },
      {
        opacity: 0.44,
        duration: cycleDuration * 0.15,
        ease: 'power1.out'
      },
      0
    )
    .to(ring, {
      opacity: 0.22,
      duration: cycleDuration * 0.55,
      ease: 'none'
    }, cycleDuration * 0.15)
    .to(ring, {
      opacity: 0,
      duration: cycleDuration * 0.30,
      ease: 'power1.in'
    }, cycleDuration * 0.70);

    // Distribute playhead across the cycle so all 5 waves are immediately visible at staggered outward positions
    tl.time(i * interval);
  });
}

/**
 * 3D Coverflow Carousel Showcase for the 6 Core Services.
 * Matches horizontal cascading fan-out layout:
 * - Active center card (elevated, scale 1.0, highest z-index)
 * - Flanking side cards (staggered horizontally with perspective & scale)
 * - Click side cards or arrows to advance
 * - Auto-cycle with pause on hover
 * - Zero extra dots or clutter
 */
function initServicesCoverflow() {
  const container = document.getElementById('servicesCoverFlow');
  if (!container) return;

  const cards = Array.from(container.querySelectorAll('.coverflow-card'));
  const prevBtn = document.getElementById('coverflowPrevBtn');
  const nextBtn = document.getElementById('coverflowNextBtn');

  if (!cards.length) return;

  const totalCards = cards.length;
  let activeIndex = 0;
  let isAnimating = false;
  let autoPlayTimer = null;
  const autoPlayDelay = 4200;

  function updateCoverflow(animate = true) {
    const width = window.innerWidth;
    let step1, step2;

    if (width <= 480) {
      step1 = 46;
      step2 = 82;
    } else if (width <= 768) {
      step1 = 58;
      step2 = 104;
    } else if (width <= 991) {
      step1 = 70;
      step2 = 130;
    } else if (width <= 1199) {
      step1 = 78;
      step2 = 146;
    } else {
      // Desktop (>= 1200px) — calibrated for refined card proportions
      step1 = 92;
      step2 = 175;
    }

    cards.forEach((card, i) => {
      let diff = (i - activeIndex) % totalCards;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;

      let x = 0;
      let scale = 1;
      let zIndex = 1;
      let opacity = 0;
      let brightness = 1;
      let pointerEvents = 'none';

      if (diff === 0) {
        // Center Active Card
        x = 0;
        scale = 1;
        zIndex = 10;
        opacity = 1;
        brightness = 1;
        pointerEvents = 'auto';
        card.classList.add('is-active');
      } else if (diff === 1) {
        // Immediate Right Card
        x = step1;
        scale = 0.88;
        zIndex = 8;
        opacity = 0.88;
        brightness = 0.88;
        pointerEvents = 'auto';
        card.classList.remove('is-active');
      } else if (diff === -1) {
        // Immediate Left Card
        x = -step1;
        scale = 0.88;
        zIndex = 8;
        opacity = 0.88;
        brightness = 0.88;
        pointerEvents = 'auto';
        card.classList.remove('is-active');
      } else if (diff === 2) {
        // Outer Right Card
        x = step2;
        scale = 0.76;
        zIndex = 6;
        opacity = 0.58;
        brightness = 0.74;
        pointerEvents = 'auto';
        card.classList.remove('is-active');
      } else if (diff === -2) {
        // Outer Left Card
        x = -step2;
        scale = 0.76;
        zIndex = 6;
        opacity = 0.58;
        brightness = 0.74;
        pointerEvents = 'auto';
        card.classList.remove('is-active');
      } else {
        // Hidden in reserve
        x = 0;
        scale = 0.5;
        zIndex = 2;
        opacity = 0;
        brightness = 0.5;
        pointerEvents = 'none';
        card.classList.remove('is-active');
      }

      card.style.zIndex = zIndex;
      card.style.pointerEvents = pointerEvents;

      if (window.gsap && animate) {
        gsap.to(card, {
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: 0,
          scale: scale,
          opacity: opacity,
          filter: `brightness(${brightness})`,
          duration: 0.65,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, 0) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.filter = `brightness(${brightness})`;
      }
    });
  }

  function goToNext() {
    if (isAnimating) return;
    isAnimating = true;
    activeIndex = (activeIndex + 1) % totalCards;
    updateCoverflow(true);
    setTimeout(() => { isAnimating = false; }, 350);
  }

  function goToPrev() {
    if (isAnimating) return;
    isAnimating = true;
    activeIndex = (activeIndex - 1 + totalCards) % totalCards;
    updateCoverflow(true);
    setTimeout(() => { isAnimating = false; }, 350);
  }

  function goToIndex(idx) {
    if (idx === activeIndex || isAnimating) return;
    isAnimating = true;
    activeIndex = idx;
    updateCoverflow(true);
    setTimeout(() => { isAnimating = false; }, 350);
  }

  // Mouse Slide (Swipe) & Touch Swipe Interaction
  // Cards stay rock-solid in place during gesture; swiping cleanly transitions to next/previous card
  const viewport = document.getElementById('coverflowViewport') || container;
  let isPointerDown = false;
  let startX = 0;
  let hasTriggeredSlide = false;
  let suppressClickUntil = 0;
  const swipeThreshold = 30; // Movement needed to trigger slide

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    isPointerDown = true;
    hasTriggeredSlide = false;
    startX = e.clientX;
    stopAutoPlay();
  }

  function onPointerMove(e) {
    if (!isPointerDown || hasTriggeredSlide) return;

    const deltaX = e.clientX - startX;

    if (deltaX < -swipeThreshold) {
      // Swiped Left -> advance to next card
      hasTriggeredSlide = true;
      suppressClickUntil = Date.now() + 250;
      goToNext();
    } else if (deltaX > swipeThreshold) {
      // Swiped Right -> advance to previous card
      hasTriggeredSlide = true;
      suppressClickUntil = Date.now() + 250;
      goToPrev();
    }
  }

  function onPointerUp() {
    if (!isPointerDown) return;
    isPointerDown = false;

    if (hasTriggeredSlide) {
      suppressClickUntil = Date.now() + 250;
    }

    if (!container.matches(':hover')) {
      startAutoPlay();
    }
  }

  viewport.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Clicking cards: clicking side cards brings them to center; clicking active card follows anchor link
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      // Suppress navigation if user was swiping with mouse or touch
      if (hasTriggeredSlide || Date.now() < suppressClickUntil) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // If clicking a side card, rotate it to the center instead of navigating immediately
      if (idx !== activeIndex) {
        e.preventDefault();
        e.stopPropagation();
        goToIndex(idx);
        return;
      }

      // If clicking the active (center) card, smoothly navigate to the target anchor section
      const href = card.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Next / Prev minimal chevron arrow buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToNext();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToPrev();
    });
  }

  // Auto-play management
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(goToNext, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  startAutoPlay();

  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', () => {
    if (!isPointerDown) {
      startAutoPlay();
    }
  });

  // Handle responsive layout on window resize
  window.addEventListener('resize', () => {
    updateCoverflow(false);
  });

  // Initial layout initialization
  updateCoverflow(false);
}

/* ==========================================================================
   Hero JavaScript End
   ========================================================================== */

/* ==========================================================================
   Laptop Showcase JavaScript Start
   ========================================================================== */

/**
 * Interactive Open Laptop Showcase Animation
 * - Smooth scroll entrance for the open laptop and capability cards.
 * - Continuous, elegant ambient breathing/levitation float.
 * - Subtle 3D perspective mouse tilt response on desktop.
 * - Gentle screen glare sheen sweep on entrance.
 * - Fully unpinned, natural scrolling flow.
 * - Respects prefers-reduced-motion.
 */
function initLaptopScrollAnimation() {
  const section = document.getElementById('laptopShowcaseSection');
  const laptopFrame = document.getElementById('laptopFrame');
  const groundShadow = document.getElementById('laptopGroundShadow');
  const screenSheen = document.querySelector('.laptop-screen-sheen');
  const showcaseContent = document.getElementById('showcaseContentCol');

  if (!section || !laptopFrame) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap) return;

  // 1. Smooth Scroll Entrance Trigger (No pinning - natural scroll)
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const playLaptopEntrance = () => {
      const tlEntrance = gsap.timeline();

      // Laptop graceful floating rise entrance
      tlEntrance.from(laptopFrame, {
        y: 35,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'opacity'
      });

      // Screen sheen glare gleam sweep
      if (screenSheen) {
        tlEntrance.fromTo(screenSheen,
          { xPercent: -120, opacity: 0 },
          { xPercent: 120, opacity: 0.7, duration: 0.85, ease: 'power1.inOut' },
          0.3
        );
      }

      // Right-column editorial content staggered reveal
      if (showcaseContent) {
        tlEntrance.from(showcaseContent.children, {
          y: 24,
          opacity: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'all'
        }, 0.2);
      }
    };

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      gsap.set(laptopFrame, { opacity: 1, y: 0, clearProps: 'opacity' });
      if (showcaseContent) gsap.set(showcaseContent.children, { opacity: 1, y: 0, clearProps: 'all' });
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: playLaptopEntrance
      });
    }
  }

  // 2. Continuous Ambient Levitation Float (Subtle, calm, hypnotic luxury wave)
  gsap.to(laptopFrame, {
    y: -9,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  if (groundShadow) {
    gsap.to(groundShadow, {
      scaleX: 0.93,
      opacity: 0.65,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // 3. Subtle 3D Mouse Parallax Tilt (Desktop only)
  const isDesktop = window.matchMedia('(min-width: 992px)').matches;
  if (isDesktop) {
    const stage = document.getElementById('laptopStage') || laptopFrame.parentElement;

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(laptopFrame, {
        rotateY: relX * 10,
        rotateX: -relY * 8,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    stage.addEventListener('mouseleave', () => {
      gsap.to(laptopFrame, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  }
}

/* ==========================================================================
   Laptop Showcase JavaScript End
   ========================================================================== */

/* ==========================================================================
   Services Section JavaScript Start
   ========================================================================== */

/**
 * Services Section Scroll Entrance Animation
 * - Orchestrates a smooth, staggered entrance for the section header and the 6 cards.
 * - Respects prefers-reduced-motion.
 */
function initServicesScrollAnimation() {
  const section = document.getElementById('services');
  if (!section) return;

  const header = section.querySelector('.services-header');
  const cards = section.querySelectorAll('.service-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const playServicesEntrance = () => {
    const tlServices = gsap.timeline();

    if (header) {
      tlServices.from(header.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    tlServices.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    }, header ? '-=0.35' : 0);
  };

  // If section is already visible on load/reload, ensure it is immediately visible!
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  // Trigger entrance ONLY when entering the viewport — never hide upfront!
  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: playServicesEntrance
  });
}

/* ==========================================================================
   Services Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Clients Section JavaScript Start
   ========================================================================== */

/**
 * Clients Section Entrance Animation
 * - Orchestrates a smooth, staggered entrance for the clients header, metrics ribbon, and marquee.
 * - Respects prefers-reduced-motion.
 */
function initClientsScrollAnimation() {
  const section = document.getElementById('clients');
  if (!section) return;

  const header = section.querySelector('.clients-header');
  const marquee = section.querySelector('.clients-marquee-viewport');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (marquee) gsap.set(marquee, { opacity: 1, scale: 1, clearProps: 'all' });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const playClientsEntrance = () => {
    const tlClients = gsap.timeline();

    if (header) {
      tlClients.from(header.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    if (marquee) {
      tlClients.from(marquee, {
        opacity: 0,
        scale: 0.98,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      }, header ? '-=0.35' : 0);
    }
  };

  // If section is already visible on load/reload, ensure it is immediately visible!
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (marquee) gsap.set(marquee, { opacity: 1, scale: 1, clearProps: 'all' });
    return;
  }

  // Trigger entrance ONLY when entering the viewport — never hide upfront!
  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: playClientsEntrance
  });
}

/* ==========================================================================
   Clients Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Stats Banner Section JavaScript Start
   ========================================================================== */

/**
 * Builds vertical spinning digit reels for each numeric character in the stat.
 * Symbols like % and / remain stationary, while digits spin vertically.
 */
function buildSpinReel(container, valueString) {
  container.innerHTML = '';
  const chars = valueString.split('');
  const reels = [];

  chars.forEach((char, charIdx) => {
    if (/\d/.test(char)) {
      const targetDigit = parseInt(char, 10);
      const digitWrapper = document.createElement('span');
      digitWrapper.className = 'spin-digit';

      const reel = document.createElement('span');
      reel.className = 'spin-reel';

      // Build sequence: 2 full cycles (0-9) + extra stagger per char index + up to target digit
      const cycles = 2 + (charIdx % 2);
      const numbers = [];
      for (let c = 0; c < cycles; c++) {
        for (let n = 0; n <= 9; n++) {
          numbers.push(n);
        }
      }
      for (let n = 0; n <= targetDigit; n++) {
        numbers.push(n);
      }

      numbers.forEach((num) => {
        const item = document.createElement('span');
        item.textContent = num;
        reel.appendChild(item);
      });

      digitWrapper.appendChild(reel);
      container.appendChild(digitWrapper);

      const targetIndex = numbers.length - 1;
      reels.push({ reel, targetIndex, charIdx });
    } else {
      const symbol = document.createElement('span');
      symbol.className = 'spin-symbol';
      symbol.textContent = char;
      container.appendChild(symbol);
    }
  });

  return reels;
}

/**
 * Initializes the vertical spinning number wheel effect when scrolled into view.
 * Uses GSAP ScrollTrigger for smooth deceleration easing with inertia.
 * Respects prefers-reduced-motion.
 */
function initStatsSpinAnimation() {
  const section = document.getElementById('stats');
  if (!section) return;

  const statValues = section.querySelectorAll('.stat-value');
  if (!statValues.length) return;

  const allReelData = [];
  statValues.forEach((valEl) => {
    const rawVal = valEl.getAttribute('data-spin-value') || valEl.textContent.trim();
    const reels = buildSpinReel(valEl, rawVal);
    allReelData.push(...reels);
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    // If reduced motion or no GSAP, position immediately at final target
    allReelData.forEach(({ reel, targetIndex }) => {
      const itemHeight = reel.children[0] ? reel.children[0].offsetHeight : 0;
      reel.style.transform = `translateY(-${targetIndex * itemHeight}px)`;
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  let hasSpun = false;
  const runSpin = () => {
    if (hasSpun) return;
    hasSpun = true;
    allReelData.forEach(({ reel, targetIndex, charIdx }, idx) => {
      const itemHeight = reel.children[0] ? reel.children[0].offsetHeight : 0;
      gsap.fromTo(reel,
        { y: 0 },
        {
          y: -targetIndex * itemHeight,
          duration: 1.8 + (charIdx * 0.35) + ((idx % 3) * 0.15),
          ease: 'power3.out'
        }
      );
    });
  };

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    // If already in view on load/reload, spin after brief font/layout settle
    setTimeout(runSpin, 120);
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: runSpin
  });
}

/* ==========================================================================
   Stats Banner Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Our Tech Stack Section JavaScript Start
   ========================================================================== */

/**
 * Orchestrates smooth scroll entrance animations for Our Tech Stack section:
 * header reveal and staggered tech logo cards.
 * Uses ScrollTrigger.create onEnter to ensure zero upfront hiding or blank reload gotchas.
 */
function initTechStackScrollAnimation() {
  const section = document.getElementById('techStack');
  if (!section) return;

  const header = section.querySelector('.tech-stack-header');
  const cards = section.querySelectorAll('.tech-card');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const playTechEntrance = () => {
    const tl = gsap.timeline();

    if (header) {
      tl.from(header.children, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    if (cards.length) {
      tl.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'all'
      }, header ? '-=0.35' : 0);
    }
  };

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: playTechEntrance
  });
}

/* ==========================================================================
   Our Tech Stack Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Why Choose Section JavaScript Start
   ========================================================================== */

/**
 * Orchestrates scroll entrance animations for Why Choose ByteTabs section:
 * header reveal and staggered why-choose-cards.
 * Uses ScrollTrigger.create onEnter to ensure zero blank reload gotchas.
 */
function initWhyChooseScrollAnimation() {
  const section = document.getElementById('whyChoose');
  if (!section) return;

  const header = section.querySelector('.why-choose-header');
  const cards = section.querySelectorAll('.why-choose-card');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const playWhyChooseEntrance = () => {
    const tl = gsap.timeline();

    if (header) {
      tl.from(header.children, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    if (cards.length) {
      tl.from(cards, {
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      }, header ? '-=0.35' : 0);
    }
  };

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    if (header) gsap.set(header.children, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: playWhyChooseEntrance
  });
}

/* ==========================================================================
   Why Choose Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Brand Partners Section JavaScript Start
   ========================================================================== */

/**
 * Orchestrates smooth scroll entrance animations for Brand Partners section:
 * main title reveal and staggered logo cards.
 * Uses ScrollTrigger.create onEnter to guarantee zero blank reload gotchas.
 */
function initBrandPartnersScrollAnimation() {
  const section = document.getElementById('brandPartners');
  if (!section) return;

  const title = section.querySelector('.brand-partners-title');
  const cards = section.querySelectorAll('.brand-partner-card');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !window.gsap || !window.ScrollTrigger) {
    if (title) gsap.set(title, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const playPartnersEntrance = () => {
    const tl = gsap.timeline();

    if (title) {
      tl.from(title, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }

    if (cards.length) {
      tl.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'all'
      }, title ? '-=0.3' : 0);
    }
  };

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    if (title) gsap.set(title, { opacity: 1, y: 0, clearProps: 'all' });
    if (cards.length) gsap.set(cards, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: playPartnersEntrance
  });
}

/* ==========================================================================
   Brand Partners Section JavaScript End
   ========================================================================== */

/* ==========================================================================
   Window Load & Scroll Restoration Recalibration Start
   ========================================================================== */

/**
 * Handles post-load recalculations when all images, webfonts, and hero media
 * have completed rendering. Prevents any unrefreshed trigger points or blank
 * section states during browser scroll restoration.
 */
window.addEventListener('load', () => {
  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }

  // Safety check on full asset load & browser scroll restoration:
  // Ensure any section currently in or above the viewport has visible content
  const sectionsToCheck = [
    { id: 'laptopShowcaseSection', sel: '#laptopFrame, #showcaseContentCol > *' },
    { id: 'services', sel: '.services-header > *, .service-card' },
    { id: 'clients', sel: '.clients-header > *, .clients-marquee-viewport' },
    { id: 'techStack', sel: '.tech-stack-title, .tech-card' },
    { id: 'whyChoose', sel: '.why-choose-header > *, .why-choose-card' },
    { id: 'brandPartners', sel: '.brand-partners-title, .brand-partner-card' }
  ];

  sectionsToCheck.forEach(({ id, sel }) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      const items = sec.querySelectorAll(sel);
      items.forEach((item) => {
        if (item.style && item.style.opacity === '0') {
          if (window.gsap) {
            gsap.set(item, { opacity: 1, y: 0, clearProps: 'all' });
          } else {
            item.style.opacity = '1';
            item.style.transform = '';
          }
        }
      });
    }
  });
});

// Also refresh on bfcache navigation (back/forward browser cache)
window.addEventListener('pageshow', (event) => {
  if (event.persisted && window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

/* ==========================================================================
   Window Load & Scroll Restoration Recalibration End
   ========================================================================== */

/* ==========================================================================
   Testimonials Section JavaScript Start
   ========================================================================== */

/**
 * Interactive Infinite Carousel Slider for Testimonials Section.
 * Features:
 * - 4 distinct testimonial cards
 * - Infinite seamless looping in both directions via cloned cards
 * - Auto-slide with configurable interval (4.5s)
 * - Pause on hover and touch/pointer interaction
 * - Click navigation for Previous and Next with active button states
 * - Touch & pointer swipe support
 * - Responsive recalibration on window resize
 */
function initTestimonialsSlider() {
  const prevBtn = document.getElementById('testimonialPrevBtn');
  const nextBtn = document.getElementById('testimonialNextBtn');
  const viewport = document.getElementById('testimonialsViewport');
  const track = document.getElementById('testimonialsTrack');

  if (!viewport || !track) return;

  const originalCards = Array.from(track.children);
  const totalOriginal = originalCards.length;
  if (totalOriginal === 0) return;

  // Clone items after
  originalCards.forEach((card) => {
    const cloneAfter = card.cloneNode(true);
    cloneAfter.classList.add('is-clone');
    cloneAfter.setAttribute('aria-hidden', 'true');
    track.appendChild(cloneAfter);
  });

  // Clone items before in original sequence
  const beforeFragment = document.createDocumentFragment();
  originalCards.forEach((card) => {
    const cloneBefore = card.cloneNode(true);
    cloneBefore.classList.add('is-clone');
    cloneBefore.setAttribute('aria-hidden', 'true');
    beforeFragment.appendChild(cloneBefore);
  });
  track.insertBefore(beforeFragment, track.firstChild);

  // Start at the first original card
  let currentIndex = totalOriginal;
  let isAnimating = false;
  let autoSlideTimer = null;
  const AUTO_SLIDE_DELAY = 4500;

  function getStep() {
    const allCards = track.querySelectorAll('.testimonial-card');
    if (!allCards.length) return 0;
    const cardWidth = allCards[0].getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 28;
    return cardWidth + gap;
  }

  function setPosition(animate = true) {
    const step = getStep();
    const offset = -(currentIndex * step);

    if (animate) {
      track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  // Initial positioning at the original cards
  setPosition(false);

  // Seamless jump on transition completion
  track.addEventListener('transitionend', (e) => {
    if (e.target !== track) return;
    isAnimating = false;

    // Wrapped past the end clones -> jump to original start
    if (currentIndex >= totalOriginal * 2) {
      currentIndex -= totalOriginal;
      setPosition(false);
    }
    // Wrapped before the start clones -> jump to original end
    else if (currentIndex < totalOriginal) {
      currentIndex += totalOriginal;
      setPosition(false);
    }
  });

  function updateButtonHighlight(activeBtn, otherBtn) {
    if (activeBtn) activeBtn.classList.add('active');
    if (otherBtn) otherBtn.classList.remove('active');
  }

  function slideNext() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    setPosition(true);
    updateButtonHighlight(nextBtn, prevBtn);

    // Fallback safety to release animation lock
    setTimeout(() => {
      isAnimating = false;
    }, 700);
  }

  function slidePrev() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    setPosition(true);
    updateButtonHighlight(prevBtn, nextBtn);

    // Fallback safety to release animation lock
    setTimeout(() => {
      isAnimating = false;
    }, 700);
  }

  // Auto-slide Management
  function startAutoSlide() {
    stopAutoSlide();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    autoSlideTimer = setInterval(() => {
      slideNext();
    }, AUTO_SLIDE_DELAY);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Click Event Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      slideNext();
      startAutoSlide();
    });
    nextBtn.addEventListener('mouseenter', stopAutoSlide);
    nextBtn.addEventListener('mouseleave', startAutoSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      slidePrev();
      startAutoSlide();
    });
    prevBtn.addEventListener('mouseenter', stopAutoSlide);
    prevBtn.addEventListener('mouseleave', startAutoSlide);
  }

  // Hover Pause on Slider Viewport
  viewport.addEventListener('mouseenter', stopAutoSlide);
  viewport.addEventListener('mouseleave', startAutoSlide);

  // Pointer & Touch Swipe Support
  let startX = 0;
  let isPointerDown = false;
  let hasSwiped = false;
  const SWIPE_THRESHOLD = 36;

  viewport.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isPointerDown = true;
    hasSwiped = false;
    startX = e.clientX;
    stopAutoSlide();
  });

  window.addEventListener('pointermove', (e) => {
    if (!isPointerDown || hasSwiped) return;
    const deltaX = e.clientX - startX;
    if (deltaX < -SWIPE_THRESHOLD) {
      hasSwiped = true;
      slideNext();
    } else if (deltaX > SWIPE_THRESHOLD) {
      hasSwiped = true;
      slidePrev();
    }
  });

  window.addEventListener('pointerup', () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (!viewport.matches(':hover')) {
      startAutoSlide();
    }
  });

  // Responsive Recalibration on Resize
  let resizeDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      setPosition(false);
    }, 100);
  });

  // Begin Auto-slide
  startAutoSlide();
}

/* ==========================================================================
   Testimonials Section JavaScript End
   ========================================================================== */






