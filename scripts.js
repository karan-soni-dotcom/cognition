// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_ID');

// Back to Top Button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.getElementById("backToTop").style.display = "none";
        document.querySelector('.navbar').classList.remove('scrolled');
    }
};

document.getElementById("backToTop").onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// Achievement Counter Animation
const counters = document.querySelectorAll('.achievement-counter');
const speed = 200;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / speed;

    const updateCount = () => {
        if(count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };

    updateCount();
};

// IntersectionObserver for animations
const observerOptions = {
    threshold: 0.1
};

// For counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounter(entry.target);
        } else {
            entry.target.innerText = '0'; // Reset counter when out of view
        }
    });
}, observerOptions);

counters.forEach(counter => counterObserver.observe(counter));

// For animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .achievement-item, .testimonial-card, .blog-card').forEach(
    el => animationObserver.observe(el)
);

// EmailJS Form Submission
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';
    emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', this)
        .then(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }, (error) => {
            alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
        });
});

// Newsletter Form Submission (Placeholder - Replace with actual backend handling)
document.querySelector('.footer-links form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing! You will receive updates soon.');
    this.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});