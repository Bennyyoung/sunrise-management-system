import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Preloader from './components/Preloader';

ReactDOM.render(
  <React.StrictMode>
      <Preloader />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
