document.addEventListener('DOMContentLoaded', () => {
    /**
     * 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
     * Используем Lucide для отрисовки вектроных иконок
     */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /**
     * 2. МОБИЛЬНОЕ МЕНЮ (BURGER)
     */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        nav.classList.toggle('nav--active');
        burger.classList.toggle('burger--active');
        document.body.classList.toggle('no-scroll'); // Блокировка скролла при открытом меню
        
        // Анимация иконки
        if (nav.classList.contains('nav--active')) {
            burger.style.transform = 'rotate(90deg)';
        } else {
            burger.style.transform = 'rotate(0)';
        }
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav--active')) toggleMenu();
        });
    });

    /**
     * 3. ЭФФЕКТЫ ХЕДЕРА ПРИ СКРОЛЛЕ
     */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
            header.style.borderBottom = '1px solid rgba(0, 243, 255, 0.2)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(5, 5, 5, 0.8)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });

    /**
     * 4. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * 5. ОБЩАЯ АНИМАЦИЯ ПОЯВЛЕНИЯ (SCROLL REVEAL)
     */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('reveal--active');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el, index) => {
        // Устанавливаем шахматную задержку для элементов в одной секции
        const parent = el.closest('section');
        const siblings = parent ? parent.querySelectorAll('.reveal') : [];
        const order = Array.from(siblings).indexOf(el);
        el.dataset.delay = order * 100;
        revealObserver.observe(el);
    });

    /**
     * 6. HERO PARALLAX (ДВИЖЕНИЕ КАРТОЧКИ)
     */
    const heroCard = document.querySelector('.hero__card');
    if (heroCard && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    /**
     * 7. ИНТЕРАКТИВНОЕ СВЕЧЕНИЕ КАРТОЧЕК (PLATFORM SECTION)
     */
    const platformCards = document.querySelectorAll('.platform__card');
    platformCards.forEach(card => {
        const glow = card.querySelector('.platform__card-glow');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (glow) {
                glow.style.left = `${x - 50}px`;
                glow.style.top = `${y - 50}px`;
                glow.style.opacity = '0.4';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (glow) glow.style.opacity = '0';
        });
    });

    /**
     * 8. АНИМАЦИЯ ПРОГРЕСС-БАРОВ (BENEFITS)
     */
    const progressFills = document.querySelectorAll('.progress-box__fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    const widthMatch = fill.getAttribute('style').match(/--width:\s*([\d%]+)/);
                    if (widthMatch) fill.style.width = widthMatch[1];
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const benefitsSection = document.querySelector('.benefits__stats');
    if (benefitsSection) progressObserver.observe(benefitsSection);

    /**
     * 9. FLIP CARDS LOGIC (TECH STACK)
     * Переворот по клику для мобильных устройств
     */
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('click', () => {
            const inner = card.querySelector('.tech-card__inner');
            const isFlipped = card.classList.toggle('flipped');
            inner.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
        });
    });

    /**
     * 10. ВАЛИДАЦИЯ ФОРМЫ, КАПЧА И ОТПРАВКА (AJAX SIMULATION)
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const phoneInput = document.getElementById('phone');
        const captchaQuestion = document.getElementById('captcha-question');
        const captchaInput = document.getElementById('captcha-input');
        const statusBox = document.getElementById('form-status');

        // Генерация капчи
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        const sum = n1 + n2;
        if (captchaQuestion) captchaQuestion.textContent = `${n1} + ${n2}`;

        // Только цифры для телефона
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Сброс статуса
            statusBox.style.display = 'none';
            statusBox.className = 'form-status';

            // Проверка капчи
            if (parseInt(captchaInput.value) !== sum) {
                statusBox.textContent = 'Ошибка: Неверный ответ на защитный вопрос.';
                statusBox.classList.add('form-status--error');
                statusBox.style.display = 'block';
                return;
            }

            // Симуляция AJAX
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Обработка данных...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                statusBox.textContent = 'Заявка успешно отправлена! Эксперт GlideTica свяжется с вами.';
                statusBox.classList.add('form-status--success');
                statusBox.style.display = 'block';
                
                contactForm.reset();
            }, 2000);
        });
    }

    /**
     * 11. COOKIE POPUP LOGIC
     */
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--active');
        }, 3000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookiePopup.classList.remove('cookie-popup--active');
        });
    }
});