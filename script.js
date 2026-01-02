// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const bookingForm = document.getElementById('booking-form');
const successModal = document.getElementById('success-modal');
const closeModal = document.querySelector('.close-modal');
const allNavLinks = document.querySelectorAll('.nav-link');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== Smooth Scroll for Navigation Links =====
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Scroll to section
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Update Active Nav Link on Scroll =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Booking Form Submission =====
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Log form data (in production, send to server)
    console.log('Booking submitted:', data);
    
    // Show success modal
    successModal.classList.add('active');
    
    // Reset form
    bookingForm.reset();
});

// ===== Close Modal =====
closeModal.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
    }
});

// ===== Explore Buttons =====
const exploreButtons = document.querySelectorAll('.explore-btn');
exploreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.destination-card');
        const destinationName = card.querySelector('h3').textContent.trim();
        console.log('Exploring:', destinationName);
        
        // Scroll to booking form
        const contactSection = document.getElementById('contact');
        const navHeight = navbar.offsetHeight;
        window.scrollTo({
            top: contactSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// ===== Transport Buttons =====
const transportButtons = document.querySelectorAll('.transport-btn');
transportButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.transport-card');
        const transportType = card.querySelector('h3').textContent;
        console.log('Booking:', transportType);
        
        // Scroll to booking form
        const contactSection = document.getElementById('contact');
        const navHeight = navbar.offsetHeight;
        window.scrollTo({
            top: contactSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// ===== Call Now Button =====
const callBtn = document.querySelector('.call-btn');
if (callBtn) {
    callBtn.addEventListener('click', () => {
        console.log('Call button clicked');
        // In production, could open tel: link
        window.location.href = 'tel:+15551234567';
    });
}

// ===== Intersection Observer for Fade-in Animations =====
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

// Apply fade-in animation to cards
document.querySelectorAll('.destination-card, .transport-card, .benefit-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== Initialize Active Link on Load =====
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});