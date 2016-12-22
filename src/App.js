import React, { Component } from 'react';
import { Link } from 'react-router'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Recipe Box</h2>
          <Link to='/recipes/create'><button>Create Recipe <i className="fa fa-plus fa-lg" aria-hidden="true"></i></button></Link>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
