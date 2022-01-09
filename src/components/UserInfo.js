export default class UserInfo {
    constructor({name, job}) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
      this._dataUser = {};
      this._dataUser.userName = this._name.textContent;
      this._dataUser.userJob = this._job.textContent;

      return this._dataUser;
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}
