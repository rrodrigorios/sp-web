// ================================================
// SIQUEIRA & PENNA — script.js
// ================================================

// AOS
AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    disable: () => window.innerWidth < 768
});

// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
}

// Menu mobile
function toggleMobileMenu() {
    const navLinks     = document.getElementById('navLinks');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const isOpen = navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Fechar menu ao clicar num link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks     = document.getElementById('navLinks');
        const mobileToggle = document.querySelector('.mobile-toggle');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ========================================================
// ÁREAS NO INDEX — accordion (click em mobile/touch)
// No desktop continua funcionando por hover via CSS.
// No mobile/touch, hover não existe → usamos click.
// ========================================================

// Detecta se o dispositivo usa touch
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

function closeAllAreas(except) {
    document.querySelectorAll('.area-item-new').forEach(el => {
        if (el === except) return;
        el.classList.remove('open');
        const r = el.querySelector('.area-reveal-new');
        r.style.maxHeight    = '';
        r.style.opacity      = '';
        r.style.paddingTop   = '';
        r.style.paddingBottom = '';
        el.querySelector('h3').style.color = '';
    });
}

document.querySelectorAll('.area-header-new').forEach(header => {
    header.addEventListener('click', () => {
        // Só age em touch — no desktop o hover do CSS já cuida
        if (!isTouchDevice()) return;

        const item   = header.closest('.area-item-new');
        const reveal = item.querySelector('.area-reveal-new');

        // Lê o estado ANTES de qualquer alteração
        const isOpen = item.classList.contains('open');

        // Fecha todos os outros
        closeAllAreas(item);

        if (isOpen) {
            // Já estava aberto → fechar
            item.classList.remove('open');
            reveal.style.maxHeight    = '0';
            reveal.style.opacity      = '0';
            reveal.style.paddingTop   = '0';
            reveal.style.paddingBottom = '0';
            item.querySelector('h3').style.color = '';
        } else {
            // Estava fechado → abrir
            item.classList.add('open');
            reveal.style.maxHeight    = '500px';
            reveal.style.opacity      = '1';
            reveal.style.paddingTop   = '20px';
            reveal.style.paddingBottom = '15px';
            item.querySelector('h3').style.color = 'var(--secondary)';
        }
    });
});

// ========================================================
// FORMULÁRIO → EMAIL via FormSubmit
// ========================================================
function handleSubmit(event) {
    event.preventDefault();
    const form     = event.target;
    const btn      = form.querySelector('button[type="submit"], .btn-submit, .btn-submit-page');
    const nome     = form.querySelector('input[type="text"]').value.trim();
    const email    = form.querySelector('input[type="email"]').value.trim();
    const telefone = form.querySelector('input[type="tel"]').value.trim();
    const mensagem = form.querySelector('textarea').value.trim();

    // Feedback visual
    if (btn) { btn.textContent = 'Enviando...'; btn.disabled = true; }

    const formData = new FormData();
    formData.append('name',    nome);
    formData.append('email',   email);
    formData.append('phone',   telefone);
    formData.append('message', mensagem);
    formData.append('_subject', 'Novo contato pelo site — Siqueira & Penna');
    formData.append('_replyto', email);
    formData.append('_captcha', 'false');

    fetch('https://formsubmit.co/contato@siqueiraepenna.com.br', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(res => {
        if (res.ok) {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
        } else {
            throw new Error('Erro na resposta');
        }
    })
    .catch(() => {
        alert('Não foi possível enviar. Por favor, entre em contato pelo WhatsApp ou tente novamente.');
    })
    .finally(() => {
        if (btn) { btn.textContent = 'Enviar Mensagem'; btn.disabled = false; }
    });
}

// Parallax suave no hero (apenas desktop)
if (window.innerWidth > 768) {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            hero.style.backgroundPositionY = `calc(15% + ${window.scrollY * 0.3}px)`;
        }, { passive: true });
    }
}

// Carrossel Avaliações
const avalGrid = document.querySelector('.avaliacoes-grid');
const avalNext = document.querySelector('.aval-next');
const avalPrev = document.querySelector('.aval-prev');

if (avalGrid && avalNext && avalPrev) {
    avalNext.addEventListener('click', () => {
        avalGrid.scrollBy({ left: 360, behavior: 'smooth' });
    });
    avalPrev.addEventListener('click', () => {
        avalGrid.scrollBy({ left: -360, behavior: 'smooth' });
    });
}

// ========================================================
// LGPD — Banner de Cookies
// ========================================================
(function () {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;

    // Já respondeu antes → não mostra
    if (localStorage.getItem('sp_cookie_consent')) {
        banner.style.display = 'none';
        return;
    }

    // Mostra após 1.5s
    setTimeout(() => {
        banner.style.display = 'flex';
    }, 1500);
})();

function acceptCookies() {
    localStorage.setItem('sp_cookie_consent', 'accepted');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.add('hidden');
        setTimeout(() => banner.style.display = 'none', 400);
    }
}

function rejectCookies() {
    localStorage.setItem('sp_cookie_consent', 'rejected');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.classList.add('hidden');
        setTimeout(() => banner.style.display = 'none', 400);
    }
}

// ========================================================
// VÍDEO SOBRE — botão play sobre controls
// ========================================================
const sobreVideo = document.getElementById('sobreVideo');
const playBtn    = document.getElementById('playBtn');

if (sobreVideo && playBtn) {

    playBtn.addEventListener('click', () => {
        sobreVideo.play();
        playBtn.style.display = 'none';
    });

    // Quando o usuário clicar no play dos controls
    sobreVideo.addEventListener('play', () => {
        playBtn.style.display = 'none';
    });

    // Se pausar, botão volta
    sobreVideo.addEventListener('pause', () => {
        playBtn.style.display = 'block';
    });

    // Quando terminar
    sobreVideo.addEventListener('ended', () => {
        playBtn.style.display = 'block';
    });
}