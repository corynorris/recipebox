import React from 'react';
import { useNavigate } from "react-router-dom";
import { recipeStore } from '../data/RecipeStore';
import RecipeForm from './RecipeForm';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const recipe = {};

  const handleSubmit = (submittedRecipe) => {
    recipeStore.addRecipe(submittedRecipe);
    navigate(import.meta.env.BASE_URL);
  };

  return (
    <div className="row">
      <div className="col-12">
        <p>Add a new recipe</p>
        <RecipeForm
          submitText="Add Recipe"
          recipe={recipe}
          handleSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateRecipe;
