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
});