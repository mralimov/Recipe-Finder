import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes were found. Please try again';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
    console.log(this._data);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map((result) => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();
