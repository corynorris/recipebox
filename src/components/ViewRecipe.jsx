import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeStore from '../data/RecipeStore.js';

const store = new RecipeStore();

const ViewRecipe = (props) => {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  let recipe = store.getRecipe(recipeId)
  const deleteRecipe = () => {
    store.delete(recipe);
    navigate(import.meta.env.BASE_URL);
  };

  
    return (
      <div>

        <div className="row">
          <div className="col-6" style={{ position: "relative" }}>
            <h2 className="title" style={{ background: "rgb(52,99,146)", color: "white", width: "100%", textAlign: "center", "padding": "8px" }}>
              {recipe.name}
            </h2>
            <img src={import.meta.env.BASE_URL + recipe.image} role="presentation" style={{ width: "100%", border: "2px solid rgb(52,99,146)" }} />
          </div>
          <div className="col-5">

            <hr />
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((ingredient, idx) => {
                return <li key={idx}>{ingredient}</li>
              })}
            </ul>
            <hr />
            <h4>Description</h4>
            <p className="description">
              {recipe.description}
            </p>
            <hr />
            <div className="options" style={{ float: "right" }} >
              <Link className="actions" to={'/recipebox/recipe/edit/' + recipe.id} style={{ display: "inline-block" }}>
                <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
              </Link>
              <div onClick={deleteRecipe} style={{ display: "inline-block", marginLeft: "5px" }} >
                <i className="fa fa-times fa-2x" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
}

export default ViewRecipe;