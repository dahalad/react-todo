import * as globals from '../GLOBALS';

export function removeTodo(ind) {
  globals.TODOS.splice(ind, 1);
  console.log(globals.TODOS, 'sdkjf');
}
