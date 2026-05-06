/* ── INTRO ─────────────────────────────────────────────── */
setTimeout(() => {
  document.getElementById('intro').classList.add('hidden');
  document.body.style.overflow = '';
}, 3400);
document.body.style.overflow = 'hidden';

/* ── DARK / LIGHT MODE ──────────────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
  currentTheme = t;
  localStorage.setItem('theme', t);
  if (window.particleCanvas) drawParticles();
}

themeBtn.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

/* ── HAMBURGER ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

/* ── ACTIVE NAV ─────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
  // back to top
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
});

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

/* ── PARTICLES ──────────────────────────────────────────── */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
window.particleCanvas = canvas;
let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 55; i++) {
  particles.push({
    x: Math.random() * 2000, y: Math.random() * 1000,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5
  });
}

function drawParticles() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  const pc = isDark ? 'rgba(124,58,237,' : 'rgba(79,70,229,';
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = pc + '0.6)';
    ctx.fill();
  });
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = pc + (0.12 * (1 - d / 130)) + ')';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── PROJECT FILTER ─────────────────────────────────────── */
function filterProj(btn, tag) {
  const filterWrap = btn.closest('.proj-filter');
  filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#projGrid .proj-card').forEach(card => {
    if (tag === 'all' || card.dataset.tags.includes(tag)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterCert(btn, tag) {
  const filterWrap = btn.closest('.proj-filter');
  filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#certGrid .cert-card').forEach(card => {
    if (tag === 'all' || card.dataset.tags.includes(tag)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ── FORM VALIDATION ────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  let valid = true;
  const name = document.getElementById('fname');
  const email = document.getElementById('femail');
  const msg = document.getElementById('fmsg');

  document.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');

  if (!name.value.trim()) {
    document.getElementById('err-name').style.display = 'block'; valid = false;
  }
  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('err-email').style.display = 'block'; valid = false;
  }
  if (!msg.value.trim()) {
    document.getElementById('err-msg').style.display = 'block'; valid = false;
  }
  if (valid) {
    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('contactForm').reset();
    setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 5000);
  }
}
