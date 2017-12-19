import React from 'react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    // console.log(this.props.todo);
  }

  render() {
    return (
      <div>
        <p>Task: {this.props.todo.task }</p>
        <p>Details: {this.props.todo.details }</p>
        <p>Tags: { this.props.todo.tags[0].name }</p>
        <button onClick={()=>this.props.onEdit(this.props.todo)}>Edit</button><button onClick={()=>this.props.onDelete(this.props.todo.id)}>Delete</button>
        <hr />
      </div>
    );
  }

}

export default TodoList;
