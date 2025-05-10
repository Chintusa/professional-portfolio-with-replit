const header = document.getElementById('header');
const themeToggle = document.querySelector('.theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('back-to-top');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// Initialize on load
document.addEventListener('DOMContentLoaded', function () {
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Initialize skill bars when visible
    initializeSkillBars();

    // Activate current section in navigation
    highlightActiveNavLink();

    // Show "all" projects by default
    filterProjects('all');
});

// Theme Toggle
themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }

    // Highlight active nav link based on scroll position
    highlightActiveNavLink();
});

// Back to top functionality
backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize skill bars animation
function initializeSkillBars() {
    const options = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width + '%';
                observer.unobserve(skillBar);
            }
        });
    }, options);

    skillProgressBars.forEach(skillBar => {
        observer.observe(skillBar);
    });
}

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        filterProjects(filter);
    });
});

function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || category === cardCategory) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}




// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSectionId = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = '#' + section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSectionId) {
            link.classList.add('active');
        }
    });
}

// Animation on scroll (simple implementation)
const animateOnScroll = function () {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const options = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', function () {
    // Add animate-on-scroll class to elements
    const elementsToAnimate = [
        '.about-card',
        '.about-info',
        '.timeline-container',
        '.project-card',
        '.blog-card',
        '.contact-card',
        '.contact-form-container'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    animateOnScroll();
});

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
.animate-on-scroll {
opacity: 0;
transform: translateY(20px);
transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.animated {
opacity: 1;
transform: translateY(0);
}
`;
document.head.appendChild(style);