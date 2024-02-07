import './pages/index.css';
import { initialCards, creatingCard, removeCard } from './components/cards.js';
import { openPopup, closePopup, openImagePopup } from './components/modal.js';
import { enableValidation, clearValidation,validationConfig  } from './components/validation.js';

// DOM узлы
export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

// Функция-обработчик лайка
export function likeHandler(evt) {
    // Переключаем класс активности лайка при клике на него
    evt.target.classList.toggle('card__like-button_is-active');
}

// Вывести карточки на страницу
initialCards.forEach(function(element) {
    placesList.append(creatingCard(element.name, element.link, removeCard));
});

// Открытие и закрытие модальных окон
editButton.addEventListener('click', function() {
    openPopup(popupEdit);
});

addButton.addEventListener('click', function() {
    openPopup(popupNewCard);
});

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

export function closeEscape(evt) {
    if (evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

export function closeOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
}

// Изменение личных данных через форму
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const nameOutput = document.querySelector('.profile__title');
const jobOutput = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    nameOutput.textContent = nameValue;
    jobOutput.textContent = jobValue;

    closePopup(document.querySelector('.popup_is-opened'));
}

formElement.addEventListener('submit', handleFormSubmit);

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', function() {
    openPopup(popupEdit);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

// Создание новой карточки
const formInsidePopup = document.querySelector('.popup_type_new-card .popup__form');
const linkInput = formInsidePopup.querySelector('.popup__input_type_url');
const nameInputCard = formInsidePopup.querySelector('.popup__input_type_card-name');

formInsidePopup.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const nameValue = nameInputCard.value;
    const linkValue = linkInput.value;

    const newCard = creatingCard(nameValue, linkValue, removeCard);

    placesList.prepend(newCard);

    formInsidePopup.reset();

    const popupToClose = document.querySelector('.popup_is-opened');
    closePopup(popupToClose);
});


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    defaultErrorText: 'Это обязательное поле'
});


// Инициализация валидации с передачей конфигурации
enableValidation(validationConfig);

// Очистка ошибок валидации перед открытием модального окна
const editProfileForm = document.querySelector('.popup_type_edit .popup__form');

if (editProfileForm) {
    clearValidation(editProfileForm, validationConfig);
} else {
    console.error('Form element not found');
}
clearValidation(editProfileForm, validationConfig);