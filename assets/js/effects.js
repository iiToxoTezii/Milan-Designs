/**
 * ANTI GRAVITY EFFECTS ENGINE
 * Includes: 3D Tilt, System Clock, and Achievement System
 */

document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    
    // Disable scrolling only if splash exists
    if (document.getElementById('splash-screen')) {
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();
    }
    initPageTransitions();
    initSplashScreen();
    init3DTilt();
    initSystemClock();
    initAchievements();
    initCustomCursor();
    initUISounds();
    initTestimonials();
    initEasterEgg();
    initScrollReveal();
    initScrollProgress();
    initStatsCountUp();
    initCursorTrail();
    initDisclaimer();
    initDisclaimerGuard();
    initAchievementsModal();
    fixEncoding();
});



/* ===== ENCODING FIX (DOM Level) ===== */
function fixEncoding() {
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        node.nodeValue = node.nodeValue
            .replace(/â†’/g, "→")
            .replace(/â†/g, "←")
            .replace(/â€¢/g, "•")
            .replace(/â€”/g, "—")
            .replace(/â€™/g, "'")
            .replace(/â€œ/g, '"')
            .replace(/â€/g, '"');
    }
}

/* ===== SCROLL PROGRESS ===== */
function initScrollProgress() {
    updateScrollProgress(); // Initial call
}

function updateScrollProgress() {
    const progress = document.getElementById('scroll-progress');
    if (!progress) return;
    
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + "%";
}

/* ===== STATS COUNT UP ===== */
function initStatsCountUp() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.textContent);
                let startVal = 0;
                const duration = 2000;
                const startTime = performance.now();

                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * endVal);
                    target.textContent = current + (target.textContent.includes('+') ? '+' : '');
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                requestAnimationFrame(update);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
}

