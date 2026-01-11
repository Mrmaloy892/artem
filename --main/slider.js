const slider = document.querySelector('.infinite-slider');
    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Клонуємо перший і останній слайд для безшовного переходу
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    wrapper.appendChild(firstClone);
    wrapper.insertBefore(lastClone, slides[0]);

    // Оновлюємо кількість слайдів після клонування
    const allSlides = wrapper.querySelectorAll('.slide');
    const updatedTotal = allSlides.length;

    // Встановлюємо початкову позицію (на першому реальному слайді)
    wrapper.style.transform = `translateX(-${100 * 1}%)`;

    function goToSlide(index) {
        wrapper.style.transition = 'transform 0.5s ease-in-out';
        wrapper.style.transform = `translateX(-${100 * index}%)`;
        currentIndex = index;
    }

    function nextSlide() {
        if (currentIndex >= updatedTotal - 1) {
            // Перехід до клонованої першої
            goToSlide(currentIndex + 1);
            // Після завершення анімації стрибаємо назад без переходу
            setTimeout(() => {
                wrapper.style.transition = 'none';
                goToSlide(1); // реальний перший слайд
            }, 500);
        } else {
            goToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex <= 0) {
            // Перехід до клонованої останньої
            goToSlide(currentIndex - 1);
            setTimeout(() => {
                wrapper.style.transition = 'none';
                goToSlide(updatedTotal - 2); // реальний останній слайд
            }, 500);
        } else {
            goToSlide(currentIndex - 1);
        }
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Автопрокрутка (необов’язково, закоментіть якщо не потрібно)
    let autoPlay = setInterval(nextSlide, 4000);

    slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slider.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 4000));