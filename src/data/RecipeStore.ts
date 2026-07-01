import type { MappedRecipe, Recipe } from "../types";
import Store from "./Store";
import defaultData from "./recipes.json";

const APP_STORAGE_KEY = "recipebox";

interface AppData {
  ingredients: string[];
  recipes: Recipe[];
  units?: string[];
}

class RecipeStore {
  private store: Store<AppData>;
  private data: AppData;

  constructor() {
    this.store = new Store<AppData>(APP_STORAGE_KEY, defaultData);
    const stored = this.store.get();
    this.data = stored ?? { ingredients: [], recipes: [] };
    this.data.ingredients = this.data.ingredients || [];
    this.data.recipes = this.data.recipes || [];
  }

  private save(): void {
    this.store.set(this.data);
  }

  getRecipes(): MappedRecipe[] {
    const stored = this.store.get();
    this.data = stored ?? { ingredients: [], recipes: [] };
    return (this.data.recipes || []).map((r) => this.mapRecipe(r));
  }

  getRecipe(id: number | string): MappedRecipe | null {
    const recipes = this.data.recipes || [];
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].id === Number(id)) {
        return this.mapRecipe(recipes[i]);
      }
    }
    return null;
  }

  private unMapRecipe(recipe: MappedRecipe): Recipe {
    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      rating: recipe.rating,
      ingredients: this.addIngredients(recipe.ingredients),
    };
  }

  private mapRecipe(recipe: Recipe): MappedRecipe {
    return {
      ...recipe,
      ingredients: this.getIngredientNames(recipe.ingredients),
    };
  }

  private getIndexById(id: number): number {
    for (let i = 0; i < this.data.recipes.length; i++) {
      if (this.data.recipes[i].id === Number(id)) {
        return i;
      }
    }
    return -1;
  }

  private generateSafeId(): number {
    const ids = this.data.recipes.map((recipe) => recipe.id);
    if (ids.length === 0) {
      return 0;
    }
    return Math.max(...ids) + 1;
  }

  delete(recipe: MappedRecipe): void {
    const idx = this.getIndexById(recipe.id);
    if (idx !== -1) {
      this.data.recipes.splice(idx, 1);
      this.save();
    }
  }

  updateRating(id: number, rating: number): void {
    const idx = this.getIndexById(id);
    this.data.recipes[idx].rating = rating;
    this.save();
  }

  updateRecipe(recipe: MappedRecipe): void {
    const newRecipe = this.unMapRecipe(recipe);
    const idx = this.getIndexById(newRecipe.id);
    this.data.recipes[idx] = newRecipe;
    this.save();
  }

  addRecipe(recipe: MappedRecipe): void {
    const stored: Recipe = {
      id: this.generateSafeId(),
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      rating: recipe.rating,
      ingredients: [],
    };
    stored.ingredients = this.addIngredients(recipe.ingredients);
    this.data.recipes.push(stored);
    this.save();
  }

  getIngredientList(): string[] {
    const stored = this.store.get();
    this.data = stored ?? { ingredients: [], recipes: [] };
    return this.data.ingredients || [];
  }

  getIngredientName(ingredientId: number): string | null {
    const ingredients = this.getIngredientList();
    if (typeof ingredients[ingredientId] === "string") {
      return ingredients[ingredientId];
    }
    return null;
  }

  getIngredientNames(ingredientIds: number[]): string[] {
    const ingredientNames: string[] = [];
    for (let i = 0; i < ingredientIds.length; i++) {
      const name = this.getIngredientName(ingredientIds[i]);
      if (name !== null) {
        ingredientNames.push(name);
      }
    }
    return ingredientNames;
  }

  private addIngredient(ingredient: string): number {
    const index = this.getIngredientList().indexOf(ingredient);
    const length = this.data.ingredients.length;
    if (index >= 0) {
      return index;
    }
    this.data.ingredients.push(ingredient);
    this.save();
    return length;
  }

  addIngredients(ingredients: string[]): number[] {
    const ingredientIds = new Set<number>();
    for (let i = 0; i < ingredients.length; i++) {
      const id = this.addIngredient(ingredients[i]);
      ingredientIds.add(id);
    }
    return Array.from(ingredientIds);
  }
}

export const recipeStore = new RecipeStore();
export default RecipeStore;
