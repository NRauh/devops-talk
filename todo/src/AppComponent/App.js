import React, { Component } from 'react';
import TodoList from '../TodoList/TodoList';

class App extends Component {
  render() {
    return (
      <div>
        <header className="text-center">
          <h1>Todo</h1>
        </header>
        <main>
          <TodoList />
        </main>
      </div>
    );
  }
}

export default App;
