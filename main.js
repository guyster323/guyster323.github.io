/* ===================================
   써니데브스토리 - Main JavaScript
   =================================== */

// --- Particle System ---
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 8;
    const size = 2 + Math.random() * 3;
    const opacity = 0.1 + Math.random() * 0.4;

    particle.style.left = `${x}%`;
    particle.style.bottom = `-${size}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    // Random colors
    const colors = [
      'rgba(255, 140, 66, 0.6)',
      'rgba(139, 92, 246, 0.6)',
      'rgba(20, 184, 166, 0.5)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(255, 255, 255, 0.3)',
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

// --- Navigation ---
function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// --- Reveal on Scroll ---
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

// --- Counter Animation ---
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el, target) {
  let current = 0;
  const increment = target / 40;
  const duration = 1500;
  const stepTime = duration / 40;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

// --- Scroll Indicator Hide ---
function initScrollIndicator() {
  const indicator = document.getElementById('scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'auto';
    }
  });
}

// --- Language Toggle ---
function initLangToggle() {
  const toggleBtn = document.getElementById('lang-toggle');
  if (!toggleBtn) return;

  const htmlNode = document.documentElement;
  const koSpan = toggleBtn.querySelector('[data-lang="ko"]');
  const enSpan = toggleBtn.querySelector('[data-lang="en"]');
  
  const titles = {
    ko: "써니데브스토리 | Sunnydevstory - AI 앱 · 웹 서비스 개발자 랜딩페이지",
    en: "Sunnydevstory - AI App & Web Services Developer Landing Page"
  };
  const desc = {
    ko: "써니데브스토리(Sunnydevstory)는 AI 기반 Android 앱 Everydiary와 개발자 커뮤니티 GOOTE를 만드는 개인 개발 브랜드입니다. 앱 개발, 웹 서비스 제작, 프로젝트 협업 정보를 제공합니다.",
    en: "Sunnydevstory is a solo developer brand creating AI-based Android apps like Everydiary and testing community GOOTE. Showcasing apps, web development, and collaboration details."
  };

  const metaDesc = document.getElementById('meta-description');
  const ogTitle = document.getElementById('og-title');
  const ogDesc = document.getElementById('og-description');
  const twTitle = document.getElementById('twitter-title');
  const twDesc = document.getElementById('twitter-description');

  function setLanguage(lang) {
    htmlNode.lang = lang;
    
    // Update active states on the toggle spans
    if (lang === 'ko') {
      koSpan.classList.add('active');
      enSpan.classList.remove('active');
    } else {
      enSpan.classList.add('active');
      koSpan.classList.remove('active');
    }

    // Update document head meta tags dynamically
    document.title = titles[lang];
    if (metaDesc) metaDesc.content = desc[lang];
    if (ogTitle) ogTitle.content = titles[lang];
    if (ogDesc) ogDesc.content = desc[lang];
    if (twTitle) twTitle.content = titles[lang];
    if (twDesc) twDesc.content = desc[lang];
  }

  toggleBtn.addEventListener('click', () => {
    const newLang = htmlNode.lang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
  });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initNavigation();
  initRevealAnimations();
  initCounters();
  initScrollIndicator();
  initLangToggle();
});
