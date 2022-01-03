class searchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const value = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return value;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
