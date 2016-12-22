import React from 'react';
import TagsInput from 'react-tagsinput';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      ingredients: props.ingredients || []
    }
    this.handleTags = this.handleTags.bind(this);
  }

  validateFields(recipe) {
    const validName = recipe.name && recipe.name.length > 0;
    const validDescription = recipe.description && recipe.description.length > 0;
    const validImage = recipe.image && recipe.image.length > 0;
    const validIngredients = recipe.ingredients && recipe.ingredients.length > 0;
    return validName && validImage && validDescription && validIngredients;
  }

  validateImage(url, timeout) {
    return new Promise(function (resolve, reject) {
      var timeout = timeout || 5000;
      var timer, img = new Image();
      img.onerror = img.onabort = function () {
        clearTimeout(timer);
        reject("Invalid image.");
      };
      img.onload = function () {
        clearTimeout(timer);
        resolve("success");
      };
      timer = setTimeout(function () {
        img.src = "";
        reject("Image loads too slowly.");
      }, timeout);
      img.src = url;
    });
  }

  submitRecipe(e) {
    e.preventDefault();
    const recipe = {
      name: e.target.elements.name.value,
      image: e.target.elements.image.value,
      ingredients: this.state.ingredients,
      description: e.target.elements.description.value,
      rating: 5
    }
    //recipe.image.match(/\.(jpeg|jpg|gif|png)$/) != null;
    if (this.validateFields(recipe)) {
      this.validateImage(recipe.image, 500).then(
        function () {
          this.props.handleSubmit(recipe);
        }.bind(this),
        function (msg) {
          this.setState({ error: msg });
        }.bind(this)
      )
    } else {
      this.setState({ error: "All fields are required." });
    }
  }

  handleTags(e) {
    this.setState({ ingredients: e });
  }

  render() {
    return (
      <div>
        {this.state.error.length > 0 &&
          <p style={{ color: "red" }}>{this.state.error}</p>
        }
        <form onSubmit={this.submitRecipe.bind(this)}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input type="text" id="name"
              defaultValue={this.props.name || ''} />
          </div>
          <div className="form-row">
            <label htmlFor="image">Image</label>
            <input type="text" id="image"
              defaultValue={this.props.image || ''} />
          </div>
          <div className="form-row-tag">
            <label htmlFor="ingredients">Ingredients</label>
            <TagsInput id="ingredients"
              onChange={this.handleTags}
              value={this.state.ingredients} />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input type="text" id="description"
              defaultValue={this.props.description || ''} />
          </div>
          <button type="submit">{this.props.submitText}</button>
        </form>
      </div>
    );
  }
};

RecipeForm.propTypes = {
  submitText: React.PropTypes.string,
  handleSumbit: React.PropTypes.func
};

export default RecipeForm;

