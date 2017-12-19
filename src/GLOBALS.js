export let TODOS = [
  // {id:0, 'task': 'clean', 'details': 'clean house with a broom', 'tags':'clean, house'},
  // {id:1, 'task': 'water', 'details': 'water plants with a hose', 'tags':'water, hose'}
];
export let AUTO_INC = 0;

export function increase_auto() {
  AUTO_INC += 1;
  return AUTO_INC-1;
}
// <p>Task: </p><input id='task' type='text' onChange={e => this.setTodoTask('task', e.target.value)}/>
