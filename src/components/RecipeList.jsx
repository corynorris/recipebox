import React from 'react';
import RecipeCard from './RecipeCard'
import RecipeStore from '../data/RecipeStore.js';
import GridLayout from './GridLayout'

const store = new RecipeStore();

class RecipeList extends React.Component {
  componentWillMount() {
    let recipes = store.getRecipes();
    this.setState({
      recipes: recipes,
    })
  }
  render() {
    let cards = this.state.recipes.map((recipe, idx) =>
      <RecipeCard key={idx} recipe={recipe} />
    )

    return <GridLayout items={cards} columns={3} />
  }
}

export default RecipeList;

