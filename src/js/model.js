import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}}`);

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
