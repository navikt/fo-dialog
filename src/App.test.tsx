import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Routing />, div);
    ReactDOM.unmountComponentAtNode(div);
});
