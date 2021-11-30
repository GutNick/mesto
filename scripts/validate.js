//объявляем константу obj и присваевам ей объект со значениями классов форм
const obj = {
    formSelector: '.popup__form',//форма
    inputSelector: '.popup__input',//поле ввода
    submitButtonSelector: '.popup__button',//кнопка submit
    inactiveButtonClass: 'popup__button_disabled',//класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error',//класс поля ввода с ошибкой
    errorClass: 'popup__error_visible'//класс видимого поля ошибки
}

enableValidation(obj);//вызываем функцию enableValidation с параметром объекта obj
//функия enableValidation с параметром константы obj
function enableValidation(obj) {
    const forms = Array.from(document.querySelectorAll(obj.formSelector));//получаем псевдомассив форм - создаем на его основе массив - присваеваем полученный массив константе forms
    forms.forEach(form => addListenersToForm(form, obj)); // для каждого элемента массива forms вызываем функцию addListenersToForm с параметрами формы и объекта obj
}
//функия addListenersToForm с параметром form и объекта obj
function addListenersToForm(form, obj) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));//получаем псевдомассив полей ввода из переданной формы - создаем на его основе массив - присваеваем полученный массив константе inputs
    inputs.forEach(input => addListenersToInput(input, obj));//для каждого элемента массива inputs вызываем функцию addListenersToInput с параметрами элемента и объекта obj

    form.addEventListener('input', (evt) => handleFormInput(evt, obj));// для переданной формы добавляем слушатель на поле input с параметром событие вызывающий функцию handleFormInput с параметрами события и объекта obj
    toggleButton(form, obj);//вызов функции toggleButton с параметрами переданной формы и объекта obj
}
//функция handleFormInput с параметром события и объекта obj
function handleFormInput(evt, obj) {
    toggleButton(evt.currentTarget, obj);//вызов функции toggleButton с параметрами элемент на которое срабатывает слушатель (форма) и объекта obj
}
//функция переключения кнопки в форме с параметрами формы и объекта obj
function toggleButton(form, obj) {
    const button = form.querySelector(obj.submitButtonSelector); //константе button присваеваем элемент формы с классом popup__button (кнопку)
    const isFormInvalid = !form.checkValidity(); //константе isFormInvalid присваеваем булевое значение обратное валидности формы

    button.disabled = isFormInvalid;// основываясь на булевом значении isFormInvalid включаем или выключаем кнопку
    button.classList.toggle(obj.inactiveButtonClass, isFormInvalid);// если значение isFormInvalid true, то присваеваем кнопке класс popup__button_disabled, если false - убираем
}
// функция навешивания слушателя на переданное поле input c параметрами поля и объекта obj
function addListenersToInput(input, obj) {
    input.addEventListener('input', (evt) => handleFieldValidation(evt, obj)); // добавляем переданному полю слушатель по событию input (ввод текста) - вызвающий функцию handleFieldValidation с параметрами события и объекта obj
}
// функция handleFieldValidation с параметрами события и объекта obj
function handleFieldValidation(evt, obj) {
    const element = evt.target; // константе element присваеваем цель события
    const errorContainer = document.querySelector(`#${element.id}-error`);// находим блок отображения ошибки с id равным id поля input + -error и записываем в константу errorContainer
    element.classList.toggle( // если обратное булевое значение валидности поля в константе element true, то присваеваем полю input класс popup__input_type_error, если false - убираем
        obj.inputErrorClass,
        !element.validity.valid
    );

    errorContainer.textContent = element.validationMessage; // вставляем в блок отображения ошибки сообщение об ошибки поля input
}