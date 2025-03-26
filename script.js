// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Setup animated background elements
function setupDataVisualization() {
    const header = document.querySelector('.site-header');
    const particles = document.querySelectorAll('.particle');
    const dataPoints = document.querySelectorAll('.data-point');
    const chartBars = document.querySelectorAll('.chart-bar');
    const pieChart = document.querySelector('.pie-chart');
    const dashboardBars = document.querySelectorAll('.dashboard-bar');
    
    // Animate dashboard bar chart
    function animateDashboardBars() {
        dashboardBars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 60) + 20; // Random height between 20-80%
            bar.style.height = `${randomHeight}%`;
        });
    }
    
    // Initialize and set interval for dashboard bars
    if (dashboardBars.length > 0) {
        animateDashboardBars();
        setInterval(animateDashboardBars, 4000);
    }
    
    // Randomly change bar heights for chart animation
    function animateChartBars() {
        chartBars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 100) + 60; // Random height between 60-160px
            bar.style.height = `${randomHeight}px`;
        });
    }
    
    // Initial animation and then set interval
    animateChartBars();
    setInterval(animateChartBars, 3000);
    
    // Add trend line animation
    const trendLine = document.querySelector('.trend-line');
    if (trendLine) {
        setInterval(() => {
            const randomRotation = Math.floor(Math.random() * 20) - 10; // Between -10 and 10 degrees
            trendLine.style.transform = `rotate(${randomRotation}deg)`;
        }, 4000);
    }
    
    // Add dashboard metric animation
    function animateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value');
        
        metricValues.forEach(metric => {
            // Get the current text content
            const originalValue = metric.getAttribute('data-original') || metric.textContent;
            
            // Store original value if not already stored
            if (!metric.getAttribute('data-original')) {
                metric.setAttribute('data-original', originalValue);
            }
            
            // Generate small random fluctuation
            let newValue = originalValue;
            
            if (originalValue.includes('%')) {
                // For percentage values
                const percentValue = parseFloat(originalValue);
                const fluctuation = (Math.random() * 2 - 1) * 3; // -1 to +1, multiplied by 3
                const newPercent = Math.round(percentValue + fluctuation);
                newValue = `${newPercent}%`;
            } else if (originalValue.includes('$')) {
                // For dollar values
                const numValue = parseFloat(originalValue.replace('$', '').replace('M', ''));
                const fluctuation = (Math.random() * 0.4 - 0.2).toFixed(1); // -0.2 to +0.2, 1 decimal place
                const newNum = (numValue + parseFloat(fluctuation)).toFixed(1);
                newValue = `$${newNum}M`;
            } else if (originalValue.includes('+')) {
                // For growth values
                const growthValue = parseFloat(originalValue.replace('+', '').replace('%', ''));
                const fluctuation = (Math.random() * 2 - 1) * 2; // -1 to +1, multiplied by 2
                const newGrowth = Math.round(growthValue + fluctuation);
                newValue = `+${newGrowth}%`;
            }
            
            // Apply new value with animation
            metric.style.transform = 'translateY(-5px)';
            metric.style.opacity = '0.5';
            
            setTimeout(() => {
                metric.textContent = newValue;
                metric.style.transform = 'translateY(0)';
                metric.style.opacity = '1';
            }, 300);
        });
    }
    
    // Set interval for metric animation
    setInterval(animateMetrics, 5000);
    
    // Connect data points with lines when mouse is nearby
    function connectDataPoints() {
        // Remove any existing connection lines
        const existingLines = document.querySelectorAll('.data-connection');
        existingLines.forEach(line => line.remove());
        
        // Create new lines between nearby points
        for (let i = 0; i < dataPoints.length; i++) {
            for (let j = i + 1; j < dataPoints.length; j++) {
                const point1 = dataPoints[i].getBoundingClientRect();
                const point2 = dataPoints[j].getBoundingClientRect();
                
                // Calculate distance between points
                const x1 = point1.left + point1.width / 2;
                const y1 = point1.top + point1.height / 2;
                const x2 = point2.left + point2.width / 2;
                const y2 = point2.top + point2.height / 2;
                
                const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                
                // Only connect points that are nearby
                if (distance < 150) {
                    const dataVisual = document.querySelector('.data-visual');
                    const line = document.createElement('div');
                    line.className = 'data-connection';
                    
                    // Calculate line position and rotation
                    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    // Set line style
                    line.style.position = 'absolute';
                    line.style.width = `${length}px`;
                    line.style.height = '1px';
                    line.style.backgroundColor = 'rgba(0, 195, 255, 0.4)';
                    line.style.transformOrigin = '0 0';
                    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
                    line.style.zIndex = '3';
                    
                    dataVisual.appendChild(line);
                }
            }
        }
    }
    
    // Update data point connections periodically
    setInterval(connectDataPoints, 2000);
    
    // Add dashboard parallax effect
    const dashboard = document.querySelector('.dashboard-frame');
    if (dashboard) {
        header.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;
            
            dashboard.style.transform = `perspective(1000px) rotateY(${-moveX}deg) rotateX(${moveY}deg) translateZ(0)`;
        });
    }
    
    // Mouse interaction with particles and data elements
    header.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Interact with particles
        particles.forEach((particle, index) => {
            // Calculate distance from mouse to each particle
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left + particleRect.width / 2;
            const particleY = particleRect.top + particleRect.height / 2;
            
            const distanceX = mouseX - particleX;
            const distanceY = mouseY - particleY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Only affect particles within a certain range
            if (distance < 150) {
                const strength = (150 - distance) / 150;
                const moveX = distanceX * strength * 0.2;
                const moveY = distanceY * strength * 0.2;
                
                // Apply subtle movement to particles
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                particle.style.transform = 'translate(0, 0)';
            }
        });
        
        // Interact with data points
        dataPoints.forEach((point, index) => {
            const pointRect = point.getBoundingClientRect();
            const pointX = pointRect.left + pointRect.width / 2;
            const pointY = pointRect.top + pointRect.height / 2;
            
            const distanceX = mouseX - pointX;
            const distanceY = mouseY - pointY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Highlight data points when mouse is near
            if (distance < 100) {
                point.style.transform = 'scale(1.8)';
                point.style.backgroundColor = 'var(--primary-color)';
                point.style.boxShadow = '0 0 10px var(--primary-color)';
            } else {
                point.style.transform = 'scale(1)';
                point.style.backgroundColor = 'var(--accent-color)';
                point.style.boxShadow = 'none';
            }
        });
        
        // Interact with pie chart on hover
        if (pieChart) {
            const pieRect = pieChart.getBoundingClientRect();
            const pieX = pieRect.left + pieRect.width / 2;
            const pieY = pieRect.top + pieRect.height / 2;
            
            const distanceToPie = Math.sqrt((mouseX - pieX) ** 2 + (mouseY - pieY) ** 2);
            
            if (distanceToPie < 100) {
                pieChart.style.transform = 'scale(1.1) rotate(20deg)';
                pieChart.style.opacity = '0.8';
            } else {
                pieChart.style.transform = 'scale(1) rotate(0)';
                pieChart.style.opacity = '0.5';
            }
        }
    });
    
    // Reset positions when mouse leaves header
    header.addEventListener('mouseleave', () => {
        particles.forEach(particle => {
            particle.style.transform = 'translate(0, 0)';
        });
        
        dataPoints.forEach(point => {
            point.style.transform = 'scale(1)';
            point.style.backgroundColor = 'var(--accent-color)';
            point.style.boxShadow = 'none';
        });
        
        if (pieChart) {
            pieChart.style.transform = 'scale(1) rotate(0)';
            pieChart.style.opacity = '0.5';
        }
        
        if (dashboard) {
            dashboard.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg)';
        }
    });
}

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    document.body.classList.toggle('no-scroll'); // Prevent background scrolling when menu is open
    
    // Animate Links with staggered delay
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.burger')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        document.body.classList.remove('no-scroll');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
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
    const scrollProgress = document.querySelector('.scroll-progress');
    const navButtons = document.querySelector('.nav-buttons');
    const scrollY = window.scrollY;
    
    // Add or remove scrolled class
    if (scrollY > 100) {
        nav.classList.add('nav-scrolled');
        
        // Add slide-in animation to social buttons when navbar is scrolled
        if (navButtons && !navButtons.classList.contains('visible')) {
            navButtons.classList.add('visible');
        }
    } else {
        nav.classList.remove('nav-scrolled');
    }
    
    // Update scroll progress indicator
    if (scrollProgress) {
        const scrollPercent = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    // Highlight current section in navigation
    highlightNavOnScroll();
});

