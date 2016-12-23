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
    this.data = this.store.get() || {};
    return this.data.recipes || [];
  }

  getRecipe(i) {
    const recipes = this.getRecipes();
    if (typeof recipes[i] !== 'object') {
      return null;
    }
    return this.mapRecipe(recipes[i]);
  }

  unMapRecipe(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      rating: recipe.rating,
      ingredients: this.addIngredients(recipe.ingredients)
    }
  }

  mapRecipe(recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      rating: recipe.rating,
      ingredients: this.getIngredientNames(recipe.ingredients)
    }
  }

  updateRecipe(recipe) {
    const newRecipe = this.unMapRecipe(recipe);
    this.data.recipes[recipe.id] = newRecipe;
    console.log(this.data.recipes);
    this.save();
  }

  addRecipe(recipe) {
    recipe.id = this.data.recipes.length;
    recipe.ingredients = this.addIngredients(recipe.ingredients);
    this.data.recipes.push(recipe);
    this.save();
  }

  getIngredientList() {
    this.data = this.store.get() || {};
    return this.data.ingredients || [];
  }

  getIngredientName(ingredientId) {
    const ingredients = this.getIngredientList();
    if (typeof ingredients[ingredientId] === 'string') {
      return ingredients[ingredientId];
    }
    return null;
  }

  getIngredientNames(ingredientIds) {
    let ingredientNames = [];
    for (let i = 0; i < ingredientIds.length; i++) {
      ingredientNames.push(
        this.getIngredientName(i)
      )
    }
    return ingredientNames;
  }

  addIngredient(ingredient) {
    const index = this.getIngredientList().indexOf(ingredient)
    const length = this.data.ingredients.length;
    if (index >= 0) {
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
