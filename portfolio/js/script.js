// Boot screen animation
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('boot-screen').classList.add('hidden');
    }, 2500);
});

// Navigation toggle for mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing animation
const typingText = document.getElementById('typing-text');
const commands = [
    'neofetch',
    'htop',
    'git status',
    'ls ~/.config/',
    'python main.py',
    'vim ~/.vimrc',
    'docker ps',
    'kubectl get pods',
    'systemctl status',
    'tmux new-session'
];

let currentCommand = 0;
let currentChar = 0;
let isDeleting = false;

function typeCommand() {
    const command = commands[currentCommand];
    
    if (isDeleting) {
        typingText.textContent = command.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingText.textContent = command.substring(0, currentChar + 1);
        currentChar++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentChar === command.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentCommand = (currentCommand + 1) % commands.length;
        typeSpeed = 500; // Pause before next command
    }

    setTimeout(typeCommand, typeSpeed);
}

// Start typing animation after boot screen
setTimeout(typeCommand, 3000);

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing...';
    submitBtn.disabled = true;

    setTimeout(function() {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Command Executed!';
        setTimeout(function() {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(22, 27, 34, 0.95)';
    } else {
        navbar.style.background = 'var(--bg-secondary)';
    }
});

// Add typing sound effect simulation (optional)
let audioContext;
function playTypingSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add intersection observer for animations
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

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    if (konamiCode.toString() === konami.toString()) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(function() {
            document.body.style.filter = '';
        }, 3000);
        console.log('🎉 Easter egg activated! You found the Konami code!');
    }
});

// Matrix rain effect (bonus feature)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#58a6ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Activate matrix rain on special key combination (Ctrl + Shift + M)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 77) {
        createMatrixRain();
        console.log('🔥 Matrix rain activated! Welcome to the Matrix, Arpit!');
    }
});

// Terminal cursor blinking enhancement
function enhanceCursorBlink() {
    const cursors = document.querySelectorAll('.cursor, .cursor-blink');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    });
}

// Initialize enhanced features after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceCursorBlink();
    
    // Add some console art for fun
    console.log(`
    ╔══════════════════════════════════════╗
    ║          Arpit's Portfolio           ║
    ║      Linux Developer & FOSS         ║
    ║           Enthusiast                 ║
    ║                                      ║
    ║  Welcome to the terminal experience! ║
    ║                                      ║
    ║  Try these easter eggs:              ║
    ║  • Konami Code (↑↑↓↓←→←→BA)         ║
    ║  • Ctrl+Shift+M for Matrix rain     ║
    ╚══════════════════════════════════════╝
    `);
    
    console.log('🐧 Built with love for the Linux community!');
});
