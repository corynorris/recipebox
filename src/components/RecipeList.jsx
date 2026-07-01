import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { recipeStore } from "../data/RecipeStore.js";
import GridLayout from "./GridLayout";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRecipes(recipeStore.getRecipes());
  }, []);

  const handleUpdateRating = (recipeId, rating) => {
    recipeStore.updateRating(recipeId, rating);
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (search.length === 0) {
      return true;
    }
    const ingredients = recipeStore.getIngredientNames(recipe.ingredients);
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].indexOf(search) >= 0) {
        return true;
      }
    }
    return false;
  });

  const cards = filteredRecipes.map((recipe, idx) => (
    <Link key={idx} to={"/recipebox/recipe/view/" + recipe.id}>
      <RecipeCard
        recipe={recipe}
        updateRating={(rating) => handleUpdateRating(recipe.id, rating)}
      />
    </Link>
  ));

  return (
    <div>
      <div className="searchBar">
        <span className="fa fa-search" />
        <input
          className="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Ingredients"
        />
      </div>
      <GridLayout items={cards} columns={3} />
    </div>
  );
};

export default RecipeList;
