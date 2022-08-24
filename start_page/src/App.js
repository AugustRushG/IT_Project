import Footer from "./Footer";
import Header from "./Header";
import StartPage from "./start_page/StartPage";
import {useState, useEffect} from 'react';
import{Route, Routes, useNavigate,matchRoutes, useLocation } from 'react-router-dom'; 



function App() {

 

  return (
    <div className="App">
      <Header></Header>
      <Routes>

        <Route exact path='/' element={<StartPage/>}></Route>

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
