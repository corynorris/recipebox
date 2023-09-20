import React from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";

const RecipeLayout = () => {
  const navigate = useNavigate();
  
  return (
      <div className="app">
        <div className="container">
          <div className="app-header">
            <h2 className="title">Recipe Box</h2>
            <Link className="actions" onClick={() => navigate(-1)}>
              <h2><i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i></h2>
            </Link>
          </div>
          <div className="app-body">
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default RecipeLayout;
