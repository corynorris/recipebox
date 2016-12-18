import React, { Component } from 'react';
import { Link } from 'react-router'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Recipe Box</h2>
          <button><Link to='/recipes/create'>Create Recipe <i className="fa fa-plus fa-lg" aria-hidden="true"></i></Link></button>
        </div>
        { this.props.children }
      </div>
    );
  }
}

export default App;
