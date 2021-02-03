import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView';
import ResultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

//This is coming from Parcel
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    //1) Loading Spinner
    await model.loadRecipe(id);

    //2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    //1) Get search Query
    const query = searchView.getQuery();
    if (!query) return;

    //2) loadsearchResults
    await model.loadSearchResults(query);

    //3) Render results
    ResultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
