let config = {};

async function loadConfig() {
    try {
        const res = await fetch('config.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        config = await res.json();
        applyMeta();
        renderPortfolio();
        initScrollReveal();
        initNavScroll();
    } catch (err) {
        console.error('Failed to load config:', err);
        document.body.innerHTML = `
            <div style="padding:3rem;text-align:center;font-family:sans-serif">
                <h1 style="margin-bottom:1rem">Error Loading Portfolio</h1>
                <p style="color:#666">${err.message}</p>
            </div>`;
    }
}

function applyMeta() {
    const { meta, theme } = config;
    if (meta?.title) document.title = meta.title;

    const setMeta = (name, content) => {
        let el = document.querySelector(`meta[name="${name}"]`);
        if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
        el.content = content;
    };

    if (meta?.description) setMeta('description', meta.description);
    if (meta?.keywords) setMeta('keywords', meta.keywords);

    if (theme?.colors) {
        const root = document.documentElement;
        const c = theme.colors;
        if (c.primary) root.style.setProperty('--clr-primary', c.primary);
        if (c.primaryDark) root.style.setProperty('--clr-primary-dark', c.primaryDark);
        if (c.secondary) root.style.setProperty('--clr-accent', c.secondary);
        if (c.accent) root.style.setProperty('--clr-success', c.accent);
    }
}

function renderPortfolio() {
    renderNavbar();
    renderHero();
    renderStats();
    renderAbout();
    renderExperience();
    renderSkills();
    renderProjects();
    renderCertificates();
    renderEducation();
    renderContact();
    renderFooter();
}

// ─── Navigation ────────────────────────────────────────────────────────────

function renderNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const name = config.personalInfo?.name || 'Portfolio';
    const parts = name.split(' ');
    const first = parts[0];
    const rest = parts.slice(1).join(' ');

    const resumeFile = config.resume?.files?.[0]?.file;

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#experience', label: 'Experience' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#certificates', label: 'Certifications' },
        { href: '#education', label: 'Education' },
    ];

    nav.innerHTML = `
        <a class="nav-brand" href="#hero">${first} <span>${rest}</span></a>
        <ul class="nav-links">
            ${navLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
        </ul>
        <div class="nav-cta">
            ${resumeFile ? `<a href="${resumeFile}" download class="btn btn-primary">Download CV</a>` : ''}
        </div>
    `;
}

// ─── Hero ──────────────────────────────────────────────────────────────────

const SOCIAL_ICONS = {
    linkedin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
    github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
};

