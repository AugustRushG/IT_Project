import { useRef, useState, useEffect } from 'react';
import{Link, useNavigate,useLocation} from 'react-router-dom'; 
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import BottomSection from '../start_page/BottomSection';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const AUTH_URL='/api/users/authentication';



const Authentication = () => {
  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  console.log("reset password page");
  const userRef=useRef();
  const errRef=useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [questionAnswer, setQuestionAnswer] = useState('');
  const [validQA, setValidQA] = useState(false);
  const [questionFocus, setQuestionFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  },[user])





  useEffect(()=>{
    const result = onlyLettersAndSpaces(questionAnswer) && questionAnswer;
    console.log("question result",result);
    console.log(questionAnswer);
    setValidQA(result);
  },[questionAnswer])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(AUTH_URL,JSON.stringify({user,questionAnswer}),
      {headers:{'Content-Type': 'application/json'}, withCredentials: true});

      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response?.data))

    }
    catch(err){
      if (!err?.response){
        setErrMsg('No Server Response');
      }
      else if (err.response?.status===400){
        setErrMsg('Answer is wrong')
      }
      else{
        setErrMsg('Authentication Failed');
      }

      errRef.current.focus();

    }

  }
  return (
    <>

      <section>
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Authentication</h1>
        <form>
          <label htmlFor='username'>
            Username:
            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
          </label>
          <input 
            type='text' 
            id='username' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e)=>setUser(e.target.value)}
            required
            aria-invalid={validName? "false":"true"}
            aria-describedby="uidnote"
            onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)}
          ></input>
          <p id='uidnote' className={userFocus && user && !validName? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 to 24 characters.<br/>
            Must begin with a letter. <br/>
            Letters, numbers, underscores, hyphens allowed.
          </p>

          <label htmlFor='question'>
            Security Question: Whats the name of your primary school?
            <FontAwesomeIcon icon={faCheck} className={validQA? "valid" : "hide"} />
            <FontAwesomeIcon icon={faTimes} className={validQA || !questionAnswer? "hide" : "invalid"} />
          </label>
          <input 
            type='text' 
            id='question' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e)=>setQuestionAnswer(e.target.value)}
            required
            aria-invalid={validQA? "false":"true"}
            aria-describedby="uidnote"
            onFocus={()=>setQuestionFocus(true)}
            onBlur={()=>setQuestionFocus(false)}
          ></input>
          <p id='uidnote' className={userFocus && questionAnswer && !validQA? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Can only contain characters and spaces<br/>
          </p>

          

          <button disabled={!validName || !validQA ? true : false}><Link to = '/ResetPassword'>ResetPassword</Link></button>



        </form>


      </section>
    <BottomSection></BottomSection>      
    </>
  )
}

export default Authentication