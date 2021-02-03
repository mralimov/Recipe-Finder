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

    state.search.results = allRecipe.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    console.error(`This is loadRecipe ${err}`);
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
