import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {openPopup, closePopup} from './components/modal.js';

//========================= Вывод и удалине карточек ===========================================

// @todo: Темплейт карточкиplaces__lis
const cardTemplate =document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList=document.querySelector ('.places__list');

// @todo: Функция создания карточки
function craetingCard (name,link,deleteCard){
    const cardElement=cardTemplate.querySelector ('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src=link;
    cardElement.querySelector('.card__image').alt=name;
    cardElement.querySelector('.card__title').textContent =name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardElement;
}
// @todo: Функция удаления карточки
function removeCard(event) {
    const deleteButton = event.target.closest('.card');
    deleteButton.remove();
};
// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    placesList.append(craetingCard(element.name, element.link, removeCard));
});



//============================== Открытие и закрытие модальных окон ================================
// Элементы, вызывающие открытие модальных окон
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

// Добавить слушателей событий для открытия модальных окон
editButton.addEventListener('click', function() {
    openPopup(popupEdit);
});

addButton.addEventListener('click', function() {
    openPopup(popupNewCard);
});

// Закрыть модальные окна
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});


// Закрыть модальные окна при клике по клавише ECS
export function closeEscape(evt) {
    if (evt.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}
// Закрыть модальные окна при клике вне них
export function closeOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target);
    }
}

//======================Изменение личных данных через форму ==========================================
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения полей nameInput и jobInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выбираем элементы, куда будем вставлять значения полей
    const nameOutput = document.querySelector('.profile__title');
    const jobOutput = document.querySelector('.profile__description'); 

    // Вставляем новые значения с помощью textContent
    nameOutput.textContent = nameValue;
    jobOutput.textContent = jobValue;
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


//================Устанавливает в качестве значений соответствующих поля формы =====================
 // Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик открытия модального окна редактирования профиля
editButton.addEventListener('click', function() {
    openPopup(popupEdit);
    
    // Устанавливаем значения полей формы редактирования профиля
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});

//============== Создание новой карточки ====================================

const formInsidePopup = popupNewCard.querySelector('.popup__form'); // Найти форму добавления карточки

// Добавить обработчик события submit на форму
formInsidePopup.addEventListener('submit', function(evt) {
    evt.preventDefault(); // Отменить стандартное поведение формы

    const nameInput = formInsidePopup.querySelector('.popup__input_type_card-name');
    const linkInput = formInsidePopup.querySelector('.popup__input_type_url');

    const nameValue = nameInput.value; // Получить значение имени карточки
    const linkValue = linkInput.value; // Получить значение ссылки на картинку

    // Создать новую карточку с полученными данными
    const newCard = craetingCard(nameValue, linkValue, removeCard);

    // Добовление новой карточки в массив
    const newCardData = { 
        name: nameValue,
        link: linkValue
    };
    
    initialCards.push(newCardData);

    // Найти контейнер для карточек
    const placesList = document.querySelector('.places__list');

    // Вставить новую карточку в начало контейнера
    placesList.prepend(newCard);

    // Очистить поля формы
    formInsidePopup.reset();

    closePopup(document.querySelector('.popup_is-opened')); // Закрыть окно после добавления карточки
});