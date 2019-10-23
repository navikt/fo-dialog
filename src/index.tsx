import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './view/App';

require('./mock');

ReactDOM.render(<Routing />, document.getElementById('root'));
