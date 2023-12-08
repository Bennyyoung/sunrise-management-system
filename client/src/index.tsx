import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Preloader from './components/Preloader';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
