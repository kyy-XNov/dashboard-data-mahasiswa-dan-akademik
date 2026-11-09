import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // [PRAKTIKUM 5] Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ikon
import './index.css'; // [PRAKTIKUM 2] CSS Eksternal

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);