import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numberPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numberPage);
    const nextPageButton = ` <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
<span>Page ${currentPage + 1}</span>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>
</button>`;

    const previousePageButton = ` <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${currentPage - 1}</span>
</button>`;

    //Page 1 there are  other pages
    if (currentPage === 1 && numberPage > 1) {
      return nextPageButton;
    }

    //Last Page  there is only previouse page button
    if (currentPage === numberPage && numberPage > 1) {
      return previousePageButton;
    }

    //Page 2 and others there is next and previous page
    if (currentPage < numberPage) {
      return nextPageButton, previousePageButton;
    }

    //Page 1 there is no other pages

    return ``;
  }
}

export default new PaginationView();
