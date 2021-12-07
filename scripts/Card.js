import { openPopup, popupImage } from './index.js';
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
export class Card {
    constructor(data, template) {
        this._title = data.name;
        this._link = data.link;
        this._template = template;
    }
    _handleLikeButton(evt) {
        evt.target.classList.toggle('elements__heart_active');
    }
    _handleTrashButton(evt) {
        evt.target.closest('.elements__element').remove();
    }
    _handleImagePopup(evt) {
        image.src = evt.target.src;
        image.alt = evt.target.alt;
        caption.textContent = evt.target.alt;
        openPopup(popupImage);
    }
    _setEventListeners() {
        this._card.querySelector('.elements__heart').addEventListener('click', this._handleLikeButton);
        this._card.querySelector('.elements__trash').addEventListener('click', this._handleTrashButton);
        this._cardImage.addEventListener('click', this._handleImagePopup);
    }
    createCard() {
        this._card = this._template.cloneNode(true);
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._card.querySelector('.elements__title').textContent = this._title;
        this._setEventListeners();
        return this._card
    }
}
