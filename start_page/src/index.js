import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './start_page/StartPage.css';
import './dashBoard/Dashboard.css';
import './register/Register.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <Routes>
       
          <Route path='*' element={<App />}></Route>
      
      </Routes>
    </Router>
  </React.StrictMode>
);

