import React, { Component } from 'react';
import { Link } from 'react-router'

class RecipeLayout extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <div className="app-header">
            <h2 className="title">Recipe Box</h2>
            <Link className="actions" to='/'>
              <h2><i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i></h2>
            </Link>
          </div>
          <div className="app-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeLayout;
