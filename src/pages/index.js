import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from "../components/PopupWithDelete";
import Api from "../components/Api";
import {
  config,
  buttonOpenPopupProfile,
  templateElement,
  imgPopup,
  titlePopup,
  elementAddButton,
  formPopupProfile,
  formPopupAddElement,
  inputList,
  buttonOpenChangeAvatar,
  formPopupAvatar
} from '../utils/constants.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-33',
  headers: {
    authorization: 'ee287f3d-6dbe-4e30-b60a-0b97ee125818',
    'Content-Type': 'application/json'
  }
});


const popupWithDelete = new PopupWithDelete('.popup_deleteCard');
const popupBigImage = new PopupWithImage(imgPopup, titlePopup, '.popup_image');
function createdCard(item) {
  const card = new Card("f388b4796b25930c3825cd3c", item, templateElement,
    {
      handleCardClick: () => {
        popupBigImage.open(item.name, item.link);
      },
      handleCardDelete: () => {
          popupWithDelete.open();
          popupWithDelete.setHandleSubmit(function(){
            api.deleteCard(card._id);
            card.handleCardRemove();
          })
      },

      handleAddLike: () => {
        api.setLike(item._id)
          .then((item) => {
            card.showLikeCounter(item.likes);
            card.handleToggleLike();
          })
          .catch((err) => {
            alert(`Ошибка: ${err}`)
          })
      },

      handleDeleteLike: () => {
        api.deleteLike(item._id)
          .then((item) => {
            card.showLikeCounter(item.likes);
            card.handleToggleLike();
          })
          .catch((err) => {
            alert(`Ошибка: ${err}`)
          })
      }
    });
  return card.createCard();
}

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createdCard(item))
  }
},'.elements');

api.getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    alert(`Ошибка: ${err}`)
  });

const popupWithFormAddElement = new PopupWithForm('.popup_element',
  {submitRenderer: () => {
      const inputValue = popupWithFormAddElement.getInputValues();
      api.setCard(inputValue)
        .then((item) => {
          cardList.addItem(createdCard(item));
        })
        .catch((err) => {
          alert(`Ошибка: ${err}`)
        })
      popupWithFormAddElement.close();
    }})

const userInfo = new UserInfo({
  name:'.profile__name',
  about:'.profile__description',
  avatar: '.popup_avatar'
})

const popupWithFormProfile = new PopupWithForm('.popup_profile',
  {submitRenderer: () => {
      const inputValue = popupWithFormProfile.getInputValues();
      api.setUserInfo(inputValue)
         .then((data) => {
         userInfo.setUserInfo(data);
       })
        .catch((err) => {
          alert(`Ошибка: ${err}`)
        })
      popupWithFormProfile.close();
    }
  })

const popupAvatar = new PopupWithForm('.popup_avatar',
  {submitRenderer: () => {
    const inputValue = popupAvatar.getInputValues();
    api.changeAvatar(inputValue)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {
        alert(`Ошибка: ${err}`)
      })
      popupAvatar.close();
  }
})



buttonOpenChangeAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

buttonOpenPopupProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputList.forEach((input) => {
    input.value = userData.name
    if(input.name === 'userJob') {
      input.value = userData.about
    }
  });
  validationFormProfile.resetValidation();
  popupWithFormProfile.open();
});

popupWithFormProfile.setEventListeners();
popupWithFormAddElement.setEventListeners();
popupBigImage.setEventListeners();
popupAvatar.setEventListeners();
popupWithDelete.setEventListeners();
cardList.renderItems();


const validationFormProfile = new FormValidator(config, formPopupProfile);
validationFormProfile.enableValidation();

const validationFormAddElement = new FormValidator(config, formPopupAddElement);
validationFormAddElement.enableValidation();

const validationFormAvatar = new FormValidator(config, formPopupAvatar);
validationFormAvatar.enableValidation();

elementAddButton.addEventListener('click', () => {
  validationFormAddElement.resetValidation();
  popupWithFormAddElement.open();
});
