import React from 'react';
import RecipeForm from './RecipeForm';
import RecipeStore from '../data/RecipeStore';
import { browserHistory } from 'react-router'

const store = new RecipeStore();

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false }
  }

  handleSubmit(recipe) {
    store.addRecipe(recipe);
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h2>Add New Recipe</h2>
          <RecipeForm
            submitText="Save Recipe"
            handleSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

export default CreateRecipe;

