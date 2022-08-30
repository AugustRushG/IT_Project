import Footer from "./Footer";
import Header from "./Header";
import StartPage from "./start_page/StartPage";
import LogIn from "./logIn/LogIn";
import Register from "./register/Register";
import Missing from "./Missing";
import Authentication from "./authentication/Authentication";
import ResetPassword from "./resetPassword/ResetPassword";
import {useState, useEffect} from 'react';
import {Route, Routes, useNavigate,matchRoutes, useLocation } from 'react-router-dom'; 
import Dashboard from "./dashBoard/Dashboard";



function App() {
  
  const[search,setSearch]=useState('');
 

  return (
    <div className="App">
      <Header></Header>

      <Routes>

        <Route exact path='/' element={<StartPage/>}></Route>
        <Route exact path='/LogIn' element={<LogIn/>}></Route>
        <Route exact path='/Register' element={<Register/>}></Route>
        <Route exact path='/dashboard' element={<Dashboard/>}></Route>
        <Route exact path='/ResetPassword' element={<ResetPassword/>}></Route>
        <Route exact path='/Authentication' element={<Authentication/>}></Route>
        <Route path='*' element={<Missing />}></Route>

      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
