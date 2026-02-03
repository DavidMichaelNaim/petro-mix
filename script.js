document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', ''); // Remove + for calculation
                
                // Lower increment to count faster
                const inc = target / speed;

                if (count < target) {
                    // Add count and wait
                    counter.innerText = Math.ceil(count + inc);
                    if (target > 100) {
                         // Add trailing + for large numbers visually
                         counter.innerText += '+'; 
                    }
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
    };

    // Trigger animation when Statistics section is in view
    let animated = false;
    const statsSection = document.querySelector('.stats');
    
    const onScroll = () => {
        if (!statsSection) return;
        
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            animateCounters();
            animated = true;
        }
    };

    window.addEventListener('scroll', onScroll);
});
