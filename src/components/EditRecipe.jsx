import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import RecipeStore from '../data/RecipeStore';
import RecipeForm from './RecipeForm';

const store = new RecipeStore();

const EditRecipe = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  let recipe = store.getRecipe(recipeId)
  
  const updateRecipe = () => {
    store.updateRecipe(recipe);
    navigate(import.meta.env.BASE_URL);
  };

  return (
    <div className="row">
      <div className="col-12">
        <p>Update your recipe</p>
        <RecipeForm
          recipe={recipe}
          submitText="Save Changes"
          handleSubmit={updateRecipe} />
      </div>
    </div>
  );
  
}

export default EditRecipe;

