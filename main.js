document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const popUp = document.getElementById('pop_up');
    const popUpBody = document.querySelector('.pop_up_body');
    const openPopUpButtons = document.querySelectorAll('.open_pop_up');

    // Добавление обработчика события click на <h1>
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        let clickTimeout;
        mainHeading.addEventListener('click', function () {
            if (clickTimeout) clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                alert('Вы кликнули на заголовок - так держать!');
            }, 300);
        });

        mainHeading.addEventListener('dblclick', function () {
            if (clickTimeout) clearTimeout(clickTimeout);
            alert('Не налегай, у меня не так много любимых преподавателей');
        });
    } else {
        console.error('Заголовок <h1> не найден!');
    }


    // Сохранить оригинальное содержимое модального окна
    const originalPopUpContent = popUpBody ? popUpBody.innerHTML : '';

    // Показать/скрыть кнопку "Вверх"
    window.addEventListener('scroll', function () {
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display =
                document.body.scrollTop > 200 || document.documentElement.scrollTop > 300
                    ? 'block'
                    : 'none';
        }
    });

    // Прокрутка наверх
    scrollToTopBtn?.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Открытие модального окна
    openPopUpButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            if (popUpBody) popUpBody.innerHTML = originalPopUpContent;
            popUp?.classList.add('active');
            setupPopUpEvents();
        });
    });

    function setupPopUpEvents() {
        const closePopUp = document.getElementById('close_pop_up');
        closePopUp?.addEventListener('click', () => {
            popUp?.classList.remove('active');
        });

        popUp?.addEventListener('click', (e) => {
            if (e.target === popUp) {
                popUp.classList.remove('active');
            }
        });

        setupFormValidation();
    }

    function setupFormValidation() {
        const form = document.querySelector('form');
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            submitForm(form);
        });
    }

    function submitForm(form) {
        const name = form.querySelector('input[placeholder="Иванов Иван Иванович"]');
        const email = form.querySelector('input[placeholder="test@mail.ru"]');
        const phone = form.querySelector('input[placeholder="+7 919 999 99 99"]');

        let isValid = true;

        if (!name?.value.trim() || !/^[А-Яа-яЁё\s\-]+$/.test(name.value) || name.value.split(' ').length < 2) {
            alert('Пожалуйста, введите корректное ФИО.');
            isValid = false;
        }

        if (!email?.value.trim() || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.value)) {
            alert('Пожалуйста, введите корректный email.');
            isValid = false;
        }

        if (!phone?.value.trim() || !/^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(phone.value)) {
            alert('Пожалуйста, введите корректный телефон.');
            isValid = false;
        }

        if (isValid) {
            if (popUpBody) {
                popUpBody.innerHTML = `
                    <h2>Спасибо!</h2>
                    <p>Форма успешно отправлена.</p>
                    <button id="close_success_message">Закрыть</button>
                `;
            }

            const closeSuccessMessage = document.getElementById('close_success_message');
            closeSuccessMessage?.addEventListener('click', () => {
                popUp?.classList.remove('active');
            });
        }
    }

    setupPopUpEvents();
});