/* ===== CURSOR TRAIL ===== */
function initCursorTrail() {
    const dots = [];
    const numDots = 6;
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        document.body.appendChild(dot);
        dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrail() {
        let x = mouseX;
        let y = mouseY;

        dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * (0.2 - index * 0.02);
            dot.y += (y - dot.y) * (0.2 - index * 0.02);
            
            dot.el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${1 - index * 0.1})`;
            dot.el.style.opacity = 1 - (index / numDots);
            
            x = dot.x;
            y = dot.y;
        });
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop watching after reveal
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .project-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

/* ===== LENIS SMOOTH SCROLL ===== */
let lenis;
function initLenis() {
    if (lenis) return; // Prevent multiple initializations

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync other scroll-dependent functions with Lenis
    lenis.on('scroll', (e) => {
        updateScrollProgress();
        // Throttle achievement checks for performance
        if (Math.abs(e.velocity) > 0.5) {
            checkAchievements();
        }
    });
}

/* ===== PAGE TRANSITIONS ===== */
function initPageTransitions() {
    const overlay = document.getElementById('page-transition');
    if (!overlay) return;

    // Select links that are NOT external, NOT anchors, and NOT disclaimer triggers
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not(.project-disclaimer-trigger)');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Failsafe: if the link needs a disclaimer, let the other script handle it
            if (link.classList.contains('project-disclaimer-trigger')) return;

            const href = link.getAttribute('href');
            
            // Safety check: ensure it's a real page link
            if (href && !href.startsWith('#') && !href.includes('mailto:') && !href.includes('tel:')) {
                e.preventDefault();
                overlay.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });

    // Fade in on load
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.classList.remove('active');
        }
    });
}

/* ===== CUSTOM CURSOR ===== */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        dotX += (mouseX - dotX) * 0.4;
        dotY += (mouseY - dotY) * 0.4;
        outlineX += (mouseX - outlineX) * 0.25;
        outlineY += (mouseY - outlineY) * 0.25;

        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Refined Hover Logic (Event Delegation for dynamic elements)
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .project-card, .logo, .sound-toggle, .achievements-trigger, .achievement-item');
        if (target) {
            document.body.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest('a, button, .project-card, .logo, .sound-toggle, .achievements-trigger, .achievement-item');
        if (target) {
            document.body.classList.remove('cursor-hover');
        }
    });
}

/* ===== UI SOUNDS (Web Audio API) ===== */
let soundEnabled = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, vol) {
    if (!soundEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function initUISounds() {
    const toggle = document.getElementById('sound-toggle');
    if (!toggle) return;

    // Browser policy: Resume AudioContext on first interaction
    const resumeAudio = () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };
    window.addEventListener('click', resumeAudio, { once: true });
    window.addEventListener('touchstart', resumeAudio, { once: true });

    toggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent window click listener from firing
        resumeAudio();
        soundEnabled = !soundEnabled;
        toggle.querySelector('span').textContent = `SOUND: ${soundEnabled ? 'ON' : 'OFF'}`;
        if (soundEnabled) {
            playTone(440, 'sine', 0.1, 0.1);
        }
    });

    // Hover sounds
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => playTone(880, 'sine', 0.05, 0.05));
    });
}

/* ===== TESTIMONIALS (TYPING EFFECT) ===== */
function initTestimonials() {
    const textEl = document.getElementById('testimonial-text');
    if (!textEl) return;

    const testimonials = [
        "SOURCE: CLIENT_A >> 'Milan's vision transformed our brand into a futuristic masterpiece. Exceptional detail.'",
        "SOURCE: STUDIO_X >> 'The interactive elements are next-level. A true pioneer in digital environments.'",
        "SOURCE: TECH_CORP >> 'Fast, bold, and brilliantly cinematic. Milan delivers more than just design.'",
        "SOURCE: CREATIVE_LAB >> 'The Antigravity prompts combined with Milan's eye create pure magic.'"
    ];

    let index = 0;
    
    function typeText(text, i = 0) {
        if (i === 0) textEl.innerHTML = '> ';
        if (i < text.length) {
            textEl.innerHTML += text.charAt(i);
            setTimeout(() => typeText(text, i + 1), 30);
        } else {
            setTimeout(nextTestimonial, 3000);
        }
    }

    function nextTestimonial() {
        index = (index + 1) % testimonials.length;
        typeText(testimonials[index]);
    }

    setTimeout(() => typeText(testimonials[0]), 2000);
}

/* ===== EASTER EGG (Milan/Design) ===== */
function initEasterEgg() {
    let input = '';
    window.addEventListener('keyup', (e) => {
        input += e.key.toLowerCase();
        if (input.length > 10) input = input.slice(-10);
        
        if (input.includes('milan') || input.includes('design')) {
            triggerGlitch();
            input = '';
        }
    });

    function triggerGlitch() {
        document.body.classList.add('glitch');
        playTone(110, 'sawtooth', 0.5, 0.1);
        setTimeout(() => document.body.classList.remove('glitch'), 1000);
        
        showAchievement('SYSTEM BREACH', 'You discovered the Milan Protocol.');
        window._glitchCount = (window._glitchCount || 0) + 1;
        checkAchievements();
    }
}
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .hero-image img, .feature-card, .card, .app-card');
    
    cards.forEach(card => {
        let requestId = null;
        
        card.addEventListener('mousemove', e => {
            if (requestId) return;
            
            requestId = requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const divisor = card.classList.contains('project-card') ? 100 : 60;
                const rotateX = (y - centerY) / divisor;
                const rotateY = (centerX - x) / divisor;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
                requestId = null;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            if (requestId) cancelAnimationFrame(requestId);
            requestId = null;
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/* ===== SYSTEM CLOCK ===== */
function initSystemClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;
    
    function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${h}:${m}:${s}`;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
}

