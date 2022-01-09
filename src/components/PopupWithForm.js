import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, {submitRenderer}) {
        super(selectorPopup);
        this._submitRenderer = submitRenderer;
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formPopup =  this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
      this._formValues = {};
      this._inputList.forEach(input => this._formValues[input.name] = input.value);

      return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitRenderer(this._getInputValues());
        });
    }

    close() {
        this._formPopup.reset();
        super.close();
    }
}
