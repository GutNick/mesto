export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._config.inputSelector);
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._inputErrorClass = this._formElement.querySelector(this._config.inputErrorClass);
    }

    _handleFieldValidation(evt, inputErrorClass) {
        this._element = evt.target;
        const elementError = this._formElement.querySelector(`#${this._element.id}-error`);
        this._element.setCustomValidity('');
        this._element.classList.toggle(inputErrorClass, !this._element.validity.valid);
        elementError.textContent = this._element.validationMessage;
    }

    _setEventListener() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
            this._handleFieldValidation(evt, this._inputErrorClass);
            })
        });

        this._formElement.addEventListener('input', () => {
            this._handleFormInput();
        })
    }

   _handleFormInput() {
        this._toggleButton();
    }

    _toggleButton() {
        this._buttonElement.disabled = !this._formElement.checkValidity();
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListener();
    }

    resetValidation() {
    this._toggleButton();

    this._inputList.forEach((inputElement) => {
      inputElement.setCustomValidity('');
    });
  }
}
