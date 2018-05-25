import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InventoryItem from './InventoryItem';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<InventoryItem />, document.getElementById('root'));
registerServiceWorker();
