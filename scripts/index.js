import { initialCards } from "../utils/initialCards.js";
import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
export const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const formProfileElement = popupProfile.querySelector('.popup__form');
const formElementCard = popupAddCard.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('#name-card');
const jobInput = popupProfile.querySelector('#job');
const placeInput = formElementCard.querySelector('#place-name');
const srcInput = formElementCard.querySelector('#place-url');
const template = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.elements');
const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorContainer: '.error'
}
const formProfileValidator = new FormValidator(obj, formProfileElement);
const formCardValidator = new FormValidator(obj, formElementCard);
function insertProfileValues() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}
export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}
function openProfilePopup() {
    formProfileValidator.resetValidation();
    insertProfileValues();
    openPopup(popupProfile);
}
function openCardAddForm() {
    formCardValidator.resetValidation();
    openPopup(popupAddCard);
}
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}
function submitProfileForm(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupProfile);
}
function renderCard(item) {
    const card = new Card(item, template).createCard();
    cardContainer.prepend(card);
}
function addCardPopup(evt) {
    evt.preventDefault();
    const card = { name: placeInput.value, link: srcInput.value };
    renderCard(card);
    closePopup(popupAddCard);
    placeInput.value = '';
    srcInput.value = '';
}
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}
initialCards.forEach((element) => {
    renderCard(element);
})
editButton.addEventListener('click', () => {
    openProfilePopup();
})
closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
});
formProfileElement.addEventListener('submit', submitProfileForm);
formElementCard.addEventListener('submit', addCardPopup);
addButton.addEventListener('click', () => {
    openCardAddForm();
});
popupImage.addEventListener('click', closePopupOverlay);
popupProfile.addEventListener('click', closePopupOverlay);
popupAddCard.addEventListener('click', closePopupOverlay);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();