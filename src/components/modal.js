import { closeEscape, closeOverlay,} from '../index.js';

// Функция открытия модального окна
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-animated');
    setTimeout(() => {
        popupElement.classList.add('popup_is-opened');
    }, 10); 
    document.addEventListener('keydown', closeEscape);
    document.addEventListener('click', closeOverlay);
}

// Функция закрытия модального окна
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscape);
    document.removeEventListener('click', closeOverlay);
}

// Функция открытия модального окна изображения
export function openImagePopup(imageLink, imageName) {
    const imagePopup = document.querySelector('.popup_type_image'); // Получаем попап с изображением
    const imageElement = imagePopup.querySelector('.popup__image'); // Находим элемент изображения в попапе
    const captionElement = imagePopup.querySelector('.popup__caption'); // Находим элемент подписи изображения

    imageElement.src = imageLink; // Устанавливаем ссылку изображения
    imageElement.alt = imageName; // Устанавливаем описание изображения (альтернативный текст)
    captionElement.textContent = imageName; // Устанавливаем подпись для изображения

    openPopup(imagePopup); // Открываем попап с изображением
}