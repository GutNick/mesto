export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
      for (let i in items) {
        this._renderer(items[i]);
      }
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
