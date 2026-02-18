// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll('.about-card, .project-card, .arch-card, .contact-card, .experience-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Console welcome message
console.log('%c¡Bienvenido al portafolio de Jorge Bareiro!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cAK Solutions PY - https://www.aksolutionspy.com/', 'color: #10b981; font-size: 14px;');

// Modal functionality for portfolio images
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.getElementById('modalPrev');
const nextBtn = document.getElementById('modalNext');

let currentImageIndex = 0;
let portfolioItems = [];

// Initialize portfolio items
document.addEventListener('DOMContentLoaded', () => {
    portfolioItems = Array.from(document.querySelectorAll('.portfolio-item'));
    
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openModal(index);
        });
    });
});

function openModal(index) {
    currentImageIndex = index;
    const item = portfolioItems[index];
    const imageSrc = item.getAttribute('data-image');
    const title = item.getAttribute('data-title');
    const description = item.getAttribute('data-description');
    
    modalImg.src = imageSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + portfolioItems.length) % portfolioItems.length;
    openModal(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % portfolioItems.length;
    openModal(currentImageIndex);
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});