/* ===== ACHIEVEMENT SYSTEM ===== */
function initAchievements() {
    const achievements = [
        { id: 'explorer', title: 'THE EXPLORER', desc: 'You discovered the hidden projects.', trigger: () => (window.scrollY || document.documentElement.scrollTop) > 1000 },
        { id: 'communicator', title: 'FIRST CONTACT', desc: 'Ready to build something bold?', trigger: () => {
            const contactSection = document.getElementById('contact');
            if (!contactSection) return false;
            const rect = contactSection.getBoundingClientRect();
            return rect.top < window.innerHeight;
        }},
        { id: 'deepdiver', title: 'DEEP DIVER', desc: 'Spent 1 minute analyzing the grid.', trigger: () => {
            if (window._deepDiverStarted) return false;
            window._deepDiverStarted = true;
            let time = 0;
            const interval = setInterval(() => {
                time++;
                if (time >= 60) {
                    unlockAchievement('deepdiver', 'DEEP DIVER', 'Spent 1 minute analyzing the grid.');
                    clearInterval(interval);
                }
            }, 1000);
            return false; 
        }},
        { id: 'soundwave', title: 'SOUNDWAVE', desc: 'Activated the sensory experience.', trigger: () => soundEnabled },
        { id: 'nightowl', title: 'NIGHT OWL', desc: 'Working in the late hours.', trigger: () => {
            const hour = new Date().getHours();
            return hour >= 22 || hour <= 4;
        }},
        { id: 'speeddemon', title: 'SPEED DEMON', desc: 'Fastest scroll in the grid.', trigger: () => {
            if (!lenis) return false;
            return Math.abs(lenis.velocity) > 50;
        }},
        { id: 'artcollector', title: 'ART COLLECTOR', desc: 'You appreciate the finer details.', trigger: () => {
            return (window._projectsViewed || 0) >= 3;
        }},
        { id: 'glitchmaster', title: 'GLITCH MASTER', desc: 'You broke the simulation... multiple times.', trigger: () => {
            return (window._glitchCount || 0) >= 3;
        }},
        { id: 'silentobserver', title: 'SILENT OBSERVER', desc: 'Patience is a virtue in the grid.', trigger: () => {
            if (window._observerStarted) return false;
            window._observerStarted = true;
            let idleTime = 0;
            const interval = setInterval(() => {
                idleTime++;
                if (idleTime >= 30) {
                    unlockAchievement('silentobserver', 'SILENT OBSERVER', 'You analyzed the grid in silence.');
                    clearInterval(interval);
                }
            }, 1000);
            return false;
        }}
    ];

    // Track project clicks for art collector
    document.querySelectorAll('.btn-premium, .project-card').forEach(el => {
        el.addEventListener('click', () => {
            window._projectsViewed = (window._projectsViewed || 0) + 1;
            checkAchievements();
        });
    });

    window._achievements = achievements;
    checkAchievements();
    
    // Auto-trigger timers/checkers
    achievements.forEach(ach => {
        if (ach.id === 'deepdiver' || ach.id === 'nightowl') ach.trigger();
    });
}

const ACHIEVEMENT_REGISTRY = [
    { id: 'initiator', title: 'THE INITIATOR', desc: 'You accepted the mission.', icon: '🎯' },
    { id: 'explorer', title: 'THE EXPLORER', desc: 'Scanned 50% of the visual grid.', icon: '🔭' },
    { id: 'deepdiver', title: 'DEEP DIVER', desc: 'Analyzed the core for over 60 seconds.', icon: '🌊' },
    { id: 'artcollector', title: 'ART COLLECTOR', desc: 'Analyzed 3 or more visual systems.', icon: '🎨' },
    { id: 'glitchmaster', title: 'GLITCH MASTER', desc: 'Triggered the Milan Protocol 3 times.', icon: '👾' },
    { id: 'speeddemon', title: 'SPEED DEMON', desc: 'Reached terminal scroll velocity.', icon: '⚡' },
    { id: 'soundwave', title: 'SOUNDWAVE', desc: 'Activated the sensory audio system.', icon: '🔊' },
    { id: 'nightowl', title: 'NIGHT OWL', desc: 'Visualizing in the dark hours.', icon: '🦉' },
    { id: 'silentobserver', title: 'SILENT OBSERVER', desc: 'Remained focused for 30 seconds.', icon: '👁️' },
    { id: 'firstcontact', title: 'FIRST CONTACT', desc: 'Reached the communication terminal.', icon: '✉️' }
];

function unlockAchievement(id, title, desc) {
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('achievements', JSON.stringify(unlocked));
        showAchievement(title, desc);
        updateAchievementsUI();
        
        // Final Celebration check
        if (unlocked.length === ACHIEVEMENT_REGISTRY.length) {
            triggerFinalCelebration();
        }
    }
}

function initAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    const closeBtn = document.getElementById('close-achievements');
    const triggers = document.querySelectorAll('.achievements-trigger');
    
    if (triggers) {
        triggers.forEach(t => t.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            updateAchievementsUI();
        }));
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    updateAchievementsUI();
}

function updateAchievementsUI() {
    const list = document.getElementById('achievements-list');
    const progress = document.getElementById('achievement-progress');
    const countText = document.getElementById('achievement-count');
    if (!list) return;

    const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
    
    // Update Progress
    const percent = (unlocked.length / ACHIEVEMENT_REGISTRY.length) * 100;
    if (progress) progress.style.width = `${percent}%`;
    if (countText) countText.textContent = `${unlocked.length}/${ACHIEVEMENT_REGISTRY.length}`;

    // Update List
    list.innerHTML = ACHIEVEMENT_REGISTRY.map(ach => `
        <div class="achievement-item ${unlocked.includes(ach.id) ? 'unlocked' : ''}">
            <div class="ach-icon-circle">${ach.icon}</div>
            <div class="ach-info">
                <h5>${ach.title}</h5>
                <p>${ach.desc}</p>
            </div>
        </div>
    `).join('');
}

