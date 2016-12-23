import React from 'react';
import RecipeCard from './RecipeCard'
import RecipeStore from '../data/RecipeStore.js';
import GridLayout from './GridLayout'
import { Link } from 'react-router'

const store = new RecipeStore();

class RecipeList extends React.Component {
  componentWillMount() {
    let recipes = store.getRecipes();
    this.setState({
      recipes: recipes
    })
  }

  handleClick(e) {

  }

  updateRating(rating) {
    this.rating = rating;
    store.updateRecipe(this);
  }

  render() {
    let cards = this.state.recipes.map((recipe, idx) =>
      <Link to={"/recipe/edit/" + idx} >
        <div onClick={this.handleClick.bind(this)}>
          <RecipeCard
            key={idx}
            recipe={recipe}
            updateRating={this.updateRating.bind(recipe)} />
        </div>
      </Link >
    )

    return <GridLayout items={cards} columns={3} />
  }
}

export default RecipeList;

