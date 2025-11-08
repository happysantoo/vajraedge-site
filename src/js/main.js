// ===== Mobile Navigation Toggle =====
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ===== Navbar Scroll Effect =====
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SDK Tabs =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            document.querySelector(`[data-panel="${targetTab}"]`).classList.add('active');
        });
    });

    // ===== Scroll Reveal Animations =====
    const revealElements = document.querySelectorAll('.feature-card, .arch-module, .step, .doc-card');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('reveal', 'active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // ===== Copy Code to Clipboard =====
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        copyBtn.title = 'Copy code';
        
        // Position button
        block.style.position = 'relative';
        copyBtn.style.cssText = `
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            padding: 0.5rem;
            cursor: pointer;
            color: #a0a0b0;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        block.appendChild(copyBtn);
        
        // Copy functionality
        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code').textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Success feedback
                copyBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style="font-size: 0.875rem;">Copied!</span>
                `;
                copyBtn.style.color = '#00ff88';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    `;
                    copyBtn.style.color = '#a0a0b0';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
        
        // Hover effect
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.15)';
            copyBtn.style.borderColor = '#00d4ff';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            copyBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });

    // ===== Animated Counter for Stats =====
    const stats = document.querySelectorAll('.stat-value');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const statsTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (statsTop < windowHeight * 0.75) {
            statsAnimated = true;
            
            stats.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                const suffix = text.replace(/[0-9]/g, '').replace('+', '');
                const duration = 2000;
                const steps = 60;
                const increment = number / steps;
                const stepDuration = duration / steps;
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + suffix + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix + (hasPlus ? '+' : '');
                    }
                }, stepDuration);
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // ===== Add Dynamic Glow Effect to Hero =====
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            hero.style.setProperty('--mouse-x', `${x}%`);
            hero.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // ===== Prevent FOUC (Flash of Unstyled Content) =====
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });

    console.log('🚀 VajraEdge website loaded successfully!');
});
