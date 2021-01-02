import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { render } from "react-dom";
import RecipeList from "./components/RecipeList";
import ViewRecipe from "./components/ViewRecipe";
import EditRecipe from "./components/EditRecipe";
import CreateRecipe from "./components/CreateRecipe";
import ListLayout from "./components/ListLayout";
import RecipeLayout from "./components/RecipeLayout";
import "./App.css";
import "./SimpleGrid.css";
render(
  <Router history={browserHistory}>
    <Route path="/" component={ListLayout}>
      <IndexRoute component={RecipeList} />
    </Route>
    <Route path="recipe" component={RecipeLayout}>
      <Route path="view/:recipeId" component={ViewRecipe} />
      <Route path="create" component={CreateRecipe} />
      <Route path="edit/:recipeId" component={EditRecipe} />
    </Route>
  </Router>,
  document.getElementById("root")
);
