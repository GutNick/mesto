import { initialCards } from "../utils/initialCards.js";// Импортируем массив с объектами карточек
const addButton = document.querySelector('.profile__add-button');// Находим кнопку добавить карточку и помещаем в константу addButton
const editButton = document.querySelector('.profile__edit-button');// Находим кнопку редактировать профиль и помещаем в константу editButton
const popupProfile = document.querySelector('.popup_type_profile');// Находим попап редактирования профиля и помещаем в константу popupProfile
const popupAddCard = document.querySelector('.popup_type_card-add');// Находим попап добавления карточек и помещаем в константу popupAddCard
const popupImage = document.querySelector('.popup_type_image');// Находим попап изображения карточки и помещаем в константу popupAddCard
const closeButtons = document.querySelectorAll('.popup__close');// Находим все кнопки закрыть попап в псевдомассив и помещаем их в константу closeButtons
const nameProfile = document.querySelector('.profile__name');// Находим Имя в карточке пользователя и помещаем его в константу nameProfile
const jobProfile = document.querySelector('.profile__job');// Находим Профессию в карточке пользователя и помещаем её в константу jobProfile
const formProfileElement = popupProfile.querySelector('.popup__form')// Находим форму в попапе редактирования профиля и помещаем её в константу formProfileElement
const formElementCard = popupAddCard.querySelector('.popup__form');// Находим форму в попапе добавления карточек и помещаем её в константу formElementCard
const nameInput = popupProfile.querySelector('#name-card');// находим input поле имени в попапе редактирования профиля и помещаем в константу nameInput
const jobInput = popupProfile.querySelector('#job');// находим input поле профессия в попапе редактирования профиля и помещаем в константу jobInput
const placeInput = formElementCard.querySelector('#place-name');// находим input поле названия места в попапе добавления карточек и помещаем в константу placeInput
const srcInput = formElementCard.querySelector('#place-url');// находим input поле ссылки на изображение в попапе добавления карточек и помещаем в константу srcInput
const elementBlock = document.querySelector('.elements');// находим контейнер для карточе и помещаем в константу elementBlock
const cardTemplate = document.querySelector('#card-template').content;// находим содержимое шаблона карточек с помощью .content и помещаем в константу cardTemplate
// Функция присвоения значениям полей имени и профессии попапа редактирования профиля содержимого блоков имени и профессии блока профиля
function insertProfileValues() {
    nameInput.value = nameProfile.textContent;// присвоение имени
    jobInput.value = jobProfile.textContent;// присвоение профессии
}
// функция открытия попап, получает параметр - элемент
function openPopup(element) {
    element.classList.add('popup_opened');// добавляет полученному элементу класс popup_opened
    document.addEventListener('keydown', (evt) => closePopupEsc(element, evt));//добавляем странице слушателя событий (нажатие клавишы, событие) - стрелочная функция - функция closePopupEsc с параметрами элемент и нажатая клавиша
}
// функция закрытия попап, получает параметр - элемент
function closePopup(element) {
    const form = element.querySelector('.popup__form');// находим форму закрываемого попапа и записываем в контсанту form
    if (form !== null) {// Если форма была найдена (не попап с изображением)
        form.reset();// обнуляем поля формы
        toggleButton(form, obj);// вызываем функцию toggleButton из валидатора с параметрам форма и константой массива объектов из валидатора
        const errorMessage = element.querySelectorAll('.error');// находим все блоки с классом error в псевдомассив и помещаем в константу errorMessage
        errorMessage.forEach((message) => { //для каждого элемента псевдомассива errorMessage (параметр message)
            message.textContent = '';// меняем текстовое содержимое элемента на пустую строку (чистим ошибки)
        })
    }
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

const handleLikeButton = (evt) => { // создаем константу handleLikeButton равную стрелочной функции с параметром событие
    evt.target.classList.toggle('elements__heart_active');// добавляем или убираем класс elements__heart_active из цели события
}
const handleTrashButton = (evt) => { // создаем константу handleTrashButton равную стрелочной функции с параметром событие
    const card = evt.target.closest('.elements__element'); // объявляем константу card равную ближайшему к цели события элементу с классом elements__element
    card.remove();//вызываем функцию remove к константе card (удаляем карточку)
}
//Функция открытия попапа с изображением принимающую событие как параметр
function handleImagePopup(evt) {
    const srcValue = evt.target.src;// получаем значение атрибута src цели события и присваеваем его константе srcValue
    const caption = evt.target.alt;// получаем значение атрибута alt цели события и присваеваем его константе caption
    const image = popupImage.querySelector('.popup__image');// находим блок с классом popup__image в попапе изображения и присваеваем его константе image
    image.src = srcValue;//атрибуту src элементу в константе image присваеваем полученное значение из атрибута src цели события через константу srcValue
    image.alt = caption;//атрибуту alt элементу в константе image присваеваем полученное значение из атрибута alt цели события через константу caption
    popupImage.querySelector('.popup__caption').textContent = caption;// находим текстовое содержимое блока с классом popup__caption в попапе изображения и присваеваем ему значение константы caption
    openPopup(popupImage);//запускаем функцию открытия попапа передав параметром константу с попапом изображения
}
//Функция создания карточки места, принимает параметрами два значения srcValue и titleValue
function createCard(srcValue, titleValue) {
    const cardElement = cardTemplate.cloneNode(true);//клонируем содержимое константы cardTemplate с дочерними элементами(true) и присваеваем полученный элемент константе cardElement
    const cardImage = cardElement.querySelector('.elements__image');//Находим в cardElement блок с классом elements__image и присваеваем блок константе cardImage
    cardImage.src = srcValue;//атрибуту src элементу в константе cardImage присваеваем полученное значение из атрибута src элемента переданного через параметр srcValue
    cardImage.alt = titleValue;//атрибуту alt элементу в константе cardImage присваеваем полученное значение из атрибута alt элемента переданного через параметр titleValue
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
    const card = createCard(srcInput.value, placeInput.value);
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