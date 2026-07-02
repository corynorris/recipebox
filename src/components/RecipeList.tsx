import { useState } from "react";
import { Link } from "react-router-dom";
import type { MappedRecipe } from "../types";
import { recipeStore } from "../data/RecipeStore";
import GridLayout from "./GridLayout";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
	const [recipes] = useState<MappedRecipe[]>(recipeStore.getRecipes());
	const [search, setSearch] = useState("");
	const handleUpdateRating = (recipeId: number, rating: number) => {
		recipeStore.updateRating(recipeId, rating);
	};

	const filteredRecipes = recipes.filter((recipe) => {
		if (search.length === 0) {
			return true;
		}
		for (let i = 0; i < recipe.ingredients.length; i++) {
			if (recipe.ingredients[i].indexOf(search) >= 0) {
				return true;
			}
		}
		return false;
	});

	const cards = filteredRecipes.map((recipe) => (
		<Link
			key={recipe.id}
			to={`/recipebox/recipe/view/${recipe.id}`}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			<RecipeCard
				recipe={recipe}
				updateRating={(rating: number) => handleUpdateRating(recipe.id, rating)}
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
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search Ingredients"
				/>
			</div>
			<GridLayout items={cards} columns={3} />
		</div>
	);
};

export default RecipeList;