function triggerFinalCelebration() {
    const popup = document.getElementById('congrats-popup');
    if (!popup) return;
    
    setTimeout(() => {
        popup.classList.add('active');
        playTone(440, 'sine', 0.5, 0.5);
        setTimeout(() => playTone(660, 'sine', 0.5, 0.5), 200);
        setTimeout(() => playTone(880, 'sine', 0.5, 0.5), 400);
    }, 1000);

    // Close on click
    popup.addEventListener('click', () => popup.classList.remove('active'));
}

function checkAchievements() {
    if (!window._achievements) return;
    const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');

    window._achievements.forEach(ach => {
        if (!unlocked.includes(ach.id) && ach.trigger()) {
            unlockAchievement(ach.id, ach.title, ach.desc);
        }
    });
}

function showAchievement(title, desc) {
    const popup = document.getElementById('achievement-popup');
    const titleEl = document.getElementById('achievement-title');
    const descEl = document.getElementById('achievement-desc');
    
    if (!popup || !titleEl || !descEl) return;
    
    titleEl.textContent = title;
    descEl.textContent = desc;
    
    popup.classList.add('active');
    playTone(1200, 'sine', 0.1, 0.1); // Achievement sound
    
    setTimeout(() => {
        popup.classList.remove('active');
    }, 5000);
}

/* ===== DISCLAIMER LOGIC ===== */
function initDisclaimer() {
    const btn = document.getElementById('projectModalProceed');
    const cancelBtn = document.getElementById('projectModalCancel');
    
    // Check if we should auto-open (from guard redirect)
    const urlParams = new URLSearchParams(window.search || window.location.search);
    if (urlParams.get('showDisclaimer') === 'true' && typeof openProjectModal === 'function') {
        setTimeout(() => openProjectModal('projects.html'), 1000);
    }

    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const href = btn.getAttribute('href') || 'projects.html';
            const overlay = document.getElementById('page-transition');
            
            localStorage.setItem('disclaimerAccepted', 'true');
            if (overlay) overlay.classList.add('active');
            unlockAchievement('initiator', 'THE INITIATOR', 'You accepted the mission.');
            
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            localStorage.removeItem('disclaimerAccepted');
            if (window.location.pathname.includes('projects.html') || window.location.pathname.includes('project')) {
                window.location.href = 'index.html';
            }
        });
    }
}

function initDisclaimerGuard() {
    const path = window.location.pathname;
    const isProtected = path.includes('projects.html') || path.includes('project') || path.includes('moonmist.html');
    const accepted = localStorage.getItem('disclaimerAccepted') === 'true';

    if (isProtected && !accepted) {
        window.location.href = 'index.html?showDisclaimer=true';
    }
}

