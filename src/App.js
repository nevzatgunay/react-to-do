import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      todos : [{
        id: 1, name:'Wordpress Developer'
      },
      {
        id: 2, name:'React Developer' 
      },
      {
        id: 3, name:'NodeJS Developer'
      }]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          To-Do
          </p>
        </header>
        <div className="container">
          <ul className="list-group">
            { 
              this.state.todos.map((item) => {
                return <li className="list-group-item">{ item.name }</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
