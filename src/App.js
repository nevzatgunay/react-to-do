import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import loadingGif from './loading.gif';

import ListItem from './ListItem';

class App extends Component {

  constructor(){
    super();

    this.state = {

      newTodo: '',

      editing: false,

      editingIndex: null,

      notification: null,

      todos : [],

      loading: true
    };

    this.apiUrl = 'https://5bee71247839000013e6fa70.mockapi.io';

    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.alert = this.alert.bind(this);
  }

  async componentDidMount(){
    const response = await axios.get(`${this.apiUrl}/todos`);

    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }

  handleChange(event){

    this.setState({
      newTodo: event.target.value
    });
  }

  async addTodo(){

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ''
    });

    this.alert('Todo added successfully!');
  }

  editTodo(index){

    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async updateTodo(){
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({ 
      todos, 
      editing: false, 
      editingIndex: null,
      newTodo: '' 
    });
  }

  async deleteTodo(index){
    const todos = this.state.todos;

    const todo = this.state.todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];

    this.setState({ todos });

    this.alert('Todo deleted successfully!');
  }

  alert(notification){
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);

  }

  render() {

    return (
      <div className="App">
        <div className="container">

          {
            this.state.notification && 
            <div className="alert mb-6 alert-success">
              <p className="text-center">{ this.state.notification }</p>
            </div>
          }
          
          <input 
            type="text" 
            name="todo"
            className="m-6 form-control" 
            placeholder="Add a new to-do"
            value={ this.state.newTodo }
            onChange={ this.handleChange }/>

          <button 
            onClick={ this.state.editing ? this.updateTodo : this.addTodo }
            className="btn-info mb-3 form-control"
            disabled={ this.state.newTodo.length < 5 }
          >
            { this.setState.editing ? 'Update todo' : 'Add todo'}
          </button>

          {
            this.state.loading &&

            <img src={loadingGif} alt=""/>
          }
          

          {
            (!this.state.editing || this.state.loading) &&
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
