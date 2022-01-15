import Popup from "./Popup.js"

export default class PopupWithDelete extends Popup {
    constructor(selectorPopup) {
      super(selectorPopup);
      this._buttonDelete = document.querySelector('.popup_deleteCard').querySelector('.popup__button');
    }

    setHandleSubmit(foo) {
      this._handleSubmit = foo;
    }

    setEventListeners() {
      this._buttonDelete.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.handleLoading('Удаление...');
        this._handleSubmit();
        this.close();
      });
      super.setEventListeners();
    }

    open() {
      super.open();
      this.handleLoading('Да');
    }
}
