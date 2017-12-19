import ReactDOM from 'react-dom';
import './index.css';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import * as globals from './GLOBALS';
import React from 'react';
import registerServiceWorker from './registerServiceWorker';

class TodoDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      allTodos: globals.TODOS,
      d: "none",
      current_todo: {}
    }

    this.renderTodo = this.renderTodo.bind(this);
    this.deleteTodoAtIndex = this.deleteTodoAtIndex.bind(this);
    this.editTodoAtIndex = this.editTodoAtIndex.bind(this);
    this.addNewTodo = this.addNewTodo.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
  }

  renderTodo() {
    console.log('re-render');
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

  addNewTodo(task, details, tags, id=globals.increase_auto()) {
    try {
      globals.TODOS.splice(id, 1);
      console.log(globals.TODOS,id);
    } catch (e) {
      console.log("Todo Not Found to delete");
    } finally {
      globals.TODOS.push({'task': task, 'details': details, 'tags': tags, 'id': id});
      console.log(globals.TODOS);
      this.setState({
        allTodos: globals.TODOS,
        d: "none",
        current_todo: {}
      });
    }
    // console.log("hello");
    // console.log(this.state);
  }

  deleteTodoAtIndex(ind) {
    globals.TODOS.splice(ind, 1);
    this.setState({
      allTodos: globals.TODOS,
      d: "none",
      current_todo: {}
    });
  }

  showAddDialog() {
    this.setState({
      allTodos: globals.TODOS,
      d: 'unset',
      current_todo: {}
    });
  }

  editTodoAtIndex(todo) {
    this.setState({
      allTodos: globals.TODOS,
      d: 'unset',
      current_todo: todo
    });
  }

  render() {
    return (
      <div>
          {this.renderTodo()}
          <button onClick={this.showAddDialog}>Add Todo</button>
          <hr />
          <NewTodo todo={this.state.current_todo} display={this.state.d} onAdd={this.addNewTodo}/>
      </div>
    );
  }
}


ReactDOM.render(<div>
  Existing Todos
  <hr />
  <TodoDisplay />

  </div>, document.getElementById('root'));
registerServiceWorker();
