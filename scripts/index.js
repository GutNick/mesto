const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
const formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup_input_name');
let jobInput = popup.querySelector('.popup_input_job');

function openPopup() {
  popup.classList.add('popup_opened');
  if (nameInput.value !== nameProfile.textContent && jobInput.value !== jobProfile.textContent) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
}
function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput = popup.querySelector('.popup_input_name').value;

  jobInput = popup.querySelector('.popup_input_job').value;

  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;

  closePopup()
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
