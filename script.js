// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all components
    initializeHeader();
    initializeHero();
    initializeAnimations();
    initializeProcess();
    initializePortfolio();
    initializePricing();
    initializeFAQ();
    initializeContact();
    initializeCounters();
    initializeScrollToTop();
});

// Header functionality
function initializeHeader() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Check if targetId is valid (not just '#' or empty)
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section functionality
function initializeHero() {
    const interactiveGlow = document.getElementById('interactiveGlow');
    
    // Mouse tracking for interactive glow
    document.addEventListener('mousemove', (e) => {
        if (interactiveGlow) {
            const x = e.clientX - 192; // Half of glow width (24rem = 384px)
            const y = e.clientY - 192; // Half of glow height
            
            interactiveGlow.style.left = `${x}px`;
            interactiveGlow.style.top = `${y}px`;
        }
    });
    
    // Create floating particles
    createFloatingParticles();
}

// Create floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(6, 182, 212, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `particleFloat ${2 + Math.random() * 3}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// Process section functionality
function initializeProcess() {
    const processSteps = document.querySelectorAll('.process-step');
    const processDetails = document.querySelectorAll('.process-detail');
    
    // Auto-cycle through steps
    let currentStep = 0;
    const stepInterval = setInterval(() => {
        // Remove active class from all steps and details
        processSteps.forEach(step => step.classList.remove('active'));
        processDetails.forEach(detail => detail.classList.remove('active'));
        
        // Add active class to current step and detail
        if (processSteps[currentStep]) {
            processSteps[currentStep].classList.add('active');
        }
        if (processDetails[currentStep]) {
            processDetails[currentStep].classList.add('active');
        }
        
        currentStep = (currentStep + 1) % processSteps.length;
    }, 3000);
    
    // Manual step selection
    processSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            clearInterval(stepInterval);
            
            // Remove active class from all
            processSteps.forEach(s => s.classList.remove('active'));
            processDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to selected
            step.classList.add('active');
            if (processDetails[index]) {
                processDetails[index].classList.add('active');
            }
            
            currentStep = index;
        });
    });
}

// Portfolio section functionality
function initializePortfolio() {
    const portfolioNavItems = document.querySelectorAll('.portfolio-nav-item');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    
    portfolioNavItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items and details
            portfolioNavItems.forEach(nav => nav.classList.remove('active'));
            portfolioDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active class to clicked item and corresponding detail
            item.classList.add('active');
            if (portfolioDetails[index]) {
                portfolioDetails[index].classList.add('active');
            }
        });
    });
}

// Pricing section functionality
function initializePricing() {
    const billingToggle = document.querySelectorAll('.toggle-btn');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const yearlyNotes = document.querySelectorAll('.yearly-note');
    
    billingToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            const billingType = btn.dataset.billing;
            
            // Update toggle buttons
            billingToggle.forEach(toggle => toggle.classList.remove('active'));
            btn.classList.add('active');
            
            // Update prices
            priceAmounts.forEach(price => {
                const monthlyPrice = price.dataset.monthly;
                const yearlyPrice = price.dataset.yearly;
                
                if (billingType === 'yearly') {
                    price.textContent = `$${yearlyPrice}`;
                } else {
                    price.textContent = `$${monthlyPrice}`;
                }
            });
            
            // Show/hide yearly notes
            yearlyNotes.forEach(note => {
                if (billingType === 'yearly') {
                    note.classList.add('show');
                } else {
                    note.classList.remove('show');
                }
            });
        });
    });
}

// FAQ section functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Contact form functionality
function initializeContact() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit');
            const formData = new FormData(contactForm);
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.style.display = 'block';
                    formSuccess.classList.remove('show');
                    contactForm.reset();
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Utility functions
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

// Performance optimizations
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimations);