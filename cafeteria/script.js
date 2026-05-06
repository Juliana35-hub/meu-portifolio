// Encanto do Grão - Professional Interaction Script

document.addEventListener('DOMContentLoaded', () => {

     // --- LÓGICA DA TELA DE SPLASH (INÍCIO) ---
    const splash = document.getElementById('splash-screen');
    const splashItems = document.querySelectorAll('.splash-item');
    let splashIndex = 0;

    // Trava o scroll assim que o DOM estiver pronto
    document.body.classList.add('loading');

    // Intervalo para trocar os ícones da tela de splash
    const splashInterval = setInterval(() => {
        splashItems[splashIndex].classList.remove('active');
        splashIndex = (splashIndex + 1) % splashItems.length;
        splashItems[splashIndex].classList.add('active');
    }, 1000); // Troca a cada 1 segundo

    // Função para esconder a tela de splash quando tudo carregar
    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(splashInterval); // Para a animação
            if (splash) {
                splash.classList.add('hidden'); // Esconde a tela preta
            }
            document.body.classList.remove('loading'); // Libera o scroll
        }, 3000); // 3 segundos de exibição mínima
    });
    // --- LÓGICA DA TELA DE SPLASH (FIM) ---
    
    const header = document.querySelector('header');
    
    // 1. Navbar Scroll Effect
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(75, 46, 43, 0.98)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            document.querySelector('.logo').style.color = '#F5E6D3';
            document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '#F5E6D3');
        } else {
            header.style.background = 'rgba(255, 248, 240, 0.95)';
            header.style.boxShadow = 'none';
            document.querySelector('.logo').style.color = '#4B2E2B';
            document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '#2A1F19');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // 3. Reveal Animations on Scroll (Regra #3)
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Smooth Scroll (Regra #5)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 4. Testimonials Carousel
    const track = document.getElementById('testimonials-track');
    if (track) {
        const cards = Array.from(track.children);
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        const dotsNav = document.getElementById('carousel-dots');
        
        let currentIndex = 0;
        let itemsToShow = window.innerWidth > 768 ? 2 : 1;
        let maxIndex = cards.length - itemsToShow;

        // Create dots
        const createDots = () => {
            dotsNav.innerHTML = '';
            itemsToShow = window.innerWidth > 768 ? 2 : 1;
            maxIndex = cards.length - itemsToShow;
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsNav.appendChild(dot);
            }
        };

        const updateDots = (index) => {
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const goToSlide = (index) => {
            if (index < 0) index = maxIndex;
            if (index > maxIndex) index = 0;
            
            currentIndex = index;
            const cardWidth = cards[0].getBoundingClientRect().width + 30; // card + gap
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            updateDots(currentIndex);
        };

        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

        // Auto Slide
        let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);

        // Pause on hover
        track.addEventListener('mouseenter', () => clearInterval(autoSlide));
        track.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
        });

        // Touch/Swipe Support para Mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlide); // Pausa o carrossel durante o toque
        }, {passive: true});

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // Retoma o carrossel
            autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
        }, {passive: true});

        const handleSwipe = () => {
            const swipeThreshold = 40; // Distância mínima (em pixels) para considerar um arraste
            if (touchEndX < touchStartX - swipeThreshold) {
                // Deslizou para a esquerda -> Próximo slide
                goToSlide(currentIndex + 1);
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                // Deslizou para a direita -> Slide anterior
                goToSlide(currentIndex - 1);
            }
        };

        // Handle Resize
        window.addEventListener('resize', () => {
            createDots();
            goToSlide(0);
        });

        createDots();
    }

    // 5. Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuIcon.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar o menu ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 6. Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
