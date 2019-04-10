import React from "react";
import RecipeCard from "./RecipeCard";
import RecipeStore from "../data/RecipeStore.js";
import GridLayout from "./GridLayout";
import { Link } from "react-router";

const store = new RecipeStore();

class RecipeList extends React.Component {
  componentWillMount() {
    let recipes = store.getRecipes();
    this.setState({
      recipes: recipes,
      search: ""
    });
  }

  delete(recipe) {
    store.delete(recipe);
  }

  updateRating(rating) {
    store.updateRating(this.id, rating);
  }

  render() {
    let filteredRecipes = this.state.recipes.filter(recipe => {
      if (this.state.search.length === 0) {
        return true;
      }
      let ingredients = store.getIngredientNames(recipe.ingredients);
      for (var i = 0; i < ingredients.length; i++) {
        if (ingredients[i].indexOf(this.state.search) >= 0) {
          return true;
        }
      }
      return false;
    });

    console.log(filteredRecipes);
    let cards = filteredRecipes.map((recipe, idx) => (
      <Link to={"/recipe/view/" + recipe.id}>
        <RecipeCard
          key={idx}
          recipe={recipe}
          updateRating={this.updateRating.bind(recipe)}
        />
      </Link>
    ));

    return (
      <div>
        <div className="searchBar">
          <span className="fa fa-search" />
          <input
            className="search"
            value={this.state.search}
            onChange={e => this.setState({ search: e.target.value })}
            placeholder="Search Ingredients"
          />
        </div>
        <GridLayout items={cards} columns={3} />
      </div>
    );
  }
}

export default RecipeList;
