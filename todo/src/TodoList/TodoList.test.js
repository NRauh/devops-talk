import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoList from './TodoList';

Enzyme.configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TodoList />);
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  describe('handleAddChange', () => {
    it('sets addItemField to the value', () => {
      const testEvent = {
        target: {
          value: 'hello',
        },
      };
      wrapper.instance().handleAddChange(testEvent);
      expect(wrapper.state('addItemField')).toBe('hello');
    });
  });

  describe('handleAddSubmit', () => {
    let testEvent;

    beforeEach(() => {
      testEvent = {
        preventDefault: jest.fn(),
      };
    });

    it('should prevent default', () => {
      wrapper.instance().handleAddSubmit(testEvent);
      expect(testEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should return if addItemField is falsy', () => {
      const expectedItems = [];
      wrapper.setState({ addItemField: '' });
      wrapper.instance().handleAddSubmit(testEvent);
      expect(wrapper.state('items')).toEqual(expectedItems);
    });

    it('should add a new item to the state based on addItemField', () => {
      const currentTime = Date.now();
      const expectedItems = [{
        id: currentTime,
        text: 'fun time',
        complete: false,
        place: 0,
      }];

      Date.now = jest.fn().mockReturnValue(currentTime);
      wrapper.setState({ addItemField: 'fun time' });

      wrapper.instance().handleAddSubmit(testEvent);
      expect(wrapper.state('items')).toEqual(expectedItems);
    });

    it('should not get rid of other items', () => {
      const expectedItems = [
        {
          id: 123,
          text: 'go outside',
          complete: false,
          place: 0,
        }, {
          id: 456,
          text: 'feed birds',
          complete: false,
          place: 1,
        },
      ];

      Date.now = jest.fn().mockReturnValue(456);
      wrapper.setState({
        items: [{
          id: 123,
          text: 'go outside',
          complete: false,
          place: 0,
        }],
        addItemField: 'feed birds',
      });

      wrapper.instance().handleAddSubmit(testEvent);
      expect(wrapper.state('items')).toEqual(expectedItems);
    });

    it('should reset addItemField', () => {
      wrapper.setState({ addItemField: 'a thing' });
      wrapper.instance().handleAddSubmit(testEvent);
      expect(wrapper.state('addItemField')).toBe('');
    });
  });

  describe('changeCompletion', () => {
    it('should alternate complete for an item', () => {
      const petDog = {
        id: 123,
        text: 'pet the dog',
        complete: false,
        place: 0,
      };
      const petCat = {
        id: 987,
        text: 'pet the cat',
        complete: false,
        place: 1,
      };
      const petCatComplete = {
        ...petCat,
        complete: true,
      };
      const initialItems = [petDog, petCat];
      const expectedItems = [petDog, petCatComplete];
      const testEvent = {
        target: {
          dataset: {
            index: 1,
          },
        },
      };

      wrapper.setState({ items: initialItems });
      wrapper.instance().changeCompletion(testEvent);
      expect(wrapper.state('items')).toEqual(expectedItems);
    });
  });

  describe('renderItem', () => {
    it('should return an item', () => {
      const testItem = {
        id: 123,
        place: 0,
        text: 'hello world',
      };
      const expectedItem = (
        <li key={123}>
          hello world
          <button
            data-index={0}
            onClick={expect.any(Function)}
          >
            Complete
          </button>
        </li>
      );
      const result = wrapper.instance().renderItem(testItem);
      expect(result).toEqual(expectedItem);
    });
  });

  describe('renderItems', () => {
    beforeEach(() => {
      const initialItems = [{
        id: 123,
        text: 'the thing',
        place: 0,
        complete: true,
      }, {
        id: 321,
        text: 'more important thing',
        place: 2,
        complete: false,
      }, {
        id: 456,
        text: 'other thing',
        place: 1,
        complete: true,
      }, {
        id: 654,
        text: 'last thing',
        place: 3,
        complete: false,
      }];
      wrapper.setState({ items: initialItems });
    });

    it('should render a list of complete items', () => {
      const result = wrapper.instance().renderItems(true);
      expect(result.type).toBe('ul');
      expect(result.props.children).toHaveLength(2);
      expect(result.props.children[0].key).toBe('123');
      expect(result.props.children[1].key).toBe('456');
    });

    it('should render a list of pending items', () => {
      const result = wrapper.instance().renderItems(false);
      expect(result.type).toBe('ul');
      expect(result.props.children).toHaveLength(2);
      expect(result.props.children[0].key).toBe('321');
      expect(result.props.children[1].key).toBe('654');
    });
  });

  describe('render', () => {
    beforeEach(() => {
      const initialItems = [{
        id: 123,
        text: 'first thing',
        place: 0,
        complete: false,
      }, {
        id: 321,
        text: 'second thing',
        place: 2,
        complete: true,
      }, {
        id: 456,
        text: 'third thing',
        place: 1,
        complete: false,
      }];
      wrapper.setState({ items: initialItems });
    });

    it('should render a form to add items', () => {
      expect(wrapper.find('form input[type="text"]')).toHaveLength(1);
      expect(wrapper.find('form input[type="submit"]')).toHaveLength(1);
    });

    it('should render pending items', () => {
      expect(wrapper.find('.pending ul li')).toHaveLength(2);
    });

    it('should render complete items', () => {
      expect(wrapper.find('.complete ul li')).toHaveLength(1);
    });
  });
});
