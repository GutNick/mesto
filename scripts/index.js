import { initialCards } from "../utils/initialCards.js";// Импортируем массив с объектами карточек
import { Card } from './Card.js';// Импортируем класс Card для создания новых карточек
import { FormValidator } from "./FormValidator.js";
const addButton = document.querySelector('.profile__add-button');// Находим кнопку добавить карточку и помещаем в константу addButton
const editButton = document.querySelector('.profile__edit-button');// Находим кнопку редактировать профиль и помещаем в константу editButton
const popupProfile = document.querySelector('.popup_type_profile');// Находим попап редактирования профиля и помещаем в константу popupProfile
const popupAddCard = document.querySelector('.popup_type_card-add');// Находим попап добавления карточек и помещаем в константу popupAddCard
export const popupImage = document.querySelector('.popup_type_image');// Находим попап изображения карточки и помещаем в константу popupAddCard
const closeButtons = document.querySelectorAll('.popup__close');// Находим все кнопки закрыть попап в псевдомассив и помещаем их в константу closeButtons
const nameProfile = document.querySelector('.profile__name');// Находим Имя в карточке пользователя и помещаем его в константу nameProfile
const jobProfile = document.querySelector('.profile__job');// Находим Профессию в карточке пользователя и помещаем её в константу jobProfile
const formProfileElement = popupProfile.querySelector('.popup__form')// Находим форму в попапе редактирования профиля и помещаем её в константу formProfileElement
const formElementCard = popupAddCard.querySelector('.popup__form');// Находим форму в попапе добавления карточек и помещаем её в константу formElementCard
const nameInput = popupProfile.querySelector('#name-card');// находим input поле имени в попапе редактирования профиля и помещаем в константу nameInput
const jobInput = popupProfile.querySelector('#job');// находим input поле профессия в попапе редактирования профиля и помещаем в константу jobInput
const placeInput = formElementCard.querySelector('#place-name');// находим input поле названия места в попапе добавления карточек и помещаем в константу placeInput
const srcInput = formElementCard.querySelector('#place-url');// находим input поле ссылки на изображение в попапе добавления карточек и помещаем в константу srcInput
const template = document.querySelector('#card-template').content;
const obj = {
    formSelector: '.popup__form',//форма
    inputSelector: '.popup__input',//поле ввода
    submitButtonSelector: '.popup__button',//кнопка submit
    inactiveButtonClass: 'popup__button_disabled',//класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error',//класс поля ввода с ошибкой
    errorClass: 'popup__error_visible'//класс видимого поля ошибки
}
const formProfileValidator = new FormValidator(obj, formProfileElement);
const formCardValidator = new FormValidator(obj, formElementCard);
// Функция присвоения значениям полей имени и профессии попапа редактирования профиля содержимого блоков имени и профессии блока профиля
function insertProfileValues() {
    nameInput.value = nameProfile.textContent;// присвоение имени
    jobInput.value = jobProfile.textContent;// присвоение профессии
}
// функция открытия попап, получает параметр - элемент
export function openPopup(element) {
    element.classList.add('popup_opened');// добавляет полученному элементу класс popup_opened
    document.addEventListener('keydown', (evt) => closePopupEsc(element, evt));//добавляем странице слушателя событий (нажатие клавишы, событие) - стрелочная функция - функция closePopupEsc с параметрами элемент и нажатая клавиша
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
// функция закрытия попап, получает параметр - элемент
function closePopup(element) {
    element.classList.remove('popup_opened');// убираем у попапа класс popup_opened (закрываем)
    document.removeEventListener('keydown', closePopupEsc);// снимаем со страницы слушатель нажатия клавишы функции closePopupEsc
}
//Функция нажатия submit формы профиля
function submitProfileForm(evt) { //принимает событие
    evt.preventDefault();//отключаем дефолтное поведение формы при данном событии
    // передаем в блок профиля данные из полей формы профиля
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup(popupProfile)// вызываем функцию закрытия попапа с параметром popupProfile содержащим попап профиля
}

//функция вставки элемента переданного параметром card
function renderCard(item) {
    const card = new Card(item, template).createCard()
    document.querySelector('.elements').prepend(card);//вставляем переданный элемент в блок с карточками через константу elementBlock в начало списка с помощью метода prepend()
}
//Функция добавления карточки места из формы
function addCardPopup(evt) {//принимает в параметры событие (нажатие submit)
    evt.preventDefault();//отключаем стандартное поведение для формы при событии
    const card = { name: placeInput.value, link: srcInput.value };// создаем константу card и помещаем туда функцию createCard с параметрами значений полей названия места и ссылки на изображение из формы (т.е. получаем готовую карточку)
    renderCard(card);//передаем готовуею карточку через константу в функцию renderCard
    closePopup(popupAddCard);// закрываем попап добавления карточки с помощью функции closePopup передав параметом константу содержащую попап добавления карточки
    placeInput.value = '';//очищаем поле названия в форме попапа
    srcInput.value = '';//очищаем поле ссылки в форме попапа
}
//функция закрытия попапа при нажатии кнопки ESC
function closePopupEsc(element, evt) { // передаем параметрами элемент (попап) и событие
    if (evt.key === 'Escape') { // если ключ события = клавиша Escape
        closePopup(element);// вызвать функцию закрытия попапа с параметром элемент (попап)
    }
}
//функция закрытия попапа при клике на фон с параметром событие
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {//если цель события и элемент на который навешивается слушатель события равны
        closePopup(evt.currentTarget);//вызвать функцию закрытия попапа с параметром элемент на который навешивается слушатель
    }
}
//для каждого элемента массива initialCards запускаем стрелочную функцию
initialCards.forEach((element) => {
    renderCard(element);// запускаем функцию renderCard с параметром объявленной константы (вставляем карточки в блок)
})
//создаем слушатель кнопки редактирования профиля, который при клике по ней вызывает стрелочную функцию
editButton.addEventListener('click', () => {
    openProfilePopup();
})
//для каждого элемента псевдомассива в константе closeButtons вызываем стрелочную функцию с параметром элемент(кнопка)
closeButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {//каждому элементу добавить слушатель клика, вызывающий стрелочную функцию с параметром события
        const popup = evt.target.closest('.popup');//объявляем константу popup и присваеваем ей значение ближайщего к цели события элемента с классом popup
        closePopup(popup);//закрываем попап функцией closePopup с параметром созданной константы (попап)
    });
});
formProfileElement.addEventListener('submit', submitProfileForm);//форме профиля добавляем слушатель на нажатие submit с функцией submitProfileForm
formElementCard.addEventListener('submit', addCardPopup);//форме добавления карточки добавляем слушатель на нажатие submit с функцией addCardPopup
addButton.addEventListener('click', () => {//кнопке добавления карточки добавляем слушатель на клик со стрелочной функцией
    openCardAddForm();//вызываем функцию openPopup открытия попапа, передав параметром форму добавления карточки
});
//добавляем попапам слушатель на событие клик и вызывающий функцию closePopupOverlay закрытия попапа при клике на фон
popupImage.addEventListener('click', closePopupOverlay);
popupProfile.addEventListener('click', closePopupOverlay);
popupAddCard.addEventListener('click', closePopupOverlay);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();