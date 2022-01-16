export default class UserInfo {
    constructor({name, about, avatar, _id}) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
        this._id = _id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
        this._id = data._id;
    }
}