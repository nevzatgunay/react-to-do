import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListItem from './ListItem';

class App extends Component {

  constructor(){
    super();

    this.state = {

      newTodo: '',

      editing: false,

      editingIndex: null,

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
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.generateTodoId = this.generateTodoId.bind(this);
  }

  handleChange(event){

    this.setState({
      newTodo: event.target.value
    });
  }

  generateTodoId(){
    const lastTodo = this.state.todos[this.state.todos.length - 1]

    if(lastTodo){
      return lastTodo.id + 1;
    }

    return 1;
  }

  addTodo(){
    const newTodo = {
      name: this.state.newTodo,
      id: this.generateTodoId()
    };

    const todos = this.state.todos;
    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    });
  }

  editTodo(index){

    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];

    todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = todo;

    this.setState({ 
      todos, 
      editing: false, 
      editingIndex: null,
      newTodo: '' });
  }

  deleteTodo(index){
    const todos = this.state.todos;

    delete todos[index];

    this.setState({ todos });
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
            onClick={ this.state.editing ? this.updateTodo : this.editTodo }
            className="btn-info mb-3 form-control">
            { this.setState.editing ? 'Update todo' : 'Add todo'}
          </button>
          

          {
            !this.state.editing && 
            <ul className="list-group">
            { 
              this.state.todos.map((item, index) => {
                return <ListItem
                          key = { item.id }
                          item = { item }
                          editTodo = { () => {this.editTodo(index);} }
                          deleteTodo = { () => {this.deleteTodo(index);} }  
                        />
              })
            }
          </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
