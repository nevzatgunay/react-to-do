import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {

      newTodo: '',

      todos : [{
        id: 1, name:'Wash the dishes'
      },
      {
        id: 2, name:'go to the gym' 
      },
      {
        id: 3, name:'read your book'
      }]
    };

    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){

    this.setState({
      newTodo: event.target.value
    });
  }

  addTodo(){
    const newTodo = {
      name: this.state.newTodo,
      id: this.state.todos[this.state.todos.length - 1].id + 1
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    });
  }

  render() {

    console.log(this.state.newTodo);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          To-Do
          </p>
        </header>
        <div className="container">
          <input 
            type="text" 
            name="todo"
            className="m-4 form-control" 
            placeholder="Add a new to-do"
            value={ this.state.newTodo }
            onChange={ this.handleChange }/>

          <button 
            onClick={ this.addTodo }
            className="btn-info mb-3 form-control">
            Add a to-do
          </button>
          

          <ul className="list-group">
            { 
              this.state.todos.map((item) => {
                return <li key={ item.id } className="list-group-item">{ item.name }</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
