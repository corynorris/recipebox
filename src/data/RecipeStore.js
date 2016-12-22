import Store from './Store';
const defaultData = require('./recipes.json');

const APP_STORAGE_KEY = "recipebox";

export default class RecipeStore {
  constructor() {
    this.store = new Store(APP_STORAGE_KEY, defaultData);
    this.data = this.store.get() || {};
    this.data.ingredients = this.data.ingredients || [];
    this.data.recipes = this.data.recipes || [];
  }

  save() {
    this.store.set(this.data);
  }

  getRecipes() {
    console.log('getting recipes', this.data.recipes);

    return this.data.recipes || [];
  }

  getRecipe(i) {
    const recipes = this.getRecipes();
    if (typeof recipes[i] === 'object') {
      return recipes[i];
    }
    return null;
  }

  addRecipe(recipe) {
    recipe.ingredients = this.addIngredients(recipe.ingredients);
    this.data.recipes.push(recipe);
    console.log('added recipe', this.data.recipes)
    this.save();
  }

  getIngredients() {
    return this.data.ingredients || [];
  }

  getIngredient(i) {
    const ingredients = this.getIngredients();
    if (typeof ingredients[i] === 'object') {
      return ingredients[i];
    }
    return null;
  }

  addIngredient(ingredient) {
    const index = this.getIngredients().indexOf(ingredient)
    const length = this.data.ingredients.length;
    if (index > 0) {
      return index;
    }
    this.data.ingredients.push(ingredient);
    this.save();
    return length;
  }

  addIngredients(ingredients) {
    let ingredientIds = new Set();
    for (let i = 0; i < ingredients.length; i++) {
      let id = this.addIngredient(ingredients[i])
      ingredientIds.add(id);
    }
    return Array.from(ingredientIds);
  }
}
