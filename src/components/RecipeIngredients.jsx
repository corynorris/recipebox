import React from 'react';

const options = [{
    "id": 1,
    "name": "cream cheese"
}, {
    "id": 2,
    "name": "sugar"
}, {
    "id": 3,
    "name": "quality sausage meat"
}, {
    "id": 4,
    "name": "fresh parsley"
}, {
    "id": 5,
    "name": "wonton wrappers"
}, {
    "id": 6,
    "name": "ground pork"
}];

const styles = {
    ingredients: {
      'textAlign': 'left',
    },
    title: {
      padding: 0,
      margin: 0
    }
}

let Ingredients = function(props) {
  return (
    <div style={styles.ingredients}>
    <h3 style={styles.title}>Ingredients</h3>
      <ul>
        {props.ingredients.map(ingredient => {
          const name = options[ingredient.ingredient_id-1].name;
          return (
            <li key={ingredient.ingredient_id}>
              {name}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Ingredients;
