import Footer from "./Footer";
import Header from "./Header";
import MainSection from "./MainSection"
import BottomSection from "./BottomSection";
import {useState, useEffect} from 'react';
import{Route, Routes, useNavigate} from 'react-router-dom'; 


function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainSection></MainSection>
      <Footer></Footer>
      <BottomSection></BottomSection>
    </div>
  );
}

export default App;
