import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._buttonDelete = this._popup.querySelector('.popup__button');
    }

    setHandleSubmit(newHandler) {
        this._handleSubmit = newHandler;
    }

    setEventListeners() {
        this._buttonDelete.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleLoading('Удаление...');
            this._handleSubmit();
        });
        super.setEventListeners();
    }
}