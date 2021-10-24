let addButton = document.querySelector('.profile__add-button');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
function openPopup() {
  popup.classList.add('popup_opened');
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
// Находим форму в DOM
let formElement = popup.querySelector('.popup__form')
// Находим поля формы в DOM
let nameInput = popup.querySelector('.popup__name').setAttribute('value', nameProfile.textContent);
let jobInput = popup.querySelector('.popup__job').setAttribute('value', jobProfile.textContent);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  nameInput = popup.querySelector('.popup__name').value;
  // Получите значение полей jobInput и nameInput из свойства value
  jobInput = popup.querySelector('.popup__job').value;
  // Выберите элементы, куда должны быть вставлены значения полей
  nameProfile.textContent = nameInput;
  jobProfile.textContent = jobInput;
  // Вставьте новые значения с помощью textContent
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
