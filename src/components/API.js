export default class Api {
    constructor({ url, headers}) {
        this._url = url;
        this._headers = headers;
    }

    _handleRes(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._handleRes)
    }

    setUserInfo(profile) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: profile.userName,
                    about: profile.userJob
                })
            }
        )
            .then(this._handleRes)
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatar.avatar
                })
            }
        )
            .then(this._handleRes)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._handleRes)
    }

    getAllData() {
        return Promise.all([this.getProfile(), this.getInitialCards()])
    }



    setCard(card) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: card.elementName,
                    link: card.link
                })
            }
        )
            .then(this._handleRes)
    }

    setLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            }
        )
            .then(this._handleRes)
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            }
        )
            .then(this._handleRes)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            }
        )
            .then(this._handleRes)
    }
}