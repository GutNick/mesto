const obj = {
    formSelector: '.popup__form',//форма
    inputSelector: '.popup__input',//поле ввода
    submitButtonSelector: '.popup__button',//кнопка submit
    inactiveButtonClass: 'popup__button_disabled',//класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error',//класс поля ввода с ошибкой
}

export class FormValidator {
    constructor(obj, form) {
        this._formSelector = obj.formSelector;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._form = form
        this._inputs = Array.from(this._form.querySelectorAll(this._formSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
    }

    _handleFieldValidation(evt) {
        this._element = evt.target;
        this._errorContainer = this._form.querySelector(`#${this._element.id}-error`);
        this._element.classList.toggle(
            this._inputErrorClass,
            !this._element.validity.valid
        );

        this._errorContainer.textContent = this._element.validationMessage;
    }

    _toggleButton() {
        this._isFormInvalid = !this._form.checkValidity();
        this._button.disabled = this._isFormInvalid;
        this._button.classList.toggle(this._inactiveButtonClass, this._isFormInvalid);
    }

    _addListenersToInput() {
        this._inputSelector.addEventListener("input", (evt) => this._handleFieldValidation(evt));
    }

    _hideError() {
        this._inputSelector.classList.remove(this._inputErrorClass);
        this._errorContainer = this._form.querySelector(`#${this._inputSelector.id}-error`);
        this._errorContainer.textContent = '';
    }

    enableValidation = () => {
        this._inputs.forEach((input) => this._addListenersToInput(input));
        this._form.addEventListener("input", () => this._toggleButton());
        this._toggleButton();
    };
    resetValidation() {
        this._toggleButton();
        this._inputs.forEach((input) => this._hideError(input));
    }
}