import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TermsConditions from './TermsConditions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <TermsConditions />
  </React.StrictMode>
);

