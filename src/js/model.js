import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

//state contains all data about application
export const state = {
  recipe: {},
  search: {
    //search query for todo analytics to know which query was made the most
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // const res = await fetch(`${API_URL}/${id}`);

    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      soureUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`This is loadRecipe ${err}`);
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const allRecipe = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = allRecipe.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    //When ever u do new search in middle of pages it will get back to page 1
    state.search.page = 1;
  } catch (err) {
    console.error(`This is loadRecipe ${err}`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQuantity = oldQuantity * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
};
