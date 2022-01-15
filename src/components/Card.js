export default class Card {
    constructor(myId, data, cardSelector, {handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike}) {
        this._data = data;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._myId = myId;
        this._like = data.likes;
        this._id = data._id;
        this._owner = data.owner;
        this._handleCardDelete = handleCardDelete;
        this._handleAddLike = handleAddLike;
        this._handleDeleteLike = handleDeleteLike;
    }

    handleToggleLike() {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleOpenBigImage() {
        this._handleCardClick(this._data.name, this._data.link)
    }

    handleCardRemove() {
        this._element.remove();
        this._element = null;
    }

    showLikeCounter(arr) {
      const counterLike = this._element.querySelector('.element__counter-like');
      counterLike.textContent = arr.length;
    }

    _handleShowLike() {
      const like = this._element.querySelector('.element__like');
      !like.classList.contains('element__like_active') ? this._handleAddLike() : this._handleDeleteLike();
    }


    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
          this._handleShowLike();
        });

        this._element.querySelector('.element__button-delete').addEventListener('click',() => {
          this._handleCardDelete(this._element);
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenBigImage(this._data.name, this._data.link);
        });
    }


    createCard() {
        this._element = this._cardSelector.content.cloneNode(true).children[0];

        const elementImage = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._data.name;
        elementImage.src = this._data.link;
        elementImage.alt = this._data.name;

        this._element.id = this._id;
        this._element.querySelector('.element__counter-like').textContent = `${this._like.length}`;

          if (this._like.find((like) => like._id === this._myId)) {
             this._element.querySelector('.element__like').classList.add('element__like_active');
          }

          if (this._owner._id === this._myId) {
             this._element.querySelector('.element__button-delete').style.display = 'block';
           } else {
             this._element.querySelector('.element__button-delete').style.display = 'none';
           }

        this._setEventListeners();

        return this._element;
    }
}
