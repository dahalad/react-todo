import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    return (
      <div>
        <p>Task: {this.props.todo.task }</p>
        <p>Details: {this.props.todo.details }</p>
        <p>Tags: { this.props.todo.tags }</p>
        <button onClick={()=>this.props.onEdit(this.props.todo)}>Edit</button><button onClick={()=>this.props.onDelete(this.props.todo.ind)}>Delete</button>
        <hr />
      </div>
    );
  }

  handleEdit() {

  }
}

export default TodoList;
