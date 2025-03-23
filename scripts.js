// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_ID');

// Back to Top Button
window.onscroll = function() {
    document.getElementById("backToTop").style.display = document.documentElement.scrollTop > 20 ? "block" : "none";
    document.querySelector('.navbar').classList.toggle('scrolled', document.documentElement.scrollTop > 20);
};

document.getElementById("backToTop").onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// Achievement Counter Animation
const counters = document.querySelectorAll('.achievement-counter');
counters.forEach(counter => {
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let target = +entry.target.getAttribute('data-target');
                let count = 0;
                let step = target / 200;
                let update = () => {
                    if (count < target) {
                        count += step;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(update, 1);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                update();
            }
        });
    }).observe(counter);
});

// Element Fade-In Animation
const animatedElements = document.querySelectorAll('.service-card, .achievement-item, .testimonial-card, .blog-card');
animatedElements.forEach(el => {
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }).observe(el);
});

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
        })
        .catch(() => alert('Failed to send message. Please try again later.'))
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
        });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector('.footer-links form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing! You will receive updates soon.');
        this.reset();
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});