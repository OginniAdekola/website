// 1. Initialize Animate On Scroll (AOS)
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });

        // 2. Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });

        // 3. Dark Mode Toggle
        const themeBtn = document.getElementById('theme-btn');
        const body = document.body;
        
        // Check local storage for theme preference
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            themeBtn.classList.remove('fa-moon');
            themeBtn.classList.add('fa-sun');
        }

        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Update Icon & Chart Colors
            if(body.classList.contains('dark-mode')) {
                themeBtn.classList.remove('fa-moon');
                themeBtn.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeBtn.classList.remove('fa-sun');
                themeBtn.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
            
            // Redraw chart if it exists to match theme
            if (window.myChart) {
                const isDark = body.classList.contains('dark-mode');
                const textColor = isDark ? '#d1d5db' : '#4b5563';
                const gridColor = isDark ? '#374151' : '#e5e7eb';
                
                window.myChart.options.plugins.legend.labels.color = textColor;
                window.myChart.options.plugins.title.color = textColor;
                window.myChart.options.scales.y.ticks.color = textColor;
                window.myChart.options.scales.x.ticks.color = textColor;
                window.myChart.options.scales.y.grid.color = gridColor;
                window.myChart.update();
            }
        });

        // 4. Sticky Navbar & Back to Top Button
        const header = document.querySelector('header');
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            // Navbar Shadow
            if (window.scrollY > 50) {
                header.style.padding = "0";
            } else {
                header.style.padding = "0";
            }

            // Back to top visibility
            if (window.scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        // Scroll to top action
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // 5. Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });

        // 6. Initialize Chart.js for Demo in About Section
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('demoChart');
            if (!ctx) return;

            const isDark = document.body.classList.contains('dark-mode');
            const textColor = isDark ? '#d1d5db' : '#4b5563';
            const gridColor = isDark ? '#374151' : '#e5e7eb';
            
            // Setup Gradient for primary dataset
            const gradientPrimary = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
            gradientPrimary.addColorStop(0, '#0d47a1');
            gradientPrimary.addColorStop(1, '#1976d2');

            window.myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [{
                        label: 'Revenue Growth (%)',
                        data: [12, 18, 24, 32],
                        backgroundColor: gradientPrimary,
                        borderRadius: 6,
                        borderWidth: 0
                    }, {
                        label: 'Cost Reduction (%)',
                        data: [5, 10, 15, 22],
                        backgroundColor: '#bbdefb',
                        borderRadius: 6,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { 
                                color: textColor,
                                font: { family: "'Inter', sans-serif", size: 13 }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Annual Business Impact Metrics',
                            color: textColor,
                            font: { family: "'Inter', sans-serif", size: 16, weight: 'bold' },
                            padding: { bottom: 20 }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(17, 24, 39, 0.9)',
                            titleFont: { family: "'Inter', sans-serif" },
                            bodyFont: { family: "'Inter', sans-serif" },
                            padding: 12,
                            cornerRadius: 8
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { color: textColor, font: { family: "'Inter', sans-serif" } },
                            grid: { color: gridColor, drawBorder: false }
                        },
                        x: {
                            ticks: { color: textColor, font: { family: "'Inter', sans-serif" } },
                            grid: { display: false, drawBorder: false }
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeOutQuart'
                    }
                }
            });
        });
