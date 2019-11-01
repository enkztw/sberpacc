import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
import { configure } from 'enzyme';

import Tr from './components/Tr';
import data from './data';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Tr data={{0: 1, 1: 2, 2: 3}}></Tr>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Input value filters data', () => {
  const app = mount(<App />);

  expect(app.state().data).toEqual(data);

  app.find('input').simulate('change',{ target: {value: 'Obi'} });

  expect(app.state().data).toEqual([data.find((item) => item.name.startsWith('Obi'))]);

  app.find('input').simulate('change',{ target: {value: 'UNEXPECTED NAME'} });

  expect(app.state().data).toEqual([]);

});

