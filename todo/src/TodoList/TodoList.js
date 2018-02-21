import React, { Component } from 'react';

export default class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      addItemField: '',
      items: [],
    };

    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.changeCompletion = this.changeCompletion.bind(this);

    this.renderItem = this.renderItem.bind(this);
  }

  handleAddChange(event) {
    this.setState({
      addItemField: event.target.value,
    });
  }

  handleAddSubmit(event) {
    event.preventDefault();

    if (!this.state.addItemField) {
      return;
    }

    const newItem = {
      id: Date.now(),
      text: this.state.addItemField,
      complete: false,
      place: this.state.items.length,
    };
    this.setState({
      items: [...this.state.items, newItem],
      addItemField: '',
    });
  }

  changeCompletion(event) {
    const { index } = event.target.dataset;
    const newItems = [...this.state.items];
    newItems[index].complete = !newItems[index].complete;
    this.setState({ items: newItems });
  }

  renderItem(item) {
    return (
      <li key={item.id}>
        {item.text}
        <button
          onClick={this.changeCompletion}
          data-index={item.place}
        >
          Complete
        </button>
      </li>
    );
  }

  renderItems(complete) {
    const items = this.state.items.filter(item => item.complete === complete);

    return (
      <ul>
        {items.map(this.renderItem)}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddSubmit}>
          <input
            type="text"
            placeholder="What to do?"
            value={this.state.addItemField}
            onChange={this.handleAddChange}
          />
          <input type="submit" value="Add" />
        </form>

        <div className="pending">
          <h2>Pending Items</h2>
          {this.renderItems(false)}
        </div>

        <div className="complete">
          <h2>Complete Items</h2>
          {this.renderItems(true)}
        </div>
      </div>
    );
  }
}
