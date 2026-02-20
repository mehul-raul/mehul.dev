 // ── Custom cursor
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
    // Hide on mobile
    if ('ontouchstart' in window) {
      dot.style.display = 'none'; ring.style.display = 'none';
    }

    // ── Sticky nav
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ── Hamburger
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.style.display = 'flex';
      mobileMenu.classList.toggle('open');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // ── Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });

    // ── Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));

    // ── Active nav highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
      });
    });


    function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    const btn = document.getElementById('theme-toggle');
    btn.textContent = isLight ? '☾ Dark' : '☀ Light';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    // Remember preference on reload
    if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    document.getElementById('theme-toggle').textContent = '☾ Dark';
    }