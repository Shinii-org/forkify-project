import icons from '../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerRender(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    console.log(this._data);
    // current page : 1, others
    if (currentPage === 1 && currentPage < numPage) {
      return this._generateNextButton(currentPage + 1);
    }

    // current page: others
    if (currentPage > 1 && currentPage < numPage) {
      return (
        this._generateNextButton(currentPage + 1) +
        this._generatePreviousButton(currentPage - 1)
      );
    }
    // current page: last
    if (currentPage > 1 && currentPage === numPage) {
      return this._generatePreviousButton(currentPage - 1);
    }
    // current page : 1
    return '';
  }
  _generatePreviousButton(page) {
    return `

          <button data-goto ="${page}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
          </button>
          
    `;
  }
  _generateNextButton(page) {
    return `

          <button data-goto ="${page}" class="btn--inline pagination__btn--next">
            <span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 

    `;
  }
}

export default new paginationView();
