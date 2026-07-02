import { useNavigate } from "react-router-dom";
import type { MappedRecipe } from "../types";
import { recipeStore } from "../data/RecipeStore";
import RecipeForm from "./RecipeForm";

const CreateRecipe = () => {
	const navigate = useNavigate();
	const recipe: MappedRecipe = {
		id: 0,
		name: "",
		image: "",
		description: "",
		rating: 0,
		ingredients: [],
	};

	const handleSubmit = (submittedRecipe: MappedRecipe) => {
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
					handleSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
};

export default CreateRecipe;
