import { cardTemplate, likeHandler } from "..";
import { openImagePopup } from "./modal";

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


//========================= Вывод и удалине карточек ===========================================
// @todo: Функция создания карточки
export function creatingCard (name,link,deleteCard){
  const cardElement=cardTemplate.querySelector ('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image'); // Находим элемент изображения в карточке

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent =name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);


 // Находим кнопку лайка и добавляем обработчик события клика
 const likeButton = cardElement.querySelector('.card__like-button');
 likeButton.addEventListener('click', likeHandler);

 // Обработчик события для открытия попапа с изображением
 cardImage.addEventListener('click', function () {
  openImagePopup(link, name);
});

  return cardElement;
}
// @todo: Функция удаления карточки
export function removeCard(event) {
  const deleteButton = event.target.closest('.card');
  deleteButton.remove();
};
