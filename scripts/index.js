const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
const formElement = popupProfile.querySelector('.popup__form');
const formElementCard = popupAddCard.querySelector('.popup__form');
let nameInput = popupProfile.querySelector('input[name="popup__name"]');
let jobInput = popupProfile.querySelector('input[name="popup__job"]');
const elementBlock = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((element) => {
    createCard(element.link, element.name)
})

function createCard(srcValue, titleValue) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);

    cardElement.querySelector('.elements__image').src = srcValue;
    cardElement.querySelector('.elements__image').alt = titleValue;
    cardElement.querySelector('.elements__title').textContent = titleValue;
    cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart_active');
    });
    cardElement.querySelector('.elements__trash').addEventListener('click', (evt) => {
        const card = evt.target.closest(".elements__element");
        card.remove();
    });
    cardElement.querySelector('.elements__image').addEventListener("click", imagePopup);
    elementBlock.prepend(cardElement);
}

function openPopup(element) {
    element.classList.add('popup_opened');
    if (nameInput.value !== nameProfile.textContent && jobInput.value !== jobProfile.textContent) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
    }
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput = popupProfile.querySelector('input[name="popup__name"]').value;

    jobInput = popupProfile.querySelector('input[name="popup__job"]').value;

    nameProfile.textContent = nameInput;
    jobProfile.textContent = jobInput;

    closePopup(popupProfile)
}

function addCardPopup(evt) {
    evt.preventDefault();
    const placeInput = popupAddCard.querySelector('input[name="popup__place"]').value;
    const srcInput = popupAddCard.querySelector('input[name="popup__src"]').value;
    createCard(srcInput, placeInput);
    closePopup(popupAddCard);
    popupAddCard.querySelector('input[name="popup__place"]').value = '';
    popupAddCard.querySelector('input[name="popup__src"]').value = '';
}

function imagePopup(evt) {
    const srcValue = evt.target.src;
    const caption = evt.target.alt;
    popupImage.querySelector('.popup__image').src = srcValue;
    popupImage.querySelector('.popup__image').alt = caption;
    popupImage.querySelector('.popup__caption').textContent = caption;
    openPopup(popupImage);
}

editButton.addEventListener('click', () => {
    openPopup(popupProfile)
})
closeButtons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const popup = evt.target.closest(".popup");
        closePopup(popup);
    });
});
formElement.addEventListener('submit', formSubmitHandler);
formElementCard.addEventListener('submit', addCardPopup);
addButton.addEventListener('click', () => {
    openPopup(popupAddCard)
})