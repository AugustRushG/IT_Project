import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './start_page/StartPage.css';
import './dashBoard/Dashboard.css';
import './register/Register.css';
import App from './App';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

/**
 * Module Name: index.js
 * Date of Creation: 20/08/2022
 * Creator: Hao Xu
 * Summary: Page created when react project is created. Runs the whole project. Routing is completed.
 * Variable Accessed: 
 */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path='*' element={<App />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

