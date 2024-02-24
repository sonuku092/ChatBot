// Login.js
import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import InputControl from '../InputControl/InputControl';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const [errorMsg, setErrorMsg] = useState('');
  const [summitButtonDisabled, setSummitButtonDisabled] = useState(false);

  const handleSummition = () => {
    if (!values.email || !values.pass) {
      setErrorMsg('Fill all fields');
      return;
    }

    setErrorMsg('');

    setSummitButtonDisabled(true);

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSummitButtonDisabled(false);

        localStorage.setItem('token', await res.user.getIdToken());
        localStorage.setItem('userName', res.user.displayName);
        navigate('/');
      })
      .catch((err) => {
        setSummitButtonDisabled(false);
        setErrorMsg(err.message);
        console.log('Error-', err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Welcome Back</h1>
        <InputControl
          label="Email"
          placeholder="abc@gmail.com"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Abcd1234@"
          type="password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.errorMsg}>{errorMsg}</b>
          <button onClick={handleSummition} disabled={summitButtonDisabled}>
            Login
          </button>
          <p>
            If you don'n have an account?{' '}
            <span>
              <Link to="/signup"> Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
