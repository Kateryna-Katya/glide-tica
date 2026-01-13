document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок Lucide
    lucide.createIcons();

    // Мобильное меню
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
        burger.classList.toggle('burger--active');
        
        // Анимация иконки бургера
        const spans = burger.querySelectorAll('span');
        if (nav.classList.contains('nav--active')) {
            burger.style.transform = 'rotate(90deg)';
        } else {
            burger.style.transform = 'rotate(0)';
        }
    });

    // Смена прозрачности хедера при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });

    // Плавный переход по якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('nav--active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Функция инициализации анимаций появления
const initScrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем небольшую задержку для каждого элемента в очереди
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('reveal--active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    reveals.forEach((el, index) => {
        // Автоматически назначаем задержку для элементов в одной секции
        el.dataset.delay = index * 150; 
        revealObserver.observe(el);
    });
};

// Вызов функции (добавьте это в DOMContentLoaded)
initScrollReveal();

// Параллакс эффект для карточки в Hero (нативный JS)
const heroCard = document.querySelector('.hero__card');
if (heroCard) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
    }
    // Добавьте этот код в DOMContentLoaded
const initCardGlow = () => {
    const cards = document.querySelectorAll('.platform__card');
    
    cards.forEach(card => {
        const glow = card.querySelector('.platform__card-glow');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = `${x - 50}px`;
            glow.style.top = `${y - 50}px`;
            glow.style.opacity = '0.4';
        });
        
        card.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
};

    initCardGlow();
    // Функция для анимации прогресс-баров
const initProgressBars = () => {
    const progressSection = document.querySelector('.benefits__stats');
    const fills = document.querySelectorAll('.progress-box__fill');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fills.forEach(fill => {
                    fill.style.width = fill.getAttribute('style').match(/--width:\s*([\d%]+)/)[1];
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (progressSection) {
        progressObserver.observe(progressSection);
    }
};

// Вызовите в DOMContentLoaded
initProgressBars();
});