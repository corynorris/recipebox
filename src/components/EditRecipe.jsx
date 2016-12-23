import React from 'react';
import RecipeForm from './RecipeForm';
import RecipeStore from '../data/RecipeStore';
import { browserHistory } from 'react-router'

const store = new RecipeStore();

class EditRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recipe: store.getRecipe(this.props.params.recipeId)
    }
  }

  handleSubmit(recipe) {
    store.updateRecipe(recipe);
    browserHistory.push('/');
  }

  render() {

    return (
      <div className="row">
        <div className="col-12">
          <p>Update your recipe</p>
          <RecipeForm
            recipe={this.state.recipe}
            submitText="Save Changes"
            handleSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

export default EditRecipe;

