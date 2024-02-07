

// Конфигурация валидации формы
const validationConfig = {
    formSelector: '.popup__form',                // Селектор формы
    inputSelector: '.popup__input',              // Селектор для поиска всех инпутов внутри формы
    submitButtonSelector: '.popup__button',      // Селектор кнопки отправки формы
    inactiveButtonClass: 'popup__button_disabled', // Класс для неактивной кнопки отправки формы
    inputErrorClass: 'popup__input_type_error',   // Класс для стилизации невалидного инпута
    errorClass: 'popup__error_visible',           // Класс для стилизации видимой ошибки
};

// Функция проверки валидности имени или описания
function isValidNameOrDescription(inputElement) {
    const pattern = /^[a-zA-ZА-Яа-я\s\-]+$/; // Регулярное выражение разрешает латинские и кириллические буквы, пробелы и дефисы
    return pattern.test(inputElement.value);
}

// Функция проверки валидности поля ввода с учетом минимальной длины
function checkMinLengthValidity(inputElement, validationConfig) {
    const minLength = inputElement.minLength;  // Минимальная длина, указанная в атрибуте minLength
    const valueLength = inputElement.value.length; // Длина текущего значения поля ввода

    if (valueLength < minLength) {
        showError(inputElement, validationConfig);  // Показать ошибку, если длина меньше минимальной
    } else {
        hideError(inputElement, validationConfig);  // Скрыть ошибку, если длина удовлетворительная
    }
}

// Функция проверки валидности поля ввода
function checkInputValidity(inputElement, validationConfig) {
    const isValid = inputElement.validity.valid; // Проверка валидности по стандартным HTML5 правилам

    if (!isValid) {
        showError(inputElement, validationConfig);  // Показать ошибку, если поле невалидно
    } else {
        // Дополнительные проверки, включая isValidNameOrDescription
        if (!isValidNameOrDescription(inputElement)) {
            showError(inputElement, validationConfig);  // Показать ошибку, если не проходит дополнительную проверку
            return;
        }

        hideError(inputElement, validationConfig);  // Скрыть ошибку, если поле валидно
    }
}

// Функция установки слушателей событий
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  // Получение списка инпутов
    const buttonElement = formElement.querySelector('.popup__button');           // Получение кнопки

    toggleButtonState(inputList, buttonElement, validationConfig);  // Изначальное состояние кнопки

    inputList.forEach((inputElement) => {
        // Слушатель на событие ввода текста
        inputElement.addEventListener('input', function () {
            checkInputValidity(inputElement, validationConfig);  // Проверка валидности при вводе
            toggleButtonState(inputList, buttonElement, validationConfig);  // Обновление состояния кнопки
        });

        // Слушатель на событие изменения значения (фокус ушел из поля)
        inputElement.addEventListener('change', function () {
            hideError(inputElement, validationConfig);  // Скрыть ошибку после изменения значения
            checkMinLengthValidity(inputElement, validationConfig);  // Проверка минимальной длины
        });

        // Если у поля указана минимальная длина
        if (inputElement.minLength > 0) {
            // Слушатель на событие ввода текста снова (при наличии минимальной длины)
            inputElement.addEventListener('input', function () {
                hideError(inputElement, validationConfig);  // Скрыть ошибку при вводе текста
                checkMinLengthValidity(inputElement, validationConfig);  // Проверка минимальной длины
            });
        }
    });
};

// Событие при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function () {
    const editProfileForm = document.querySelector('.popup__form_type_edit-profile'); // Форма редактирования профиля
    const newPlaceForm = document.querySelector('.popup__form_type_new-place');      // Форма добавления нового места

    const config = validationConfig;  // Конфигурация валидации

    // Слушатель события отправки формы редактирования профиля
    editProfileForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // Дополнительные действия при отправке формы редактирования профиля
    });

    // Слушатель события отправки формы для нового места
    newPlaceForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        // Дополнительные действия при отправке формы для нового места
    });

    setEventListeners(editProfileForm, config);  // Установка слушателей событий для формы редактирования профиля
    setEventListeners(newPlaceForm, config);      // Установка слушателей событий для формы добавления нового места
});

