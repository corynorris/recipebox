import PropTypes from "prop-types";
import React from "react";
import Rating from "react-rating";
import Card from "./Card";
import Ingredients from "./RecipeIngredients";

const RecipeCard = (props) => {
  const stopBehaviour = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card image={props.recipe.image} title={props.recipe.name}>
      <div className="rating" onClick={stopBehaviour}>
        <Rating
          start={0}
          stop={5}
          step={1}
          fractions={2}
          emptySymbol="fa fa-star-o fa-lg gold"
          placeholderSymbol="fa fa-star fa-lg gold"
          fullSymbol="fa fa-star fa-lg gold"
          initialRating={props.recipe.rating}
          onChange={props.updateRating}
        />
      </div>
      <Ingredients ingredients={props.recipe.ingredients} />
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object
};

export default RecipeCard;
