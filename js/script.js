// ===================================
// Countdown Timer
// ===================================
function startCountdown() {
    // Set target date (adjust this to your desired date)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 10); // 10 days from now
    targetDate.setHours(0, 0, 0, 0);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Countdown finished
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // Add pulse animation on update
        secondsElement.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            secondsElement.style.animation = '';
        }, 500);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===================================
// Progress Bar Animation
// ===================================
function animateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.querySelector('.progress-percentage');
    let progress = 0;
    const targetProgress = 65; // Set desired progress percentage
    const duration = 2000; // Animation duration in ms
    const increment = targetProgress / (duration / 16); // 60fps

    function updateProgress() {
        if (progress < targetProgress) {
            progress += increment;
            if (progress > targetProgress) progress = targetProgress;
            
            progressFill.style.width = progress + '%';
            progressPercentage.textContent = Math.round(progress) + '%';
            
            requestAnimationFrame(updateProgress);
        }
    }

    // Start animation after page load
    setTimeout(updateProgress, 500);
}

// ===================================
// Email Notification Form
// ===================================
function setupNotifyForm() {
    const form = document.getElementById('notifyForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission (replace with actual AJAX call)
        showMessage('Processing...', 'info');
        
        setTimeout(() => {
            // Success message
            showMessage('Thank you! We\'ll notify you when we\'re back online.', 'success');
            emailInput.value = '';
            
            // Optional: Send to server
            // sendEmailToServer(email);
        }, 1500);
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message show ' + type;
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        }
    }
}

// ===================================
// Particles Background
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
}

// ===================================
// Cursor Glow Effect
// ===================================
function setupCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '0.6';
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// ===================================
// Smooth Scroll
// ===================================
function setupSmoothScroll() {
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
}

// ===================================
// Random Motivational Messages
// ===================================
function showRandomMessage() {
    const messages = [
        "Great things take time! 🚀",
        "We're making it better for you! 💪",
        "Worth the wait! ⭐",
        "Upgrading for excellence! 🎯",
        "Coming back stronger! 💎"
    ];

    const messageElement = document.querySelector('.emphasis');
    if (messageElement) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageElement.textContent = messages[randomIndex];
    }
}

// ===================================
// Social Link Hover Effects
// ===================================
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1) rotate(360deg)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// ===================================
// Page Load Animation
// ===================================
function pageLoadAnimation() {
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 1s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    pageLoadAnimation();
    startCountdown();
    animateProgress();
    setupNotifyForm();
    createParticles();
    setupCursorGlow();
    setupSmoothScroll();
    showRandomMessage();
    setupSocialLinks();
    
    // Console message
    console.log('%c🚧 Under Maintenance 🚧', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cWe\'ll be back soon with exciting updates!', 'font-size: 14px; color: #a0a0a0;');
});

// ===================================
// Easter Egg - Konami Code
// ===================================
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Change background colors
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add CSS for rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show message
        alert('🎉 You found the secret! Enjoy the rainbow! 🌈');
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
})();
