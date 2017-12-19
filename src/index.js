import ReactDOM from 'react-dom';
import TodoDisplay from './App.js'
import React from 'react';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<div>
  Existing Todos
  <hr />
  <TodoDisplay />

  </div>, document.getElementById('root'));
registerServiceWorker();
