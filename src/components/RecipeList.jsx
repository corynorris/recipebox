import React from 'react';
import Recipe from './Recipe'
import { Link } from 'react-router';
import Store from '../data/Store.js';
import defaultData from '../data/recipes.json';

const RecipeStoreKey = "recipe_store";
const RecipeStore = new Store(RecipeStoreKey, defaultData);

const styles = {
    recipe: {
        width: '33%',
        float: 'left',
        padding: '1rem'
    },
}

class RecipeList extends React.Component {
  componentWillMount() {
    const data = RecipeStore.get();
    this.setState({
      recipes: data.recipes,
    })
  }
  render() {
    return (
      <div className="recipeList">
          {this.state.recipes.map(recipe => {
            return (
              <div key={recipe.id} style={styles.recipe}>
                <Recipe recipe={recipe} />
              </div>
            )
          })}
      </div>
    );
  }
}

export default RecipeList;

