// GSAP Animaciones
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from(".hero-text h1", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3
    });

    gsap.from(".hero-text p", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.6
    });

    gsap.from(".hero-buttons", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.9
    });

    gsap.from(".hero-cake", {
        duration: 1.5,
        scale: 0.5,
        rotation: -180,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
    });

    // Product cards animation
    gsap.utils.toArray(".product-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1
        });
    });

    // Features animation
    gsap.utils.toArray(".feature-item").forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            delay: index * 0.15
        });
    });
}

// Modal functions
function openModal(title, emoji, description) {
    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalImage').textContent = emoji;
    document.getElementById('modalDescription').textContent = description;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function orderProduct() {
    closeModal();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// FAQ Toggle
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('span:last-child');
    
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '-' : '+';
}

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Intersection Observer for testimonials
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.testimonial-card').forEach(card => {
    observer.observe(card);
});

// Stats counter observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('clientes'), 500);
            animateCounter(document.getElementById('pedidos'), 1000);
            animateCounter(document.getElementById('productos'), 50);
            animateCounter(document.getElementById('años'), 3);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    alert('¡Gracias por tu pedido! Nos pondremos en contacto contigo pronto. 🎂');
    event.target.reset();
}

// Smooth scroll for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
