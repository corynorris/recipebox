import React from 'react';
import TagsInput from 'react-tagsinput';

class RecipeForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input type="text" id="name"
              onChange={this.props.handleNameChange}
              value={this.props.name} />
          </div>
          <div className="form-row">
            <label htmlFor="image">Image</label>
            <input type="text" id="image"
              onChange={this.props.handleImageChange}
              value={this.props.image} />
          </div>
          <div className="form-row-tag">
            <label htmlFor="ingredients">Ingredients</label>
            <TagsInput id="ingredients"
              onChange={this.props.handleIngredientChange}
              value={this.props.ingredients} />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input type="text" id="description"
              onChange={this.props.handleDescriptionChange}
              value={this.props.description} />
          </div>
          <button type="submit">Save Recipe</button>
        </form>
      </div>
    );
  }
}

RecipeForm.propTypes = {

};

export default RecipeForm;

