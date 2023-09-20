import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import CreateRecipe from "./components/CreateRecipe";
import EditRecipe from "./components/EditRecipe";
import ErrorPage from "./components/ErrorPage";
import ListLayout from "./components/ListLayout";
import RecipeLayout from "./components/RecipeLayout";
import RecipeList from "./components/RecipeList";
import ViewRecipe from "./components/ViewRecipe";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"  errorElement={<ErrorPage />}>
      <Route path="/recipebox" errorElement={<ErrorPage />}>
        <Route  element={<ListLayout />} >
          <Route index  element={<RecipeList />} />
        </Route>
        <Route path="recipe" element={<RecipeLayout />}>
          <Route path="view/:recipeId" element={<ViewRecipe />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="edit/:recipeId" element={<EditRecipe />} />
        </Route>
      </Route>
    </Route>
  )
);
