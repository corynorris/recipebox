import Rating from "react-rating";
import type { MappedRecipe } from "../types";
import Card from "./Card";
import Ingredients from "./RecipeIngredients";

interface RecipeCardProps {
	recipe: MappedRecipe;
	updateRating: (rating: number) => void;
}

const RecipeCard = ({ recipe, updateRating }: RecipeCardProps) => {
	const stopBehaviour = (e: React.MouseEvent | React.KeyboardEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<Card image={recipe.image} title={recipe.name}>
			<div className="rating" onClick={stopBehaviour}>
				<Rating
					start={0}
					stop={5}
					step={1}
					fractions={2}
					emptySymbol="fa fa-star-o fa-lg gold"
					placeholderSymbol="fa fa-star fa-lg gold"
					fullSymbol="fa fa-star fa-lg gold"
					initialRating={recipe.rating}
					onChange={(value: number) => updateRating(value)}
				/>
			</div>
			<Ingredients ingredients={recipe.ingredients} />
		</Card>
	);
};

export default RecipeCard;
