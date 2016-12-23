import React from 'react';
import Rating from 'react-rating'
import Card from './Card';
import Ingredients from './RecipeIngredients';

class RecipeCard extends React.Component {

  render() {
    return (
      <Card
        image={this.props.recipe.image}
        title={this.props.recipe.name}
        >
        <div className="rating">
          <Rating
            start={0}
            stop={5}
            step={1}
            fractions={2}
            empty="fa fa-star-o fa-lg gold"
            placeholder="fa fa-star fa-lg gold"
            full="fa fa-star fa-lg gold"
            initialRate={this.props.recipe.rating}
            onChange={this.props.updateRating}
            />
        </div>
        <Ingredients ingredients={this.props.recipe.ingredients} />
      </Card>
    );
  }
}

RecipeCard.propTypes = {
  recipe: React.PropTypes.object,
};

export default RecipeCard;
