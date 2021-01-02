import React from 'react';
import RecipeStore from '../data/RecipeStore.js';
import { Link, browserHistory } from 'react-router';
const store = new RecipeStore();

class ViewRecipe extends React.Component {

  componentWillMount() {
    let recipe = store.getRecipe(this.props.params.recipeId);
    this.setState({
      recipe: recipe
    })
  }

  delete() {
    store.delete(this.state.recipe);
    browserHistory.push('/');
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-6" style={{ position: "relative" }}>
            <h2 className="title" style={{ background: "rgb(52,99,146)", color: "white", width: "100%", textAlign: "center", "padding": "8px" }}>
              {this.state.recipe.name}
            </h2>
            <img src={process.env.PUBLIC_URL + this.state.recipe.image} role="presentation" style={{ width: "100%", border: "2px solid rgb(52,99,146)" }} />
          </div>
          <div className="col-5">

            <hr />
            <h4>Ingredients</h4>
            <ul>
              {this.state.recipe.ingredients.map((ingredient, idx) => {
                return <li key={idx}>{ingredient}</li>
              })}
            </ul>
            <hr />
            <h4>Description</h4>
            <p className="description">
              {this.state.recipe.description}
            </p>
            <hr />
            <div className="options" style={{ float: "right" }} >
              <Link className="actions" to={'/recipe/edit/' + this.state.recipe.id} style={{ display: "inline-block" }}>
                <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
              </Link>
              <div onClick={this.delete.bind(this)} style={{ display: "inline-block", marginLeft: "5px" }} >
                <i className="fa fa-times fa-2x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default ViewRecipe;