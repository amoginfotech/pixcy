document.addEventListener('DOMContentLoaded', () => {
  // 1. Data for the Platform Showcase switcher
  const showcaseData = [
    {
      title: "Raw Media & Production Ingestion",
      body: "Upload raw footage, industrial product photography, or retail catalog details directly. Our system prepares raw assets for advanced digital transformation.",
      image: "assets/media_production.png"
    },
    {
      title: "AI-Enabled Content & Synthesis Platform",
      body: "Generate matching copy, descriptive tags, ad variations, and video narratives instantly. Our proprietary engine creates high-converting variations tailormade for each network.",
      image: "assets/ai_platform_mockup.png"
    },
    {
      title: "Direct Publishing & Syndication API",
      body: "Bypass manual upload interfaces entirely. Our publishing platform syncs direct pipeline connections to social media platforms and programmatic ad coordinates.",
      image: "assets/hero_marketing.png"
    }
  ];

  // 2. Showcase Switching Logic
  window.triggerShowcase = function(index) {
    const tabs = document.querySelectorAll('.tab-link');
    const titleEl = document.getElementById('showcaseTitle');
    const bodyEl = document.getElementById('showcaseBody');
    const imgEl = document.getElementById('showcaseImg');

    if (!titleEl || !bodyEl || !imgEl) return;

    // Remove active class from all tabs
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === index);
    });

    // Fade out image and content, change source, and fade back in
    imgEl.style.opacity = '0.3';
    titleEl.style.opacity = '0.3';
    bodyEl.style.opacity = '0.3';

    setTimeout(() => {
      titleEl.textContent = showcaseData[index].title;
      bodyEl.textContent = showcaseData[index].body;
      imgEl.src = showcaseData[index].image;

      imgEl.style.opacity = '1';
      titleEl.style.opacity = '1';
      bodyEl.style.opacity = '1';
    }, 200);
  };

  // 3. Navbar scroll effect
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 4. Scroll Reveal Intersection Observer
  const revealItems = document.querySelectorAll('.reveal-item');
  if (revealItems.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, no need to track again
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  }

  // 5. Form Submission & Toast Banner Logic
  const contactForm = document.getElementById('contactFormNode');
  const toastBanner = document.getElementById('formToastNode');

  if (contactForm && toastBanner) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show Toast with smooth bounce
      toastBanner.classList.add('show');

      // Clear input fields
      contactForm.reset();

      // Hide toast after 4 seconds
      setTimeout(() => {
        toastBanner.classList.remove('show');
      }, 4000);
    });
  }

  // 6. Navigation Link Highlighting (Intersection Observer)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link:not(.nav-cta-btn)');

  if (sections.length > 0 && navLinks.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(sec => navObserver.observe(sec));
  }
});
