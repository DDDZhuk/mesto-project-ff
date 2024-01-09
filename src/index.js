import './pages/index.css';
import { initialCards, creatingCard, removeCard } from './components/cards.js';
import { openPopup, closePopup, openImagePopup } from './components/modal.js';

// @todo: DOM узлы
export const cardTemplate =document.querySelector('#card-template').content;
const placesList=document.querySelector ('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');



// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    placesList.append(creatingCard(element.name, element.link, removeCard));
  });
  
  

//============================== Открытие и закрытие модальных окон ================================
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

//====================== Изменение личных данных через форму ==========================================

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

    closePopup(document.querySelector('.popup_is-opened')); // Закрыаем попап
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


//================ Устанавливает в качестве значений соответствующих поля формы =====================
 
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

const formInsidePopup = document.querySelector('.popup_type_new-card .popup__form'); // Находим форму добавления карточки
const linkInput = formInsidePopup.querySelector('.popup__input_type_url');// Находим инпуты внутри формы добавления карточки
const nameInputCard = formInsidePopup.querySelector('.popup__input_type_card-name');

// Добавляем обработчик события submit на форму
formInsidePopup.addEventListener('submit', function (evt) {
    evt.preventDefault(); // Отмена стандартного поведение формы

    // Получаем значения инпутов перед обработчиком submit
    const nameValue = nameInputCard.value;
    const linkValue = linkInput.value;

    // Создание новой карточкуи с полученными данными
    const newCard = creatingCard(nameValue, linkValue, removeCard);

    // Найти контейнер для карточек
    const placesList = document.querySelector('.places__list');
    // Вставить новую карточку в начало контейнера
    placesList.prepend(newCard);

    // Очистить поля формы
    formInsidePopup.reset();

    closePopup(document.querySelector('.popup_is-opened')); // Закрыть окно после добавления карточки
});

