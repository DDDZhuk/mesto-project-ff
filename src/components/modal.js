import { closeEscape, closeOverlay} from '../index.js';

// Функция открытия модального окна
export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscape);
    document.addEventListener('click', closeOverlay);
}

// Функция закрытия модального окна
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscape);
    document.removeEventListener('click', closeOverlay);
}