/* ===== SPLASH SCREEN LOGIC ===== */
function initSplashScreen() {
    const splash = document.getElementById('splash-screen');
    const loaderBar = document.getElementById('loader-bar');
    const factText = document.getElementById('fact-text');
    
    if (!splash || !loaderBar || !factText) return;

    const facts = [
        "Design is thinking made visual.",
        "The first version of Photoshop was created in 1988.",
        "Futurism focuses on speed, technology, and youth.",
        "Blue is the most popular color for brands worldwide.",
        "Helvetica was originally named Neue Haas Grotesk.",
        "Good design is obvious. Great design is transparent.",
        "The golden ratio (1.618) is found in nature and art.",
        "Typography is the craft of endowing language with form.",
        "RGB is for screens (light), CMYK is for print (ink).",
        "The human eye can distinguish 10 million colors.",
        "Pac-Man was inspired by a pizza with a slice missing.",
        "The Konami Code: Up, Up, Down, Down, L, R, L, R, B, A.",
        "The first website went live on August 6, 1991.",
        "Mario was originally a carpenter named Jumpman.",
        "Nike's 'Swoosh' logo was designed for just $35.",
        "A 'tittle' is the dot over the letters 'i' and 'j'.",
        "Red stimulates appetite, which is why food brands love it.",
        "The first video game, 'Tennis for Two', debuted in 1958.",
        "Pantone's Color of the Year sets global design trends.",
        "Leading is the space between lines of text.",
        "Kerning is the space between individual characters.",
        "Serif fonts have 'feet', sans-serif fonts do not.",
        "The PlayStation started as a Nintendo project.",
        "Minecraft was originally called 'Cave Game'.",
        "The first computer mouse was made of wood.",
        "Apple's first logo featured Isaac Newton.",
        "The average person sees 10,000 ads per day.",
        "Colors can impact heart rate and blood pressure.",
        "Garamond is one of the most eco-friendly fonts.",
        "The dot on the 'i' is officially called a tittle.",
        "The first color photograph was taken in 1861.",
        "CMYK: Cyan, Magenta, Yellow, Key (Black).",
        "Additive color (RGB) starts with black and adds light.",
        "Subtractive color (CMYK) starts with white and adds ink.",
        "The 'Save' icon is a 3.5-inch floppy disk.",
        "The first smartphone was the IBM Simon (1992).",
        "QWERTY was designed to slow down typists.",
        "The world's first game console was the Magnavox Odyssey.",
        "Tetris was the first game played in outer space.",
        "The cloud symbol represents a server in another location.",
        "Skeuomorphism mimics real-world textures in UI.",
        "Flat design focuses on minimalism and usability.",
        "Material Design was developed by Google in 2014.",
        "Glassmorphism uses blur and transparency for depth.",
        "Neumorphism uses shadows to mimic extruded plastic.",
        "The hex code for 'Anti Gravity' blue is #7cecff.",
        "Contrast is the key to readability and accessibility.",
        "Hierarchy guides the user's eye to the most important info.",
        "Proximity suggests a relationship between elements.",
        "Repetition creates consistency and brand recognition.",
        "Alignment organizes elements into a cohesive structure.",
        "Balance can be symmetrical or asymmetrical.",
        "A logo is a brand's 'handshake' with the world.",
        "Vectors are mathematical, so they never lose quality.",
        "Rasters are made of pixels and can become blurry.",
        "DPI stands for Dots Per Inch (for printing).",
        "PPI stands for Pixels Per Inch (for screens).",
        "The first banner ad had a 44% click-through rate.",
        "UX is how it works; UI is how it looks.",
        "Wireframes are the skeletons of a design.",
        "Prototyping brings a static design to life.",
        "Responsive design adapts to any screen size.",
        "Accessibility ensures everyone can use your design.",
        "Dark mode reduces eye strain and saves battery.",
        "Micro-interactions provide feedback to the user.",
        "Infinite scroll keeps users engaged longer.",
        "The 'Burger Menu' was designed in the 1980s.",
        "A favicon is the small icon in your browser tab.",
        "CSS: Cascading Style Sheets, the 'paint' of the web.",
        "HTML: HyperText Markup Language, the 'bones'.",
        "JavaScript: The 'muscle' that provides interactivity.",
        "The Golden Ratio is also known as the Divine Proportion.",
        "Futura was the first font used on the Moon.",
        "Comic Sans was designed for a dog character.",
        "The first emojis were created in Japan in 1999.",
        "Bluetooth is named after a 10th-century Viking king.",
        "A 'pixel' is short for 'picture element'.",
        "The first webcam was used to monitor a coffee pot.",
        "The average website lifespan is about 2 years.",
        "There are over 1.9 billion websites online today.",
        "Google processes over 8.5 billion searches a day.",
        "The term 'bug' came from a real moth in a computer.",
        "The first hard drive held only 5MB of data.",
        "Domain names were free until 1995.",
        "The first domain ever registered was symbolics.com.",
        "YouTube was originally a dating site.",
        "Amazon started as an online bookstore.",
        "Facebook was originally 'TheFacebook'.",
        "Twitter's bird logo is named Larry.",
        "Instagram's first photo was a dog and a foot.",
        "Snapchat was originally called 'Picaboo'.",
        "Pinterest was originally 'Tote'.",
        "Airbnb started with three air mattresses.",
        "Uber was originally 'UberCab'.",
        "Slack was a tool for an internal game studio.",
        "Figma was the first browser-based design tool.",
        "Adobe was named after a creek behind the founder's house.",
        "Silicon Valley was named after the material in chips.",
        "Moore's Law: Computing power doubles every two years.",
        "The first email was sent by Ray Tomlinson in 1971."
    ];

    // Show random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factText.textContent = randomFact;
    setTimeout(() => factText.classList.add('visible'), 100);

    // Simulated loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loaderBar.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                splash.classList.add('hidden');
                document.body.style.overflow = ''; // Re-enable scroll
                if (lenis) lenis.start();
            }, 800);
        }
    }, 200);
}
