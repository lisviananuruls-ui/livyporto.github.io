/* ============================================
   script.js — Profile Landing Page
   ============================================ */

/* ── PROTEKSI KONTEN ── */

// Disable klik kanan (context menu) di seluruh halaman
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});

// Disable drag gambar (supaya ga bisa di-drag ke tab baru)
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// Disable keyboard shortcut save / inspect (Ctrl+S, Ctrl+U, Ctrl+Shift+I, F12, dll)
document.addEventListener('keydown', (e) => {
  const blockedKeys = [
    { ctrl: true,  key: 's' },   // Ctrl+S  — Save Page
    { ctrl: true,  key: 'u' },   // Ctrl+U  — View Source
    { ctrl: true,  key: 'p' },   // Ctrl+P  — Print
    { ctrl: true,  shift: true, key: 'i' }, // Ctrl+Shift+I — DevTools
    { ctrl: true,  shift: true, key: 'j' }, // Ctrl+Shift+J — Console
    { ctrl: true,  shift: true, key: 'c' }, // Ctrl+Shift+C — Inspector
    { key: 'F12' },                          // F12 — DevTools
  ];

  const match = blockedKeys.some((b) => {
    const ctrlOk  = b.ctrl  ? (e.ctrlKey  || e.metaKey) : true;
    const shiftOk = b.shift ? e.shiftKey               : true;
    return ctrlOk && shiftOk && e.key.toLowerCase() === b.key.toLowerCase();
  });

  if (match) {
    e.preventDefault();
    return false;
  }
});

// Pointer-events: none pada semua <img> via CSS (injected)
// — mencegah klik kanan langsung di elemen gambar
(function injectImgProtect() {
  const style = document.createElement('style');
  style.textContent = `
    img {
      pointer-events: none;
      -webkit-user-drag: none;
      user-drag: none;
      -webkit-user-select: none;
      user-select: none;
    }
    * {
      -webkit-user-select: none;
      user-select: none;
    }
    /* Tetap izinkan select pada input & textarea */
    input, textarea {
      -webkit-user-select: text;
      user-select: text;
    }
  `;
  document.head.appendChild(style);
})();

/* ── PHOTO UPLOAD ── */
function loadPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const img = document.getElementById('photoImg');
  const card = document.getElementById('photoCard');

  img.src = url;
  img.style.display = 'block';
  card.querySelector('.moon-icon').style.display = 'none';
  card.querySelector('span').style.display = 'none';
}

/* ── LORE Personality ── */
function togglePersonality() {
  const body = document.getElementById('personalBody');
  const btn = document.getElementById('perBtn');
  const isOpen = body.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? 'tutup ↑' : 'klik disini →';
}

/* ── LORE TOGGLE ── */
function toggleLore() {
  const body = document.getElementById('loreBody');
  const btn = document.getElementById('lorBtn');
  const isOpen = body.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? 'tutup ↑' : 'klik disini →';
}

function toggleLore2() {
  const body = document.getElementById('loreBody2');
  const btn = document.getElementById('lorBtn2');
  const isOpen = body.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? 'tutup ↑' : 'klik disini →';
}

function toggleLore3() {
  const body = document.getElementById('loreBody3');
  const btn = document.getElementById('lorBtn3');
  const isOpen = body.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? 'tutup ↑' : 'klik disini →';
}
function toggleLore4() {
  const body = document.getElementById('loreBody4');
  const btn = document.getElementById('lorBtn4');
  const isOpen = body.classList.toggle('open');
  if (btn) btn.textContent = isOpen ? 'tutup ↑' : 'klik disini →';
}

/* ── GALLERY DRAG SCROLL ── */
const track = document.getElementById('galleryTrack');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.style.cursor = 'grabbing';
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.parentElement.scrollLeft;
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
  isDown = false;
  track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.2;
  track.parentElement.scrollLeft = scrollLeft - walk;
});

/* ── GALLERY TOUCH SUPPORT ── */
let touchStartX = 0;
let touchScrollLeft = 0;

track.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].pageX;
  touchScrollLeft = track.parentElement.scrollLeft;
}, { passive: true });

track.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX;
  const walk = (touchStartX - x) * 1.2;
  track.parentElement.scrollLeft = touchScrollLeft + walk;
}, { passive: true });

/* ── GALLERY BUTTON SCROLL ── */
function galleryScroll(dir) {
  const wrap = track.parentElement;
  const itemW = track.querySelector('.gallery-item').offsetWidth + 12;
  wrap.scrollBy({ left: dir * itemW, behavior: 'smooth' });
}

/* ── ACTIVE NAV ── */
document.querySelectorAll('nav a').forEach((a) => {
  a.addEventListener('click', (e) => {
    document.querySelectorAll('nav a').forEach((x) => x.classList.remove('active'));
    e.target.classList.add('active');
  });
});

/* ── MOBILE NAV HAMBURGER ── */
const hamburger = document.getElementById('navHamburger');
const drawer    = document.getElementById('navDrawer');

function closeNav() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
}

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
  });

  // Tutup drawer kalau klik di luar
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
      closeNav();
    }
  });
}