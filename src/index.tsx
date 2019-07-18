import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Routing from './App';

require('./mock');

ReactDOM.render(<Routing />, document.getElementById('root'));
