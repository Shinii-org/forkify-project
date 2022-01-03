import previewViews from './previewViews';
import View from './View.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query! Please try again :)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewViews.render(bookmark, false))
      .join('');
  }
}
export default new ResultsView();
