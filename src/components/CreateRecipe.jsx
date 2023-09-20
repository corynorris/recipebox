import React from 'react';
import RecipeStore from '../data/RecipeStore';
import RecipeForm from './RecipeForm';

const store = new RecipeStore();

class CreateRecipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recipe: {}
    }
  }

  handleSubmit(recipe) {
    store.addRecipe(recipe);
    BrowserRouter.push(import.meta.env.BASE_URL);
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <p>Add a new recipe</p>
          <RecipeForm
            submitText="Add Recipe"
            recipe={this.state.recipe}
            handleSubmit={this.handleSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

export default CreateRecipe;

