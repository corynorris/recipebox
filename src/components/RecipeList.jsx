import React from 'react';
import Recipe from './Recipe'
import RecipeStore from '../data/RecipeStore.js';

const store = new RecipeStore();

class RecipeList extends React.Component {
  componentWillMount() {
    console.log('mounting');
    this.setState({
      recipes: store.getRecipes(),
    })
  }
  render() {
    let cards = this.state.recipes.map((recipe, idx) => {
      return (
        <div key={idx} className="col-4" >
          <Recipe recipe={recipe} />
        </div>
      )
    })

    let rows = [];
    let group = [];
    for (let i = 0; i < cards.length; i++) {
      if (i % 3 === 0) {
        rows.push(<div key={i} className="row">{group}</div>);
        group = [];
      }
      group.push(cards[i]);
    }
    rows.push(<div key={cards.length} className="row">{group}</div>);


    return <div>{rows}</div>
  }
}

export default RecipeList;

