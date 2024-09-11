import ReactDOM from 'react-dom/client'; // added
import { BrowserRouter as Router } from 'react-router-dom'; //added
import App from './App.jsx'
import './index.css'
import React from 'react';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router>
      <App />
    </Router>
  );
} else {
  console.error('Root element not found');
}