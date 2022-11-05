import React from 'react'
import{Link,useNavigate,useLocation} from 'react-router-dom'; 
import useLogOut from './hooks/useLogOut';
import Button from 'react-bootstrap/Button';
import { useMediaQuery } from 'react-responsive'
import Dropdown from 'react-bootstrap/Dropdown';
import useAuth from "./hooks/useAuth";


/**
 * Module Name: Header.js 
 * Date of Creation: 22/08/2022
 * Creator: Hao Xu
 * Summary: The header component of the website, contains four buttons. Button changes according to different path.
 * Variable Accessed: useLocation, useLogOut, useNavigate.
 */

const Header = () => {
    //get current location
    const location=useLocation();
    console.log("current is "+location.pathname);

    const {auth} =useAuth();

    const navigate=useNavigate();
    const logOut=useLogOut();

    const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' })

  


    //function to help user log out
    const signOut=async()=>{
      await logOut();
      navigate('/')
    }

    //function to detect whether in dashboard or not
    const dashboardRego=()=>{
       return location.pathname.includes('/dashboard/');
    }

   

 


    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <>
    
      
      <header className='Header'>
        <Link to='/' style={{color:'black'}}><h1 className='RecordIt'>RecordIt</h1></Link>

        {isMobileOrTablet && !auth?.user && !dashboardRego() &&
          <div className="dropDownContainer">
            <Dropdown id='dropdown' align="end">
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item href="/LogIn">LogIn</Dropdown.Item>
              <Dropdown.Item href="/Register">SignUp</Dropdown.Item>
              <Dropdown.Item href="/About">About</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
          </div>
        }

        {isMobileOrTablet && !auth?.user && dashboardRego() &&
        <div className="dropDownContainer">
          <Dropdown id='dropdown' align="end">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item onClick={signOut}>LogOut</Dropdown.Item>
            <Dropdown.Item href="/About">About</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        }

        {isMobileOrTablet && auth?.user && !dashboardRego() &&
        <div className="dropDownContainer">
          <Dropdown id='dropdown' align="end">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item onClick={()=>navigate(-1)}>Dashboard</Dropdown.Item>
            <Dropdown.Item href="/About">About</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        }

        {isMobileOrTablet && auth?.user && dashboardRego() &&
        <div className="dropDownContainer">
          <Dropdown id='dropdown' align="end">
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            Menu
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item onClick={signOut}>LogOut</Dropdown.Item>
            <Dropdown.Item href="/About">About</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        }

        {isLaptop && dashboardRego() && 
        <>
          <Button variant="warning" id='LogOut' onClick={signOut}>Logout</Button> 
          <Button variant="warning" id='About' onClick={()=>navigate("About")}>About</Button>
        </>
        }
        {isLaptop &&!auth?.user && !dashboardRego() &&
          <>
          <Button variant="warning" id='LogIn' onClick={()=>navigate("LogIn")}>LogIn</Button>
          <Button variant="warning" id='SignUp' onClick={()=>navigate("Register")}>SignUp</Button>
          <Button variant="warning" id='About' onClick={()=>navigate("About")}>About</Button>
          </>
        }

        {isLaptop &&auth?.user && !dashboardRego() &&
          <>
            <Button variant="warning" id='dashboard' onClick={()=>navigate(-1)}>Dashboard</Button>
            <Button variant="warning" id='About' onClick={()=>navigate("About")}>About</Button>
          </>
        }
            
           

      </header>
    

    </>
  )
}

export default Header