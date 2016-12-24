import React from 'react';
import TagsInput from 'react-tagsinput';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe,
      error: ''
    }
    this.handleTags = this.handleTags.bind(this);
  }

  validate(value) {
    if (value && value.length > 0) {
      this.setState({ error: '' });
    } else {
      this.setState({ error: 'All fields are required.' });
    }
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
      let timeout = 5000;
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
    let recipe = this.state.recipe;
    recipe.rating = 5;
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

  handleImage(image) {
    let recipe = this.state.recipe;
    recipe.image = image.target.value;
    this.setState({ recipe: recipe });
  }

  handleDescription(description) {
    let recipe = this.state.recipe;
    recipe.description = description.target.value;
    this.setState({ recipe: recipe });
  }

  handleName(name) {
    let recipe = this.state.recipe;
    recipe.name = name.target.value;
    this.setState({ recipe: recipe });
  }

  handleTags(tags) {
    let recipe = this.state.recipe;
    recipe.ingredients = tags;
    this.setState({ recipe: recipe });
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
              onChange={this.handleName.bind(this)}
              value={this.state.recipe.name || ''} />
          </div>
          <div className="form-row">
            <label htmlFor="image">Image</label>
            <input type="text" id="image"
              onChange={this.handleImage.bind(this)}
              value={this.state.recipe.image || ''} />
          </div>
          <div className="form-row-tag">
            <label htmlFor="ingredients">Ingredients</label>
            <TagsInput id="ingredients"
              onChange={this.handleTags}
              addOnBlur={true}
              value={this.state.recipe.ingredients || []} />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input type="text" id="description"
              onChange={this.handleDescription.bind(this)}
              value={this.state.recipe.description || ''} />
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

