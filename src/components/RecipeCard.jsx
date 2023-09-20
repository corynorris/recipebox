import PropTypes from "prop-types";
import React from "react";
import Rating from "react-rating";
import Card from "./Card";
import Ingredients from "./RecipeIngredients";

class RecipeCard extends React.Component {
  stopBehaviour(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <Card image={this.props.recipe.image} title={this.props.recipe.name}>
        <div className="rating" onClick={this.stopBehaviour.bind(this)}>
          <Rating
            start={0}
            stop={5}
            step={1}
            fractions={2}
            emptySymbol="fa fa-star-o fa-lg gold"
            placeholderSymbol="fa fa-star fa-lg gold"
            fullSymbol="fa fa-star fa-lg gold"
            initialRating={this.props.recipe.rating}
            onChange={this.props.updateRating}
          />
        </div>
        <Ingredients ingredients={this.props.recipe.ingredients} />
      </Card>
    );
  }
}

RecipeCard.propTypes = {
  recipe: PropTypes.object
};

export default RecipeCard;
