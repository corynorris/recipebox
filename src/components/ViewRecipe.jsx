import React from 'react';
import RecipeStore from '../data/RecipeStore.js';

const store = new RecipeStore();

class ViewRecipe extends React.Component {

  componentWillMount() {
    let test = store.getRecipe(this.props.params.recipeId);
    this.setState({
      recipe: test
    })
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-7" style={{ position: "relative" }}>
            <h2 className="title" style={{ background: "rgba(52,99,146,1)", color: "white", width: "100%", "text-align": "center", "padding": "10px" }}>
              {this.state.recipe.name}
            </h2>
            <img src={this.state.recipe.image} style={{ width: "100%", border: "2px solid rgb(52,99,146)" }} />
          </div>
          <div className="col-5">
            <hr />
            <h4>Ingredients</h4>
            <ul>
              {this.state.recipe.ingredients.map((ingredient) => {
                return <li>{ingredient}</li>
              })}
            </ul>
            <hr />
            <h4>Description</h4>
            <p className="description">
              {this.state.recipe.description}
            </p>
            <hr />

          </div>
        </div>
      </div >
    );
  }
}

export default ViewRecipe;