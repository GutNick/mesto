import { openPopup, popupImage } from './index.js';
export class Card {
    static _template = document.querySelector('#card-template').content;
    constructor(data) {
        this._title = data.name;
        this._link = data.link;
    }
    _handleLikeButton(evt) {
        evt.target.classList.toggle('elements__heart_active');
    }
    _handleTrashButton(evt) {
        evt.target.closest('.elements__element').remove();
    }
    _handleImagePopup(evt) {
        this._image = document.querySelector('.popup__image');
        this._image.src = evt.target.src;
        this._image.alt = evt.target.alt;
        document.querySelector('.popup__caption').textContent = evt.target.alt;
        openPopup(popupImage);
    }
    _setEventListeners() {
        this._card.querySelector('.elements__heart').addEventListener('click', this._handleLikeButton);
        this._card.querySelector('.elements__trash').addEventListener('click', this._handleTrashButton);
        this._card.querySelector('.elements__image').addEventListener('click', this._handleImagePopup);
    }
    createCard() {
        this._card = Card._template.cloneNode(true);
        this._card.querySelector('.elements__image').src = this._link;
        this._card.querySelector('.elements__image').alt = this._title;
        this._card.querySelector('.elements__title').textContent = this._title;
        this._setEventListeners();
        return this._card
    }
}
