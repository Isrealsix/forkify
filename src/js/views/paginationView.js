import View from './Views.js';
import icons from 'url:../../img/icons.svg';
import { state } from '../model';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkupButton(type, currentPage) {
    // next
    const nxt = currentPage + 1;
    const prv = currentPage - 1;
    if (type === 'next') {
      return `
        <button data-goto="${nxt}" class="btn--inline pagination__btn--next">
          <span>Page ${nxt}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button> 
        `;
    }

    // prev
    if (type === 'prev') {
      return `
        <button data-goto="${prv}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${prv}</span>
        </button>
      `;
    }

    // next && prev
    return `
      <button data-goto="${prv}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prv}</span>
      </button>

    <button data-goto="${nxt}" class="btn--inline pagination__btn--next">
      <span>Page ${nxt}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> 
    `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resPerPage
    );
    console.log(numPages);
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', currentPage);
    }

    // Current page & Other pages
    if (currentPage < numPages) {
      return this._generateMarkupButton(null, currentPage);
    }

    // Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();
