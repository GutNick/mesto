export const imgPopup = document.querySelector('.popup__img');
export const titlePopup = document.querySelector('.popup__text');
export const popupProfile = document.querySelector('.popup_profile');
export const buttonOpenPopupProfile = document.querySelector('.profile__button-edit');
export const templateElement = document.querySelector('.template-element');
export const popupAddElement = document.querySelector('.popup_element');
export const elementAddButton = document.querySelector('.profile__button-add');
export const formPopupProfile = popupProfile.querySelector('.popup__form');
export const formPopupAddElement = popupAddElement.querySelector('.popup__form');
export const inputList = document.querySelector('.popup_profile').querySelectorAll('.popup__field');
export const buttonOpenChangeAvatar = document.querySelector('.profile__wrapper-avatar');
export const popupAvatar = document.querySelector('.popup_avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__field_type_error',
  errorContainerClass: '.popup__error',
}