import { useNavigate, useParams } from "react-router-dom";
import type { MappedRecipe } from "../types";
import { recipeStore } from "../data/RecipeStore";
import RecipeForm from "./RecipeForm";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = recipeStore.getRecipe(recipeId!);

  if (!recipe) {
    return (
      <div className="row">
        <div className="col-12">
          <p>Recipe not found.</p>
        </div>
      </div>
    );
  }

  const handleUpdate = (updatedRecipe: MappedRecipe) => {
    recipeStore.updateRecipe(updatedRecipe);
    navigate(import.meta.env.BASE_URL);
  };

  return (
    <div className="row">
      <div className="col-12">
        <p>Update your recipe</p>
        <RecipeForm
          recipe={recipe}
          submitText="Save Changes"
          handleSubmit={handleUpdate}
        />
      </div>
    </div>
  );
};

export default EditRecipe;
