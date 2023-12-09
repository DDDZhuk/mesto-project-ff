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