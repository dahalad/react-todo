import React from 'react';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      task: '',
      details: '',
      tags: '',
      display: 'none'
    };

    this.handleSubmission = this.handleSubmission.bind(this);
  }

  render() {
    return (
      // <form>
        <div style={{ display: this.props.display }}>
          <p>Task: </p><input id='task' defaultValue={this.props.todo.task} type='text' ref={c => this.task = c} />
          <p>Details: </p><input id='details' type='text' defaultValue={this.props.todo.details} ref={c => this.details = c } />
          <p>Tags: </p><input id='tags' type='text' defaultValue={this.props.todo.tags} ref={ c=> this.tags =c } />
          <button type='submit' onClick={()=>this.handleSubmission()}>Add</button>
        </div>
      // </form>
    );
  }


  handleSubmission() {
    if (this.task.value && this.details.value && this.tags.value) {
      if (!this.props.todo) {
        this.props.onAdd(this.task.value, this.details.value, this.tags.value);
      }else {
        this.props.onAdd(this.task.value, this.details.value, this.tags.value, this.props.todo.id)
      }

    }
  }
}


export default NewTodo;
