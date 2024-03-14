// Signup.js
import React, { useEffect, useState } from 'react';
import styles from './Signup.module.css';
import InputControl from '../InputControl/InputControl';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase'; // Import collection and db
import { collection, addDoc, doc} from 'firebase/firestore'; // Import addDoc 

function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  useEffect(() => { 
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    
    setErrorMsg("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        const user = res.user;
        console.log(user);

        await updateProfile(user, {
          displayName: values.name,
        });

        
        setSubmitButtonDisabled(false);

        try {
          const docRef = await addDoc(collection(db, "Users"), {
            User_ID : user.uid,
            Name: user.displayName,
            Email: user.email,
            Password: values.pass,
          });

          const docRefId = docRef.id;
          const val = doc(db, "Users", docRef.id);
          const collectionVal = collection(val, "Chats");
          addDoc(collectionVal, {
            User_ID: user.uid,
            Message: "Hello",
          });

          localStorage.setItem("token", await user.getIdToken());
          localStorage.setItem("userName", user.displayName);
          localStorage.setdocRefId("docRefId", docRefId);
          navigate("/");
        } catch (e) {
          setErrorMsg(e.message);
        }
        
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Create your account</h1>
        <InputControl
          label="Name"
          placeholder="Enter your Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.errorMsg}>{errorMsg}</b>
          <button onClick={handleSubmit} disabled={submitButtonDisabled}>
            Sign Up
          </button>
          <p>
            Already have an account?
            <span>
              <Link to='/login'> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