// Функция показа ошибки
const showError = (inputElement, validationConfig) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add(validationConfig.inputErrorClass);  // Добавление класса стиля для невалидного инпута

        // Проверка наличия значения в поле
        if (inputElement.validity.valueMissing) {
            errorElement.textContent = "Это обязательное поле";  // Ошибка для незаполненного обязательного поля
        } else if (inputElement.validity.tooShort) {
            // Используем атрибут minLength для кастомного сообщения об ошибке
            errorElement.textContent = `Минимальная длина ${inputElement.minLength} символа(ов)`;
        } else {
            // Проверяем кастомное сообщение из атрибута data-error-message
            const customErrorMessage = inputElement.getAttribute('data-error-message');

            // Проверяем наличие атрибута pattern и соответствие регулярному выражению
            if (inputElement.hasAttribute('pattern') && !new RegExp(inputElement.getAttribute('pattern')).test(inputElement.value)) {
                // Используем кастомное сообщение или общее "Ошибка валидации"
                errorElement.textContent = customErrorMessage || 'Ошибка валидации';
            } else {
                // Сбрасываем текст ошибки в случае отсутствия ошибки в валидации
                errorElement.textContent = '';
            }
        }

        errorElement.classList.add(validationConfig.errorClass);  // Добавление класса стиля для видимости ошибки
        console.log(`Showing error for: ${inputElement.name}`, errorElement.textContent);
        console.log(`Adding .popup__error_visible to ${inputElement.name}`);
        console.log(`Before adding .popup__error_visible: ${inputElement.name}`);
        errorElement.classList.add('popup__error_visible');  // Добавление класса стиля для видимости ошибки (в консоль выводится дважды)
        console.log(`After adding .popup__error_visible: ${inputElement.name}`);
        errorElement.classList.add('popup__error_visible');  // Добавление класса стиля для видимости ошибки (в консоль выводится дважды)
    }
};

// Функция скрытия ошибки
const hideError = (inputElement, validationConfig) => {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(validationConfig.inputErrorClass);  // Удаление класса стиля для невалидного инпута
        errorElement.textContent = '';  // Очистка текста ошибки
        errorElement.classList.remove(validationConfig.errorClass);  // Удаление класса стиля для видимости ошибки
    }
};

// Функция переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;  // Если есть невалидные поля, кнопка неактивна
        buttonElement.classList.add('button_inactive');  // Добавление класса стиля для неактивной кнопки
    } else {
        buttonElement.disabled = false;  // Если все поля валидны, кнопка активна
        buttonElement.classList.remove('button_inactive');  // Удаление класса стиля для неактивной кнопки
    }
};

// Функция проверки наличия невалидных полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;  // Возвращает true, если хотя бы одно поле невалидно
    });
};

// Функция включения валидации для всех форм на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));  // Получение всех форм на странице
    formList.forEach((formElement) => {
        if (formElement) {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();  // Предотвращение стандартной отправки формы
            });
            setEventListeners(formElement, validationConfig);  // Установка слушателей событий для каждой формы
        } else {
            console.error('Form element is null or undefined');  // Вывод сообщения об ошибке в консоль
        }
    });
};

// Функция очистки ошибок валидации для конкретной формы
function clearValidation(formElement, validationConfig) {
    if (!formElement) {
        console.error('Form element is null or undefined');  // Вывод сообщения об ошибке в консоль
        return;
    }

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  // Получение всех инпутов внутри формы
    inputList.forEach((inputElement) => {
        hideError(inputElement, validationConfig);  // Скрытие ошибок для каждого инпута
    });
    const buttonElement = formElement.querySelector('.popup__button');  // Получение кнопки формы
    toggleButtonState(inputList, buttonElement, validationConfig);  // Обновление состояния кнопки
}

// Вызов функции включения валидации
enableValidation();

// Экспорт функций и объекта конфигурации для возможности использования в других файлах
export { enableValidation, clearValidation, validationConfig };