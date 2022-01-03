import * as model from './model.js';
import { CLOSE_WINDOW_SEC } from './configs.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/ResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// import icons from '../img/icons.svg'; // Parcel 1

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // 0. Update results view to mark selected search result
    ResultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);
    // 1. Loading recipe

    await model.loadRecipe(id);

    // 2. Rendering recipe
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);
  } catch (err) {
    // console.error(err);
    console.error(err);
    return recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);
    ResultsView.renderSpinner();
    // 1. Loading search results
    await model.loadSearchResults(query);

    // Get currentPage
    const curDataPage = model.getSearchResultsPage();
    console.log(curDataPage);

    // 2. Rendering search results
    ResultsView.render(curDataPage);

    // 3. Render button on each page
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  model.updateIngredients(newServings);

  recipeView.update(model.state.recipe);
  console.log(model.state.recipe);
};

const controlAddBookmarks = function () {
  //1 . Add / Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2. Update recipe view

  recipeView.update(model.state.recipe);

  // 3. Render bookmarks view
  bookmarksView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    // Render recipe

    recipeView.render(model.state.recipe);
    // Success message
    addRecipeView.renderMessage();

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.key}`);
    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, CLOSE_WINDOW_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(
      'Wrong ingredients format! Please check again and fill in the correct format :)'
    );
  }
};
const newFeature = function () {
  console.log('Welcome to the application');
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);

  newFeature();
};
init();
