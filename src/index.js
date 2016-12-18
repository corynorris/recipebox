import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { render } from 'react-dom';
import App from './App';
import RecipeList from './components/RecipeList';
import EditRecipe from './components/EditRecipe';
import CreateRecipe from './components/CreateRecipe';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={RecipeList} />
      <Route path="/recipes/create" component={CreateRecipe} />
      <Route path="/recipes/edit/:id" component={EditRecipe} />
    </Route>
  </Router>
), document.getElementById('root'))