const PIN_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function renderHero() {
    const section = document.getElementById('hero');
    if (!section) return;

    const info = config.personalInfo || {};
    const social = config.socialLinks || [];
    const resumeFile = config.resume?.files?.[0]?.file;

    section.innerHTML = `
        <div class="hero-inner">
            <div class="hero-text">
                <p class="hero-greeting">Hello, I'm</p>
                <h1 class="hero-name">${escHtml(info.name || 'Portfolio')}</h1>
                <p class="hero-title">${escHtml(info.title || '')}</p>
                ${info.location ? `<p class="location-badge">${PIN_ICON} ${escHtml(info.location)}</p>` : ''}
                ${info.summary ? `<p class="hero-description">${escHtml(info.summary)}</p>` : ''}
                <div class="hero-actions">
                    ${resumeFile ? `<a href="${resumeFile}" download class="btn btn-primary">Download Resume</a>` : ''}
                    <a href="#contact" class="btn btn-outline">Get in Touch</a>
                </div>
                <div class="hero-social">
                    ${social.map(s => `
                        <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${escHtml(s.name)}">
                            ${SOCIAL_ICONS[s.icon] || ''} ${escHtml(s.name)}
                        </a>
                    `).join('')}
                </div>
            </div>
            ${info.profileImage ? `
                <div class="hero-image-wrap">
                    <div class="hero-avatar-frame">
                        <img class="hero-avatar" src="${info.profileImage}" alt="${escHtml(info.name || 'Profile')} — profile photo">
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// ─── Stats ─────────────────────────────────────────────────────────────────

function renderStats() {
    const strip = document.getElementById('stats');
    if (!strip) return;

    const stats = config.stats;
    if (!stats || stats.length === 0) { strip.style.display = 'none'; return; }

    strip.innerHTML = `
        <div class="stats-inner">
            ${stats.map(s => `
                <div class="stat-item">
                    <div class="stat-value">${escHtml(s.value)}</div>
                    <div class="stat-label">${escHtml(s.label)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// ─── About ─────────────────────────────────────────────────────────────────

function renderAbout() {
    const section = document.getElementById('about');
    if (!section) return;

    const info = config.personalInfo || {};
    if (!info.about && !info.summary) { section.style.display = 'none'; return; }

    section.className = 'section-card';

    const hasBoth = info.summary && info.about;

    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">About Me</p>
            <h2 class="section-title">Who I Am</h2>
        </div>
        <div class="${hasBoth ? 'about-grid' : ''}">
            ${info.summary ? `
                <div class="about-block">
                    <h3>Summary</h3>
                    <p>${escHtml(info.summary)}</p>
                </div>
            ` : ''}
            ${info.about ? `
                <div class="about-block">
                    <h3>Philosophy</h3>
                    <p>${escHtml(info.about)}</p>
                </div>
            ` : ''}
        </div>
    `;
}

// ─── Experience ────────────────────────────────────────────────────────────

function renderExperience() {
    const section = document.getElementById('experience');
    if (!section) return;

    const exp = config.experience;
    if (!exp?.items?.length) { section.style.display = 'none'; return; }

    section.className = 'section-card';
    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">Career</p>
            <h2 class="section-title">Work Experience</h2>
        </div>
        <div class="timeline">
            ${exp.items.map(item => `
                <div class="timeline-item">
                    <div class="timeline-dot" aria-hidden="true"></div>
                    <div class="timeline-date">${escHtml(item.period || '')}</div>
                    <div class="timeline-role">${escHtml(item.title || '')}</div>
                    <div class="timeline-company">${escHtml(item.company || '')}</div>
                    ${(item.description || []).length ? `
                        <ul class="timeline-bullets">
                            ${item.description.map(d => `<li>${escHtml(d)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// ─── Skills ────────────────────────────────────────────────────────────────

const SKILL_ICONS = {
    activity:    '📊',
    code:        '💻',
    server:      '🖥️',
    eye:         '👁️',
    cloud:       '☁️',
    tool:        '🔧',
    language:    '🌐',
    application: '📱',
};

function renderSkills() {
    const section = document.getElementById('skills');
    if (!section) return;

    const skills = config.skills;
    if (!skills?.categories?.length) { section.style.display = 'none'; return; }

    section.className = 'section-card';
    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">Expertise</p>
            <h2 class="section-title">Core Skills</h2>
        </div>
        <div class="skills-grid">
            ${skills.categories.map(cat => {
                const tags = (cat.items || '').split(',').map(t => t.trim()).filter(Boolean);
                return `
                    <div class="skill-category-card">
                        <div class="skill-cat-header">
                            <span class="skill-cat-icon" aria-hidden="true">${SKILL_ICONS[cat.icon] || '⚡'}</span>
                            <span class="skill-cat-name">${escHtml(cat.title)}</span>
                        </div>
                        <div class="skill-tags">
                            ${tags.map(tag => `<span class="skill-tag">${escHtml(tag)}</span>`).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ─── Projects ──────────────────────────────────────────────────────────────

const PROJECT_ICONS = ['🚀', '⚡', '🔧', '📊', '🛠️', '🔬'];

function renderProjects() {
    const section = document.getElementById('projects');
    if (!section) return;

    const projects = config.projects;
    if (!projects?.items?.length) { section.style.display = 'none'; return; }

    section.className = 'section-card';
    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">Portfolio</p>
            <h2 class="section-title">Highlighted Projects</h2>
        </div>
        <div class="projects-grid">
            ${projects.items.map((p, i) => `
                <div class="project-card">
                    <div class="project-icon-wrap" aria-hidden="true">${PROJECT_ICONS[i % PROJECT_ICONS.length]}</div>
                    <div class="project-title">
                        ${p.url
                            ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer">${escHtml(p.title)} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>`
                            : escHtml(p.title)
                        }
                    </div>
                    ${p.description ? `<p class="project-description">${escHtml(p.description)}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// ─── Certificates ──────────────────────────────────────────────────────────

function renderCertificates() {
    const section = document.getElementById('certificates');
    if (!section) return;

    const certs = config.certificates;
    if (!certs?.items?.length) { section.style.display = 'none'; return; }

    section.className = 'section-card';

    const cardsHtml = certs.items.map((cert, i) => {
        const hasMedia = cert.image || cert.pdf;
        const fileType = cert.pdf ? 'pdf' : 'image';
        const fileToShow = cert.image || cert.pdf || '';

        return `
            <div class="certificate-card">
                <span class="cert-badge">✓ Certified</span>
                <div class="cert-title">${escHtml(cert.title)}</div>
                ${cert.issuer ? `<div class="cert-issuer">${escHtml(cert.issuer)}</div>` : ''}
                ${cert.date ? `<div class="cert-date">${escHtml(cert.date)}</div>` : ''}
                ${hasMedia ? `
                    <button class="cert-view-btn certificate-btn"
                        data-cert-index="${i}"
                        data-file="${fileToShow}"
                        data-type="${fileType}"
                        data-pdf="${cert.pdf || ''}"
                        data-image="${cert.image || ''}">
                        📜 View Certificate
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');

    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">Credentials</p>
            <h2 class="section-title">Certifications</h2>
        </div>
        <div class="certificates-grid">${cardsHtml}</div>
        <div id="certificate-modal" class="certificate-modal" role="dialog" aria-modal="true" aria-label="Certificate viewer">
            <div class="certificate-modal-content">
                <button class="certificate-modal-close" aria-label="Close">&times;</button>
                <div class="certificate-modal-body"></div>
            </div>
        </div>
    `;

    setupCertificateModals();
}

function setupCertificateModals() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;
    const modalBody = modal.querySelector('.certificate-modal-body');
    const closeBtn = modal.querySelector('.certificate-modal-close');
    let currentIdx = null;

    document.querySelectorAll('.certificate-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            const idx = btn.dataset.certIndex;
            if (currentIdx === idx && modal.classList.contains('active')) { closeModal(); return; }
            currentIdx = idx;
            openModal(btn.dataset.file, btn.dataset.type, btn.dataset.pdf);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    function openModal(file, type, pdf) {
        if (!file) return;
        const downloadHtml = pdf
            ? `<div class="cert-modal-download"><a href="${pdf}" download class="btn btn-primary" style="margin-top:1rem">📥 Download PDF</a></div>`
            : '';

        modalBody.innerHTML = type === 'pdf'
            ? `<iframe src="${file}" title="Certificate PDF"></iframe>${downloadHtml}`
            : `<img src="${file}" alt="Certificate">${downloadHtml}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalBody.innerHTML = '';
        currentIdx = null;
    }
}

// ─── Education ─────────────────────────────────────────────────────────────

function renderEducation() {
    const section = document.getElementById('education');
    if (!section) return;

    const edu = config.education;
    if (!edu?.items?.length) { section.style.display = 'none'; return; }

    section.className = 'section-card';
    section.innerHTML = `
        <div class="section-header">
            <p class="section-label">Academic Background</p>
            <h2 class="section-title">Education</h2>
        </div>
        <div class="education-grid">
            ${edu.items.map(item => `
                <div class="education-card">
                    <div class="edu-period">${escHtml(item.period || '')}</div>
                    <div class="edu-title">${escHtml(item.title || '')}</div>
                    <p class="edu-description">${escHtml(item.description || '')}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// ─── Contact ───────────────────────────────────────────────────────────────

function renderContact() {
    const section = document.getElementById('contact');
    if (!section) return;

    const email = config.personalInfo?.email;
    const resumeFile = config.resume?.files?.[0]?.file;
    const linkedin = (config.socialLinks || []).find(s => s.icon === 'linkedin');

    section.className = 'section-card contact-card';
    section.innerHTML = `
        <p class="contact-eyebrow">Let's Connect</p>
        <h2 class="contact-title">Open to Opportunities</h2>
        <p class="contact-subtitle">Interested in SRE, Platform Engineering, or Cloud Infrastructure roles? Let's talk.</p>
        <div class="contact-actions">
            ${email ? `<a href="mailto:${email}" class="btn btn-primary">✉️ Send Email</a>` : ''}
            ${linkedin ? `<a href="${linkedin.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">Connect on LinkedIn</a>` : ''}
            ${resumeFile ? `<a href="${resumeFile}" download class="btn btn-outline">Download Resume</a>` : ''}
        </div>
    `;
}

// ─── Footer ────────────────────────────────────────────────────────────────

function renderFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    footer.innerHTML = `<p>© ${new Date().getFullYear()} ${escHtml(config.personalInfo?.name || 'Portfolio')}. All rights reserved.</p>`;
}

// ─── Scroll animations ─────────────────────────────────────────────────────

function initScrollReveal() {
    const cards = document.querySelectorAll('.section-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
        { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(card => observer.observe(card));
}

// ─── Nav scroll highlight ──────────────────────────────────────────────────

function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 24);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ─── Utility ───────────────────────────────────────────────────────────────

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ─── Init ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', loadConfig);