// Function to highlight active nav item based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150; // Offset to trigger slightly before reaching section
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === currentSection) {
            item.classList.add('active');
        }
    });
}

// Create scroll progress indicator
function createScrollProgress() {
    const body = document.querySelector('body');
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    body.appendChild(progressBar);
}

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
        showAlert('Your message has been sent successfully! I\'ll get back to you soon.', 'success');
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
        alertDiv.classList.add('fade-out');
        
        setTimeout(() => {
            alertDiv.remove();
        }, 500);
    }, 3000);
}

// Add animation class when elements come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .about-image, .about-text, .section-title, .contact-form, .contact-info');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Add typing effect to hero text
function typeEffect() {
    const heroText = document.querySelector('.hero p');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40);
    }
}

// Call the function on scroll
window.addEventListener('scroll', animateOnScroll);

// Call once on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    createScrollProgress();
    setupDataVisualization();
    
    // Highlight initial section based on URL hash or default to about
    const currentHash = window.location.hash || '#about';
    const currentNavItem = document.querySelector(`.nav-links a[href="${currentHash}"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('active');
    }
    
    // Run initial highlighting
    highlightNavOnScroll();
    
    // Add typing effect to hero text with a delay
    setTimeout(typeEffect, 1000);
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
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 8px;
        text-align: center;
        transition: opacity 0.5s ease;
    }
    
    .form-alert.success {
        background-color: #d4edda;
        color: #155724;
        border-left: 4px solid #28a745;
    }
    
    .form-alert.error {
        background-color: #f8d7da;
        color: #721c24;
        border-left: 4px solid #dc3545;
    }
    
    .form-alert.fade-out {
        opacity: 0;
    }
    
    .skill-category, .project-card, .about-image, .about-text, .section-title, .contact-form, .contact-info {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .skill-category.animate, .project-card.animate, .about-image.animate, .about-text.animate, .section-title.animate, .contact-form.animate, .contact-info.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links a.active {
        color: var(--accent-color);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .nav-scrolled {
        background-color: rgba(0, 0, 0, 0.95) !important;
        padding: 15px 0 !important;
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--primary-color);
        width: 0%;
        z-index: 1001;
        transition: width 0.3s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-20px);}
        60% {transform: translateY(-10px);}
    }
`;

document.head.appendChild(style);