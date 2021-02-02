class SearchView {
  #parentEL = document.querySelector('.search');

  //method to get query input value
  getQuery() {
    const query = this.#parentEL.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEL.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEL.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
