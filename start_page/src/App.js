import Footer from "./Footer";
import Header from "./Header";
import StartPage from "./start_page/StartPage";
import LogIn from "./logIn/LogIn";
import Register from "./register/Register";
import Missing from "./Missing";
import {useState, useEffect} from 'react';
import{Route, Routes, useNavigate,matchRoutes, useLocation } from 'react-router-dom'; 



function App() {

 

  return (
    <div className="App">
      <Header></Header>
      <Routes>

        <Route exact path='/' element={<StartPage/>}></Route>
        <Route exact path='/LogIn' element={<LogIn/>}></Route>
        <Route exact path='/SignUp' element={<Register/>}></Route>
        <Route path='*' element={<Missing />}></Route>

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
