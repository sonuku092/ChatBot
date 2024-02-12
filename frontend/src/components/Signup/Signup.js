import React, { useState } from 'react'
import styles from './Signup.module.css'
import InputControl from '../InputControl/InputControl'
import { Link , useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { auth } from '../../firebase'

function Signup() {

  const navigate = useNavigate();

  const[values, setValues] = useState({
    name : "",
    email : "",
    pass : "",
  });

  const[errorMsg, setErrorMsg] = useState("");
  const[summitButtonDisabled, setSummitButtonDisabled] = useState(false);

  const handelSummition= () =>{
    if(!values.name || !values.email || !values.pass)
    {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    
    setSummitButtonDisabled(true);
    createUserWithEmailAndPassword(auth,values.email, values.pass)
    .then(async(res)=>{
      setSummitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user, {
        displayName: values.name,
      });
      navigate("/")
    })
    .catch((err)=>{
      setSummitButtonDisabled(true);
      setErrorMsg(err.message)
      console.log("Error-",err.message)
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Sign up</h1>
        <InputControl label= "Name" placeholder="Enter your Name"
        onChange={(event)=>
          setValues((prev)=>({...prev, name: event.target.value}))
        }
        />
        <InputControl label= "Email" placeholder="Enter email"
        onChange={(event)=>
          setValues((prev)=>({...prev, email: event.target.value}))
        }
        />
        <InputControl label= "Password" placeholder="Enter password"
        onChange={(event)=>
          setValues((prev)=>({...prev, pass: event.target.value}))
        }
        />

        <div className={styles.footer}>
          <b className={styles.errorMsg}>{errorMsg}</b>
            <button onClick={handelSummition} disabled={summitButtonDisabled}>Login</button>
            <p>
              Don't have an account?  
              <span>
                <Link to='/login'> login</Link>
              </span>
            </p>
        </div>

      </div>
      
    </div>
  )
}

export default Signup
