import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import RecipeList from './components/RecipeList';
import EditRecipe from './components/EditRecipe';
import CreateRecipe from './components/CreateRecipe';
import IndexLayout from './components/IndexLayout';
import RecipeLayout from './components/RecipeLayout';
import './App.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={IndexLayout}>
      <IndexRoute component={RecipeList} />
    </Route>
    <Route path="recipe" component={RecipeLayout}>
      <Route path="create" component={CreateRecipe} />
      <Route path="edit/:id" component={EditRecipe} />
    </Route>
  </Router>
), document.getElementById('root'))