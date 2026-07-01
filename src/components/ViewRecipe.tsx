import { Link, useNavigate, useParams } from "react-router-dom";
import { recipeStore } from "../data/RecipeStore";

const ViewRecipe = () => {
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

  const deleteRecipe = () => {
    recipeStore.delete(recipe);
    navigate(import.meta.env.BASE_URL);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6" style={{ position: "relative" }}>
          <h2
            className="title"
            style={{
              background: "#C73E1D",
              color: "white",
              width: "100%",
              textAlign: "center",
              padding: "10px",
              fontFamily: "Lora, Georgia, serif",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            {recipe.name}
          </h2>
          <img
            src={import.meta.env.BASE_URL + recipe.image}
            role="presentation"
            style={{
              width: "100%",
              borderLeft: "2px solid #C73E1D",
              borderRight: "2px solid #C73E1D",
              display: "block",
            }}
          />
        </div>
        <div className="col-5">
          <hr />
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ingredient, idx) => {
              return <li key={idx}>{ingredient}</li>;
            })}
          </ul>
          <hr />
          <h4>Description</h4>
          <p className="description">{recipe.description}</p>
          <hr />
          <div className="options" style={{ float: "right" }}>
            <Link
              className="actions"
              to={`/recipebox/recipe/edit/${recipe.id}`}
              style={{ display: "inline-block", color: "#5B7B45" }}
            >
              <i className="fa fa-pencil fa-2x" aria-hidden="true"></i>
            </Link>
            <button
              onClick={deleteRecipe}
              style={{
                display: "inline-block",
                marginLeft: "8px",
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                color: "#A33015",
              }}
            >
              <i className="fa fa-times fa-2x" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
