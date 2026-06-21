// ——— Бургер-меню ———
const burgerBtn = document.getElementById('burgerBtn');
const overlay = document.getElementById('mobileMenuOverlay');
const closeBtn = document.getElementById('closeMenuBtn');
const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

function openMenu() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
});
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ——— Стрелки для прокрутки сеток ———
const grids = {
    novinki: document.querySelector('[data-grid="novinki"]'),
    popular: document.querySelector('[data-grid="popular"]'),
    catalog: document.querySelector('[data-grid="catalog"]'),
    kids: document.querySelector('[data-grid="kids"]'),
    women: document.querySelector('[data-grid="women"]'),
    men: document.querySelector('[data-grid="men"]')
};

document.querySelectorAll('.arr-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        const grid = grids[sectionId];
        if (!grid) return;
        const isNext = this.classList.contains('next');
        const scrollAmount = 320;
        grid.scrollBy({
            left: isNext ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    });
});

// ——— Анимация появления ———
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.5s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .catalog-card, .design-card, .usp-item, .how-row, .insta-item, .strip-item')
    .forEach(el => observer.observe(el));

// ===== TOOLTIP =====
document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(el => new bootstrap.Tooltip(el));

// ===== TOAST =====
function showFavoriteToast() {
    const toastEl = document.getElementById('favoriteToast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.stopPropagation();
        showFavoriteToast();
    });
});

// ===== ScrollSpy =====
window.addEventListener('resize', () => {
    if (bootstrap.ScrollSpy) {
        const spy = bootstrap.ScrollSpy.getInstance(document.body);
        if (spy) spy.refresh();
    }
});