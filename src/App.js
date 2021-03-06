import React from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import axiosInstance from './config';

let accToken = '';

class TodoDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: [],
      inputDisplay: "none",
      currentTodo: {}
    }

    this.renderTodo = this.renderTodo.bind(this);
    this.deleteTodoAtIndex = this.deleteTodoAtIndex.bind(this);
    this.editTodoAtIndex = this.editTodoAtIndex.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  componentWillMount(){
    accToken = localStorage.getItem('accToken');
    // console.log("login pahile");
    // if (!accToken) {
    //   // console.log("tespachhi");
    //   axiosInstance({
    //     method: 'post',
    //     url: '/auth/login',
    //     data: {
    //       "username": "saugat",
    //       "password": "saugatbro"
    //     }
    //   }).then(response => {
    //     // console.log(response);
    //     accToken = response.data.data.acessToken;
    //     localStorage.setItem('refToken', response.data.data.refreshToken);
    //     localStorage.setItem('accToken', response.data.data.acessToken);
    //   }).then(()=> this.getTodos()).catch(err => console.log(err));
    // } else {
      this.getTodos();
    // }
  }

  getTodos() {
      axiosInstance({
        method: 'get',
        url: '/todos',
        headers : {
          'type': 'access',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+accToken
        }
      }).then(res => {
        this.setState({
          allTodos: res.data.data,
          inputDisplay: 'none',
          currentTodo: {}
        });
      }).catch(err => console.log(err));
    }

  renderTodo() {
    return (this.state.allTodos.map(todo => {
        return (
          <TodoList todo={todo}
                    key={todo.id}
                    onDelete={this.deleteTodoAtIndex}
                    onEdit={this.editTodoAtIndex}/>
        )
      })
    );
  }

  addNewTodo(task, details, tags, id='nan') {
    console.log(tags, parseInt(tags));
      if (id === 'nan') {
        axiosInstance({
          method: 'post',
          url: '/todos',
          headers : {
            'type': 'access',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accToken
          },
          data: {
            'task': task,
            'details': details,
            'tags': parseInt(tags)
          }
        }).then(res => console.log(res)).then(()=>{
          this.getTodos();
        }).catch(err => console.log(err));
      }else {
        axiosInstance({
          method: 'put',
          url: '/todos/'+id,
          headers: {
            'type': 'access',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accToken
          },
          data: {
            'task': task,
            'details': details,
            'tags': parseInt(tags)
          }
        }).then(res => console.log(res)).then(()=>{
          this.getTodos();
        }).catch(err => console.log(err));
      }
    }

  deleteTodoAtIndex(id) {
    axiosInstance({
      method: 'delete',
      url: '/todos/'+id,
      headers: {
        'type': 'access',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+accToken
      }
    }).then(data=>console.log(data)).then(()=>{
      this.getTodos();
    });

  }

  showAddDialog() {
    this.setState({
      allTodos: this.state.allTodos,
      inputDisplay: 'unset',
      currentTodo: {}
    });
  }

  editTodoAtIndex(todo) {
    this.setState({
      allTodos: this.state.allTodos,
      inputDisplay: 'unset',
      currentTodo: todo
    });
  }

  render() {
    return (
      <div>
          {this.renderTodo()}
          <button onClick={this.showAddDialog}>Add Todo</button>
          <hr />
          <NewTodo todo={this.state.currentTodo} display={this.state.inputDisplay} onAdd={this.addNewTodo}/>
      </div>
    );
  }
}


export default TodoDisplay;
