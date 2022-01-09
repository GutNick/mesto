import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  config,
  buttonOpenPopupProfile,
  templateElement,
  imgPopup,
  titlePopup,
  elementAddButton,
  formPopupProfile,
  formPopupAddElement,
  inputList
} from '../utils/constants.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

const popupBigImage = new PopupWithImage(imgPopup, titlePopup, '.popup_image');

function handleCardClick(name, link) {
  popupBigImage.open(name, link);
}

function createdCard(name, link) {
  const card = new Card(name, link, templateElement, handleCardClick);
  return card.createCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const name = item.name;
    const link = item.link;
    cardList.addItem(createdCard(name, link));
  }
},'.elements');

const userInfo = new UserInfo({name:'.profile__name', job:'.profile__description'});

const popupWithFormProfile = new PopupWithForm('.popup_profile',
  {submitRenderer: (formData) => {
      const name = formData.userName;
      const job = formData.userJob;
    userInfo.setUserInfo(name, job);
    popupWithFormProfile.close();
  }})

const popupWithFormAddElement = new PopupWithForm('.popup_element',
  {submitRenderer: (formData) => {
      const name = formData.elementName;
      const link = formData.link;
      cardList.addItem(createdCard(name, link));
    popupWithFormAddElement.close();
  }})

popupWithFormProfile.setEventListeners();
popupWithFormAddElement.setEventListeners();
popupBigImage.setEventListeners();
cardList.renderItems();

const validationFormProfile = new FormValidator(config, formPopupProfile);
validationFormProfile.enableValidation();

const validationFormAddElement = new FormValidator(config, formPopupAddElement);
validationFormAddElement.enableValidation();

buttonOpenPopupProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputList.forEach((input) => {
    input.value = userData.userName
    if(input.name === 'userJob') {
      input.value = userData.userJob
    }
  });
  validationFormProfile.resetValidation();
  popupWithFormProfile.open();
});

elementAddButton.addEventListener('click', () => {
  validationFormAddElement.resetValidation();
  popupWithFormAddElement.open();
});
