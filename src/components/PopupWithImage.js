import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(imgPopup, titlePopup, selectorPopup) {
        super(selectorPopup);
        this._imgPopup = imgPopup;
        this._titlePopup = titlePopup;
    }

    open(name, link) {
        this._imgPopup.src = link;
        this._imgPopup.alt = name;
        this._titlePopup.textContent = name;
        super.open();
    }
}
