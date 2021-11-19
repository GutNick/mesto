//Надеюсь сделал все правильно :-)
import { initialCards } from "../utils/initialCards.js";
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const formProfileElement = popupProfile.querySelector('.popup__form');
const formElementCard = popupAddCard.querySelector('.popup__form');
const nameInput = document.getElementById('name-card');
const jobInput = document.getElementById('job');
const elementBlock = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

function insertProfileValues() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => closePopupEsc(element, evt));
}

function closePopup(element) {
    const form = element.querySelector('.popup__form');
    if (form !== null) {
        form.reset();
        toggleButton(form, obj);
        const errorMessage = element.querySelectorAll('.error');
        errorMessage.forEach((message) => {
            message.textContent = '';
        })
    }
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

function submitProfileForm(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupProfile)
}
const handleLikeButton = (evt) => {
    evt.target.classList.toggle('elements__heart_active');
}
const handleTrashButton = (evt) => {
    const card = evt.target.closest('.elements__element');
    card.remove();
}
function handleImagePopup(evt) {
    const srcValue = evt.target.src;
    const caption = evt.target.alt;
    const image = popupImage.querySelector('.popup__image');
    image.src = srcValue;
    image.alt = caption;
    popupImage.querySelector('.popup__caption').textContent = caption;
    openPopup(popupImage);
}
function createCard(srcValue, titleValue) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.src = srcValue;
    cardImage.alt = titleValue;
    cardElement.querySelector('.elements__title').textContent = titleValue;
    cardElement.querySelector('.elements__heart').addEventListener('click', handleLikeButton);
    cardElement.querySelector('.elements__trash').addEventListener('click', handleTrashButton);
    cardImage.addEventListener('click', handleImagePopup);
    return cardElement;
}
function renderCard(card) {
    elementBlock.prepend(card);
}
function addCardPopup(evt) {
    evt.preventDefault();
    const placeInput = document.getElementById('place-name').value;
    const srcInput = document.getElementById('place-url').value;
    const card = createCard(srcInput, placeInput);
    renderCard(card);
    closePopup(popupAddCard);
    placeInput.value = '';
    srcInput.value = '';
}
function closePopupEsc(element, evt) {
    if (evt.key === 'Escape') {
        closePopup(element);
    }
};
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};
initialCards.forEach((element) => {
    const card = createCard(element.link, element.name);
    renderCard(card);
})
editButton.addEventListener('click', () => {
    openPopup(popupProfile);
    insertProfileValues();
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
    openPopup(popupAddCard)
})
popupImage.addEventListener('click', closePopupOverlay);
popupProfile.addEventListener('click', closePopupOverlay);
popupAddCard.addEventListener('click', closePopupOverlay);