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
//Несмотря на критическое замечание объявить все переменные через const, так как они нигде не перезаписываются, переменные ниже перезаписываются в функции смены имени и профессии. Остальные переназначил через const.
let nameInput = popupProfile.querySelector('input[name="popup__name"]');
let jobInput = popupProfile.querySelector('input[name="popup__job"]');
const elementBlock = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((element) => {
    const card = createCard(element.link, element.name);
    renderCard(card);
})

function createCard(srcValue, titleValue) {
    const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    cardImage.src = srcValue;
    cardImage.alt = titleValue;
    cardElement.querySelector('.elements__title').textContent = titleValue;
    cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart_active');
    });
    cardElement.querySelector('.elements__trash').addEventListener('click', (evt) => {
        const card = evt.target.closest('.elements__element');
        card.remove();
    });
    cardImage.addEventListener('click', imagePopup);
    return cardElement;
}
function renderCard(card) {
    elementBlock.prepend(card);
}
function profileCheck() {
    if (nameInput.value !== nameProfile.textContent && jobInput.value !== jobProfile.textContent) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
    }
}

function openPopup(element) {
    element.classList.add('popup_opened');
}

function closePopup(element) {
    element.classList.remove('popup_opened');
}

function submitProfileForm(evt) {
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
    const card = createCard(srcInput, placeInput);
    renderCard(card);
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
    openPopup(popupProfile);
    profileCheck();
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