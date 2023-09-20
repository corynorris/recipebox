import React from 'react';
import { Link, Outlet } from "react-router-dom";

export default function ListLayout() {
  return (
    <div className="app">
      <div className="container">
        <div className="app-header">
          <h2 className="title">Recipe Box</h2>
          <Link className="actions" to='/recipebox/recipe/create'>
            <h2><i className="fa fa-plus fa-lg" aria-hidden="true"></i></h2>
          </Link>
        </div>
        <div className="app-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

