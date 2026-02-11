// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Scroll Animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for multiple elements
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = parent.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
                    siblings.forEach((sibling, index) => {
                        if (sibling !== entry.target && sibling.classList.contains('fade-in')) {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Form enhancements
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add floating label effect
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Form submission feedback
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (in case mailto doesn't work immediately)
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(5, 5, 16, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.webkitBackdropFilter = 'blur(20px)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = '';
            header.style.webkitBackdropFilter = '';
        }
        
        lastScroll = currentScroll;
    });
}

// Add hover effects to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    handleScrollAnimations();
    initSmoothScrolling();
    enhanceForms();
    initHeaderScroll();
    initCardEffects();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Add parallax effect to hero sections
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(hero => {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-content');
            if (parallax) {
                const speed = 0.5;
                parallax.style.transform = `translateY(${scrolled * speed}px)`;
            }
        }, 10));
    });
    
    // Add typing effect to hero titles
    const heroTitles = document.querySelectorAll('.hero h1');
    heroTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid var(--secondary-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                title.style.borderRight = 'none';
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    });
});

// Add CSS for additional effects
const additionalStyles = `
    .focused label {
        color: var(--secondary-color);
        transform: translateY(-25px) scale(0.85);
    }
    
    .form-group {
        position: relative;
    }
    
    .form-group label {
        transition: all 0.3s ease;
        position: absolute;
        top: 1rem;
        left: 1rem;
        pointer-events: none;
        background: var(--bg-medium);
        padding: 0 0.5rem;
        border-radius: 4px;
    }
    
    .form-group.focused label,
    .form-group input:not(:placeholder-shown) ~ label,
    .form-group textarea:not(:placeholder-shown) ~ label,
    .form-group select:valid ~ label {
        transform: translateY(-25px) scale(0.85);
        color: var(--secondary-color);
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .glass-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(56, 189, 248, 0.1) 0%,
            transparent 50%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        border-radius: inherit;
    }
    
    .glass-card:hover::before {
        opacity: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('An error occurred:', e.message);
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below lines if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}

// Analytics placeholder (replace with your analytics code)
function initAnalytics() {
    // Add your analytics initialization code here
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
}

// Initialize analytics
initAnalytics();
