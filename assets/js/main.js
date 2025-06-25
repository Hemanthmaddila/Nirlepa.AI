// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTechnologyTabs();
    initContactForm();
    initScrollEffects();
    initTimelineAnimation();
});

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll position tracking for navbar styling
    function updateScrollPosition() {
        const scrollY = window.scrollY;
        document.documentElement.dataset.scroll = scrollY;
    }

    // Initialize scroll tracking
    window.addEventListener('scroll', debounce(updateScrollPosition, 10), { passive: true });
    updateScrollPosition(); // Set initial position

    // Active navigation highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// Technology Tabs Functionality
function initTechnologyTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Trigger AOS animation for the newly shown content
                AOS.refresh();
            }
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (!validateForm(formObject)) {
            return;
        }
        
        // Submit form
        await submitContactForm(formObject, this);
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

// Form Validation
function validateForm(data) {
    let isValid = true;
    const form = document.querySelector('.contact-form');
    
    // Clear previous errors
    form.querySelectorAll('.field-error').forEach(error => error.remove());
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '#e8f5e8';
    });
    
    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter your full name');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.company || data.company.trim().length < 2) {
        showFieldError('company', 'Please enter your organization name');
        isValid = false;
    }
    
    if (!data.interest) {
        showFieldError('interest', 'Please select your area of interest');
        isValid = false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please provide more details about your interest');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (field.name) {
        case 'name':
            if (!value || value.length < 2) {
                errorMessage = 'Please enter your full name';
                isValid = false;
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        case 'company':
            if (!value || value.length < 2) {
                errorMessage = 'Please enter your organization name';
                isValid = false;
            }
            break;
        case 'interest':
            if (!value) {
                errorMessage = 'Please select your area of interest';
                isValid = false;
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                errorMessage = 'Please provide more details';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field.name, errorMessage);
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.style.borderColor = '#ff6b6b';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 14px;
        margin-top: 5px;
        animation: slideDown 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '#e8f5e8';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Submit Contact Form
async function submitContactForm(data, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    try {
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate API call (replace with your actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Thank you for your interest! We\'ll be in touch soon to discuss how we can work together.', 'success');
        form.reset();
        
        // Track successful submission (if analytics is set up)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                event_category: 'Contact',
                event_label: data.interest
            });
        }
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at partnership@nir-lepa.com', 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    const bgColor = type === 'success' ? '#4a7c59' : type === 'error' ? '#ff6b6b' : '#2d5a27';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 450px;
        animation: slideInRight 0.4s ease;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            .notification-icon {
                font-weight: bold;
                font-size: 16px;
                margin-top: 1px;
            }
            .notification-message {
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                margin-left: 8px;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 8000);
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Utility Functions
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

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize on load
window.addEventListener('load', function() {
    initLazyLoading();
    
    // Add any additional initialization here
    console.log('Nirlepa website loaded successfully');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Export functions for potential use in other scripts
window.NirlepaApp = {
    showNotification,
    validateForm,
    debounce
}; 