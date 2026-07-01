import React from 'react';
import { recipeStore } from '../data/RecipeStore';

const styles = {
  ingredients: {
    'textAlign': 'left',
  },
  title: {
    padding: 0,
    margin: 0
  },
  list: {
    margin: 0,
  }
};

const Ingredients = (props) => {
  const ingredientNames = recipeStore.getIngredientList();
  return (
    <div style={styles.ingredients}>
      <h4 style={styles.title}>Ingredients</h4>
      <ul style={styles.list}>
        {props.ingredients.map(id => {
          const name = ingredientNames[id];
          return (
            <li key={id}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;
