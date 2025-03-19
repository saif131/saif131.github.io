// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        nav.style.boxShadow = 'none';
    }
});

// Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Simple validation
        if (name === '' || email === '' || message === '') {
            showAlert('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }
        
        // If validation passes, you would normally send the form data to a server
        // For this demo, we'll just show a success message
        showAlert('Your message has been sent successfully!', 'success');
        contactForm.reset();
    });
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show alerts
function showAlert(message, type) {
    // Check if an alert already exists and remove it
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `form-alert ${type}`;
    alertDiv.textContent = message;
    
    // Insert alert before the form
    contactForm.insertAdjacentElement('beforebegin', alertDiv);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Add animation class when elements come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .about-image, .about-text');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Call the function on scroll
window.addEventListener('scroll', animateOnScroll);

// Call once on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add toggle animation class to burger
    burger.classList.add('burger-animation');
    
    // Add animation class to the logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('logo-animation');
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .toggle .line2 {
        opacity: 0;
    }
    
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .form-alert {
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 5px;
        text-align: center;
    }
    
    .form-alert.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-alert.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .skill-category, .project-card, .about-image, .about-text {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .skill-category.animate, .project-card.animate, .about-image.animate, .about-text.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .burger-animation {
        animation: burgerAppear 0.5s ease forwards;
    }
    
    .logo-animation {
        animation: logoSpin 1s ease forwards;
    }
    
    @keyframes burgerAppear {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes logoSpin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

document.head.appendChild(style);