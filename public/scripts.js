// Betty Pride Website Scripts
// Consolidated JavaScript for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    function toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn) {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                mobileMenu.setAttribute('aria-hidden', 'false');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        }
    }

    // Attach mobile menu toggle to button
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const menuButton = event.target.closest('#mobile-menu-btn');

        if (mobileMenu && mobileMenuBtn && !menuButton && !mobileMenu.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    });

    // Form validation for contact forms (both index.html and contact.html)
    const contactForm = document.getElementById('9243:66767');
    const contactFormElement = document.getElementById('contact-form-element');

    if (contactForm) {
        contactForm.addEventListener('click', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('9243:66756');
            const emailInput = document.getElementById('9243:66758');
            const messageInput = document.getElementById('9243:66760');
            const checkbox = document.getElementById('9243:66765');

            let isValid = true;

            if (nameInput && !nameInput.value.trim()) {
                nameInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (nameInput) {
                nameInput.style.borderColor = '#00040826';
            }

            if (emailInput && (!emailInput.value.trim() || !emailInput.value.includes('@'))) {
                emailInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (emailInput) {
                emailInput.style.borderColor = '#00040826';
            }

            if (messageInput && !messageInput.value.trim()) {
                messageInput.style.borderColor = '#ef4444';
                isValid = false;
            } else if (messageInput) {
                messageInput.style.borderColor = '#00040826';
            }

            if (checkbox && !checkbox.checked) {
                checkbox.style.outline = '2px solid #ef4444';
                isValid = false;
            } else if (checkbox) {
                checkbox.style.outline = 'none';
            }

            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                // Reset form
                if (nameInput) nameInput.value = '';
                if (emailInput) emailInput.value = '';
                if (messageInput) messageInput.value = '';
                if (checkbox) checkbox.checked = false;
            }
        });
    }

    // Form validation for contact page form
    if (contactFormElement) {
        const errorMessages = document.querySelectorAll('.error-message');

        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();

            // Reset error messages
            errorMessages.forEach(error => error.classList.add('hidden'));

            let isValid = true;

            // Validate required fields
            const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
            requiredFields.forEach(fieldName => {
                const field = document.getElementById(fieldName);
                const errorElement = document.getElementById(fieldName + '-error');

                if (field && !field.value.trim()) {
                    if (errorElement) errorElement.classList.remove('hidden');
                    isValid = false;
                }
            });

            // Email validation
            const emailField = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailField && emailField.value.trim() && !emailRegex.test(emailField.value)) {
                if (emailError) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.classList.remove('hidden');
                }
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactFormElement.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.textContent : '';

                if (submitBtn) {
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                }

                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    contactFormElement.reset();
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }, 2000);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations for cards (services page)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // FAQ Toggle Functionality (contact page)
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            const arrow = this.querySelector('svg');

            // Close all other FAQ items
            document.querySelectorAll('.faq-toggle').forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherId = otherToggle.getAttribute('data-target');
                    const otherContent = document.getElementById(otherId);
                    const otherArrow = otherToggle.querySelector('svg');

                    if (otherContent) otherContent.classList.add('hidden');
                    if (otherArrow) otherArrow.classList.remove('rotate-180');
                }
            });

            // Toggle current FAQ item
            if (targetContent) targetContent.classList.toggle('hidden');
            if (arrow) arrow.classList.toggle('rotate-180');
        });
    });

    // Form field focus animations (contact page)
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});