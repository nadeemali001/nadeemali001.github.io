// Portfolio Renderer - Dynamically loads content from config.json
let config = {};

// Load configuration file
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        config = await response.json();
        
        // Validate config has required fields
        if (!config.personalInfo) {
            console.warn('Warning: personalInfo not found in config.json');
        }
        
        applyTheme();
        renderPortfolio();
    } catch (error) {
        console.error('Error loading config:', error);
        // Fallback: show error message
        document.body.innerHTML = `
            <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
                <h1>Error Loading Configuration</h1>
                <p>Please ensure config.json exists and is valid JSON.</p>
                <p style="color: #666; margin-top: 1rem;">Error: ${error.message}</p>
                <p style="color: #666; margin-top: 0.5rem;">Check the browser console for more details.</p>
            </div>
        `;
    }
}

// Apply theme settings from config
function applyTheme() {
    const theme = config.theme;
    const root = document.documentElement;
    
    // Apply colors
    if (theme.colors) {
        root.style.setProperty('--primary-color', theme.colors.primary);
        root.style.setProperty('--primary-dark', theme.colors.primaryDark);
        root.style.setProperty('--secondary-color', theme.colors.secondary);
        root.style.setProperty('--accent-color', theme.colors.accent);
        root.style.setProperty('--text-dark', theme.colors.textDark);
        root.style.setProperty('--text-light', theme.colors.textLight);
        root.style.setProperty('--bg-light', theme.colors.bgLight);
        root.style.setProperty('--bg-white', theme.colors.bgWhite);
        root.style.setProperty('--border-color', theme.colors.borderColor);
    }
    
    // Apply background
    if (theme.background) {
        const body = document.body;
        if (theme.background.type === 'gradient' && theme.background.gradient) {
            const grad = theme.background.gradient;
            body.style.background = `linear-gradient(${grad.direction || '135deg'}, ${grad.start} 0%, ${grad.end} 100%)`;
        } else if (theme.background.type === 'solid' && theme.background.color) {
            body.style.background = theme.background.color;
        } else if (theme.background.type === 'image' && theme.background.image) {
            body.style.backgroundImage = `url(${theme.background.image})`;
            body.style.backgroundSize = theme.background.size || 'cover';
            body.style.backgroundPosition = theme.background.position || 'center';
        }
    }
    
    // Apply fonts
    if (theme.fonts) {
        if (theme.fonts.googleFont) {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = 'https://fonts.googleapis.com';
            document.head.appendChild(link);
            
            const link2 = document.createElement('link');
            link2.rel = 'preconnect';
            link2.href = 'https://fonts.gstatic.com';
            link2.crossOrigin = 'anonymous';
            document.head.appendChild(link2);
            
            const fontLink = document.createElement('link');
            fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fonts.googleFont.replace(' ', '+')}:wght@${theme.fonts.googleFontWeights}&display=swap`;
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        }
        
        if (theme.fonts.primary) {
            document.body.style.fontFamily = theme.fonts.primary;
        }
    }
    
    // Apply effects
    if (theme.effects) {
        if (!theme.effects.animations) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
        }
        if (theme.effects.smoothScroll) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }
    
    // Update meta tags
    if (config.meta) {
        if (config.meta.title) {
            document.title = config.meta.title;
        }
        if (config.meta.description) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = config.meta.description;
        }
        if (config.meta.keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = config.meta.keywords;
        }
    }
}

// Render entire portfolio
function renderPortfolio() {
    renderNavigation();
    renderHeader();
    renderPersonalInfo();
    renderExperience();
    renderSkills();
    renderProjects();
    renderEducation();
    renderConnect();
    renderResume();
    renderFooter();
}

// Render navigation bar
function renderNavigation() {
    const nav = document.querySelector('nav.top-bar');
    if (!nav) return;
    
    const personalInfo = config.personalInfo;
    const socialLinks = config.socialLinks || [];
    
    nav.innerHTML = `
        <div class="name">${personalInfo.name || 'Portfolio'}</div>
        <div class="social-links">
            ${socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.name}</a>
            `).join('')}
        </div>
    `;
}

// Render header
function renderHeader() {
    const header = document.querySelector('header.header');
    if (!header) return;
    
    header.innerHTML = `<h1>${config.personalInfo.title || 'Hello!'}</h1>`;
}

// Render personal info section
function renderPersonalInfo() {
    const section = document.querySelector('section.image-and-text');
    if (!section) return;
    
    const personalInfo = config.personalInfo || {};
    
    if (!personalInfo.name && !personalInfo.summary && !personalInfo.about) {
        section.style.display = 'none';
        return;
    }
    
    section.innerHTML = `
        <div class="row">
            ${personalInfo.profileImage ? `
            <div>
                <img src="${personalInfo.profileImage}" alt="${personalInfo.name || 'Profile'} - Profile Picture">
            </div>
            ` : ''}
            <div>
                ${personalInfo.summary ? `<h3>Summary</h3><p>${personalInfo.summary}</p>` : ''}
                ${personalInfo.about ? `<h3>About</h3><p>${personalInfo.about}</p>` : ''}
            </div>
        </div>
    `;
}

// Render experience section
function renderExperience() {
    const section = document.querySelector('section.experience');
    if (!section) return;
    
    const experience = config.experience;
    if (!experience) return;
    
    let html = `<h2>${experience.sectionTitle || 'Experience'}</h2>`;
    
    if (experience.sectionImage) {
        html += `
            <div class="experience-image-row">
                <img src="${experience.sectionImage}" alt="Experience">
            </div>
        `;
    }
    
    html += '<div class="column">';
    
    if (experience.items && experience.items.length > 0) {
        experience.items.forEach(item => {
            html += `
                <div>
                    <div class="row">
                        <div>
                            <h3>${item.title || ''}</h3>
                            <p>${item.company || ''}</p>
                            <p>${item.period || ''}</p>
                        </div>
                        <div>
                            ${(item.description || []).map(desc => `<p>${desc}</p>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    html += '</div>';
    section.innerHTML = html;
}

// Render skills section
function renderSkills() {
    const section = document.querySelector('section.skills');
    if (!section) return;
    
    const skills = config.skills;
    if (!skills || (!skills.categories || skills.categories.length === 0)) {
        section.style.display = 'none';
        return;
    }
    
    let html = `<h2>${skills.sectionTitle || 'Skills'}</h2>`;
    
    html += '<div class="row">';
    
    if (skills.sectionImage) {
        html += `
            <div>
                <img src="${skills.sectionImage}" alt="Skills">
            </div>
        `;
    }
    
    html += '<div>';
    html += '<h3>My Skills</h3>';
    html += '<h4>Tricks of the Trade</h4><br>';
    
    if (skills.categories && skills.categories.length > 0) {
        skills.categories.forEach(category => {
            if (category.title && category.items) {
                const iconSvg = getSkillIcon(category.icon);
                html += `
                    <h3>
                        ${iconSvg}
                        ${category.title}:
                    </h3>
                    <p>${category.items}</p><br>
                `;
            }
        });
    }
    
    html += '</div>';
    html += '</div>';
    section.innerHTML = html;
}

// Get skill icon SVG
function getSkillIcon(iconType) {
    const icons = {
        tool: `<svg viewBox="0.5 15 199 170" xmlns="http://www.w3.org/2000/svg" height="30" width="40">
            <path d="M185.3 170.8H14.7c-7.8 0-14.2-6.4-14.2-14.2V29.2C.5 21.4 6.9 15 14.7 15h170.6c7.8 0 14.2 6.4 14.2 14.2v127.5c0 7.8-6.4 14.1-14.2 14.1zM14.7 22.1c-3.9 0-7.1 3.2-7.1 7.1v127.5c0 3.9 3.2 7.1 7.1 7.1h170.6c3.9 0 7.1-3.2 7.1-7.1V29.2c0-3.9-3.2-7.1-7.1-7.1H14.7zM132 181.5c0-2-1.6-3.5-3.6-3.5H71.6c-2 0-3.6 1.6-3.6 3.5 0 2 1.6 3.5 3.6 3.5h56.9c1.9 0 3.5-1.6 3.5-3.5zm49.7-31.9H18.3c-2 0-3.6-1.6-3.6-3.5V32.7c0-2 1.6-3.5 3.6-3.5h163.5c2 0 3.6 1.6 3.6 3.5V146c-.1 2-1.7 3.6-3.7 3.6zm-159.9-7.1h156.4V36.2H21.8v106.3zm106.3-44.7l28.4-21.7c1.6-1.2 1.9-3.4.7-5s-3.4-1.9-5-.7l-28.4 21.7c-1.6 1.2-1.9 3.4-.7 5 .7.9 1.8 1.4 2.8 1.4.8 0 1.6-.2 2.2-.7zm-9.6 4.9c1.3-1.4 1.3-3.7-.2-5-1.4-1.3-3.7-1.3-5 .2-1.2 1.3-5 1.3-8.2-.7-2.4-1.5-6-5-3.3-11.7 2.4-6.3.2-12.7-5.5-15.6-6.1-3.1-15.8-1.6-22.7 9.1-3.2 5-7.2 4.5-9.3 3.8-3.3-1.2-6.6-4.7-6.1-9 .2-1.9-1.2-3.7-3.2-3.9-2-.3-3.7 1.1-4 3-.8 7.1 3.8 14 10.8 16.5 6.7 2.4 13.5-.2 17.6-6.7 4.5-7 10.1-8.3 13.5-6.6 1.9 1 3.5 3.2 2.1 6.7-3.8 9.8.7 16.9 6.2 20.3 2.9 1.8 6.1 2.7 9.1 2.7 3.3.1 6.2-1 8.2-3.1z"></path>
        </svg>`,
        language: `<svg viewBox="0 19.2 200 161.6" xmlns="http://www.w3.org/2000/svg" height="30" width="40">
            <path d="M190.1 80.8h-5.5V31.4c0-7.4-4.9-12.2-12.5-12.2H14.8C7.6 19.2 0 23.5 0 31.4v103.4c0 7.6 7.3 15.1 14.8 15.1h56.9L66.8 173h-5.3c-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8h61.6c2.1 0 3.8-1.7 3.8-3.8s-1.7-3.8-3.8-3.8H119l-5-23h32.1v20.9c0 5.4 4.4 9.9 9.9 9.9h34.1c5.4 0 9.9-4.4 9.9-9.9V90.6c0-5.4-4.4-9.8-9.9-9.8zm-36.3 23h38.5v53.8h-38.5v-53.8zm36.3-15.3c1.2 0 2.2 1 2.2 2.2v5.5h-38.5v-5.5c0-1.2 1-2.2 2.2-2.2h34.1zM156 80.8c-5.4 0-9.9 4.4-9.9 9.9v28.6H7.7v-77h169.2v38.5H156zM7.7 31.4c0-3.3 4.4-4.5 7.1-4.5h157.3c4.2 0 4.8 2.2 4.8 4.5v3.2H7.7v-3.2zm103.4 141.7H74.7l4.9-23.1h26.5l5 23.1zm-1.8-30.8H14.8c-3.2 0-7.1-4.1-7.1-7.5v-7.9h138.5v15.4h-36.9zm83 28.6c0 1.2-1 2.2-2.2 2.2H156c-1.2 0-2.2-1-2.2-2.2v-5.5h38.5v5.5z"></path>
        </svg>`,
        application: `<svg viewBox="9.5 -0.025 181 200.125" xmlns="http://www.w3.org/2000/svg" height="30" width="40">
            <path d="M41.2 8.1c-1.9-1.9-1.9-4.9 0-6.7 1.9-1.9 4.9-1.9 6.7 0l9.5 9.5c1.9 1.9 1.9 4.9 0 6.7-.9.9-2.1 1.4-3.4 1.4s-2.4-.5-3.4-1.4l-9.4-9.5zm114.2-6.7l-9.5 9.5c-1.9 1.9-1.9 4.9 0 6.7.9.9 2.1 1.4 3.4 1.4 1.2 0 2.4-.5 3.4-1.4l9.5-9.5c1.9-1.9 1.9-4.9 0-6.7-1.9-1.9-4.9-1.9-6.8 0zM50.7 115.7l-9.5 9.5c-1.9 1.9-1.9 4.9 0 6.7.9.9 2.1 1.4 3.4 1.4s2.4-.5 3.4-1.4l9.5-9.5c1.9-1.9 1.9-4.9 0-6.7-1.9-1.9-5-1.9-6.8 0zm102 0c-1.9-1.9-4.9-1.9-6.7 0-1.9 1.9-1.9 4.9 0 6.7l9.5 9.5c.9.9 2.1 1.4 3.4 1.4s2.4-.5 3.4-1.4c1.9-1.9 1.9-4.9 0-6.7l-9.6-9.5zM23.8 63.9h-9.5c-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8h9.5c2.6 0 4.8-2.1 4.8-4.8 0-2.6-2.2-4.8-4.8-4.8zm161.9 0h-9.5c-2.6 0-4.8 2.1-4.8 4.8 0 2.6 2.1 4.8 4.8 4.8h9.5c2.6 0 4.8-2.1 4.8-4.8 0-2.6-2.2-4.8-4.8-4.8zm-41.1 46.5c-4.4 4.4-10.4 7.7-15.3 10.4-.3.1-.5.3-.8.4v52.3c0 .2-.1.4-.1.7-1.4 14.5-13.6 25.9-28.4 25.9s-27.1-11.4-28.4-25.9c0-.2-.1-.4-.1-.7v-52.4c-5-3-10-6.4-14.4-10.7-11.7-11.7-18-27.2-17.7-43.8.2-16.5 6.8-32 18.6-43.7C69.6 11.2 85.1 4.8 101.7 4.8s32.1 6.4 43.8 18.1c11.7 11.7 18 27.2 17.7 43.8-.3 16.5-6.9 32-18.6 43.7zm-26.9 67.8H82.3c2.7 7.1 9.6 12.3 17.7 12.3s15-5.1 17.7-12.3zm-17.2-9.5L81 159.2v9.5h19.5zm18.5-9.2l-38-19.3v8.4l38.1 18.6v-7.7zm0-19.4h-17.2l17.2 8.7v-8.7zm18.9-36.4c10-10 15.6-23.1 15.8-37.1.2-14-5.1-27.1-14.9-37-9.9-9.9-23-15.3-37-15.3s-27.1 5.4-37 15.3c-10 10-15.6 23.1-15.8 37.1-.2 14 5.1 27.1 14.9 37 4.3 4.3 9.6 7.6 14.8 10.6 1.5.9 2.4 2.4 2.4 4.1v11.1l2.1 1.1h36v-12.2c0-1.7.9-3.3 2.4-4.1 1-.6 2.1-1.2 3.3-1.9 4.2-2.3 9.5-5.3 13-8.7zM78.1 36.4c-1.9-1.9-4.9-1.9-6.7 0-8.1 8.1-12.6 18.9-12.6 30.3 0 11.4 4.5 22.2 12.6 30.3.9.9 2.1 1.4 3.4 1.4s2.4-.5 3.4-1.4c1.9-1.9 1.9-4.9 0-6.7-6.3-6.3-9.8-14.7-9.8-23.6 0-8.9 3.5-17.3 9.8-23.6 1.8-1.9 1.8-4.9-.1-6.7z"></path>
        </svg>`,
        cloud: `<svg viewBox="36 54.501 128.002 90.998" xmlns="http://www.w3.org/2000/svg" height="30" width="40">
            <g>
                <path fill="#08F3D2" d="M112.861 128.094H58.998C46.317 128.094 36 117.845 36 105.247a22.693 22.693 0 0 1 6.063-15.456 22.986 22.986 0 0 1 12.142-6.889c1.693-7.52 5.78-14.356 11.686-19.467a36.716 36.716 0 0 1 24.028-8.934c3.671 0 7.296.54 10.776 1.604L97.55 66.249a26.044 26.044 0 0 0-7.631-1.134c-12.764 0-23.785 9.443-25.634 21.965-.478 3.233-3.113 5.696-6.408 5.988-6.381.568-11.194 5.804-11.194 12.18 0 6.745 5.524 12.233 12.314 12.233h53.862v10.613z" data-color="1"></path>
                <path fill="#0B174C" d="M114.841 126.323l5.435 1.263a.182.182 0 0 1 .128.116.176.176 0 0 1-.012.161l-2.913 4.681a2.445 2.445 0 0 0 .356 3.042l5.173 5.14a2.484 2.484 0 0 0 3.063.357l4.784-2.933a.187.187 0 0 1 .172-.008.177.177 0 0 1 .108.124l1.256 5.327a2.471 2.471 0 0 0 2.426 1.906l7.335-.02a2.474 2.474 0 0 0 2.409-1.894l1.305-5.425c.013-.055.053-.1.147-.139a.182.182 0 0 1 .161.012l4.693 2.869a2.49 2.49 0 0 0 3.058-.357l5.204-5.17a2.449 2.449 0 0 0 .361-3.037l-2.925-4.729c-.03-.048-.035-.106 0-.192a.181.181 0 0 1 .124-.106l5.379-1.28a2.467 2.467 0 0 0 1.907-2.391l.027-7.294a2.459 2.459 0 0 0-1.918-2.412l-5.432-1.263c-.055-.013-.101-.052-.132-.126a.18.18 0 0 1 .012-.161l2.912-4.668a2.445 2.445 0 0 0-.354-3.046l-5.182-5.148a2.486 2.486 0 0 0-3.064-.353l-4.77 2.933a.186.186 0 0 1-.171.01.177.177 0 0 1-.108-.124l-1.26-5.328a2.474 2.474 0 0 0-2.425-1.902l-7.337.02a2.478 2.478 0 0 0-2.408 1.891l-1.31 5.415a.176.176 0 0 1-.105.122l-.047.02a.182.182 0 0 1-.161-.012l-4.684-2.861a2.485 2.485 0 0 0-3.055.359l-5.205 5.17a2.446 2.446 0 0 0-.358 3.038l2.921 4.714a.174.174 0 0 1 .016.151l-.02.048a.18.18 0 0 1-.123.106l-5.38 1.277a2.462 2.462 0 0 0-1.906 2.393l-.02 7.302a2.452 2.452 0 0 0 1.913 2.412zm-.138-9.706a.718.718 0 0 1 .556-.697l5.38-1.277a1.932 1.932 0 0 0 1.343-1.146l.019-.047a1.92 1.92 0 0 0-.146-1.73l-2.922-4.714a.715.715 0 0 1 .105-.886l5.206-5.171a.724.724 0 0 1 .889-.103l4.683 2.86c.531.324 1.19.374 1.807.117a1.937 1.937 0 0 0 1.139-1.327l1.31-5.414a.723.723 0 0 1 .703-.552l7.339-.02c.338 0 .628.228.706.555l1.26 5.328a1.94 1.94 0 0 0 1.174 1.349 1.957 1.957 0 0 0 1.744-.149l4.77-2.933a.737.737 0 0 1 .894.102l5.182 5.148a.712.712 0 0 1 .103.888l-2.913 4.668a1.926 1.926 0 0 0-.134 1.771c.238.573.743.999 1.349 1.14l5.432 1.263a.718.718 0 0 1 .56.703l-.027 7.294a.72.72 0 0 1-.556.698l-5.379 1.28a1.956 1.956 0 0 0-1.356 1.176 1.916 1.916 0 0 0 .142 1.737l2.925 4.728a.715.715 0 0 1-.106.886l-5.204 5.169a.727.727 0 0 1-.893.105l-4.692-2.869a1.974 1.974 0 0 0-1.798-.122 1.934 1.934 0 0 0-1.145 1.331l-1.305 5.425a.721.721 0 0 1-.702.552l-7.337.02a.72.72 0 0 1-.705-.556l-1.256-5.328a1.937 1.937 0 0 0-1.176-1.351 1.945 1.945 0 0 0-1.742.147l-4.784 2.932a.733.733 0 0 1-.893-.103l-5.175-5.141a.712.712 0 0 1-.104-.887l2.913-4.681c.328-.526.38-1.181.156-1.711l-.02-.051a1.942 1.942 0 0 0-1.348-1.137l-5.435-1.263a.72.72 0 0 1-.56-.703l.024-7.303z" data-color="2"></path>
                <path fill="#0B174C" d="M138.461 130.323c5.658 0 10.26-4.573 10.26-10.193 0-5.62-4.603-10.193-10.26-10.193-5.658 0-10.261 4.573-10.261 10.193.001 5.62 4.604 10.193 10.261 10.193zm0-18.638c4.687 0 8.501 3.789 8.501 8.445 0 4.656-3.814 8.445-8.501 8.445-4.688 0-8.501-3.788-8.501-8.445s3.814-8.445 8.501-8.445z" data-color="2"></path>
            </g>
        </svg>`
    };
    
    return icons[iconType] || '';
}

// Render projects section
function renderProjects() {
    const section = document.querySelector('section.projects');
    if (!section) return;
    
    const projects = config.projects;
    if (!projects || !projects.items || projects.items.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    let html = `<h2>${projects.sectionTitle || 'Projects'}</h2>`;
    html += '<div class="column">';
    
    projects.items.forEach(project => {
        if (!project.title) return;
        
        const titleHtml = project.url 
            ? `<h3><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.title}</a></h3>`
            : `<h3>${project.title}</h3>`;
        
        html += `
            <div>
                ${titleHtml}
                ${project.description ? `<p>${project.description}</p>` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    section.innerHTML = html;
}

// Render education section
function renderEducation() {
    const section = document.querySelector('section.education');
    if (!section) return;
    
    const education = config.education;
    if (!education) return;
    
    let html = `<h2>${education.sectionTitle || 'Education'}</h2>`;
    
    if (education.sectionImage) {
        html += `
            <div>
                <img src="${education.sectionImage}" alt="Education">
            </div>
        `;
    }
    
    html += '<div class="row">';
    
    if (education.items && education.items.length > 0) {
        education.items.forEach(item => {
            html += `
                <div>
                    <h3>${item.title}</h3>
                    <p>${item.period}</p>
                    <p>${item.description}</p>
                </div>
            `;
        });
    }
    
    html += '</div>';
    section.innerHTML = html;
}

// Render connect section
function renderConnect() {
    const section = document.querySelector('section.connect');
    if (!section) return;
    
    const personalInfo = config.personalInfo;
    
    section.innerHTML = `
        <h2>Connect</h2>
        <p>Feel free to reach out via <a href="mailto:${personalInfo.email}">email</a> for any opportunities or collaborations.</p>
    `;
}

// Render resume download section
function renderResume() {
    const resumeSection = config.resume;
    const downloadResume = document.querySelector('.download-resume');
    
    if (!downloadResume) return;
    
    if (!resumeSection || !resumeSection.files || resumeSection.files.length === 0) {
        downloadResume.style.display = 'none';
        return;
    }
    
    let html = '';
    
    resumeSection.files.forEach(file => {
        if (file.name && file.file) {
            html += `<a href="${file.file}" download>${file.name}</a>`;
        }
    });
    
    downloadResume.innerHTML = html;
}

// Render footer
function renderFooter() {
    const footer = document.querySelector('footer.footer');
    if (!footer) return;
    
    const year = new Date().getFullYear();
    const name = config.personalInfo.name || 'Portfolio';
    
    footer.innerHTML = `<p>&copy; ${year} ${name}. All rights reserved.</p>`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadConfig);

