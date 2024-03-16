import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import InputControl from "../assets/InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; // Import setDoc

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
  }, [navigate]);

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmit = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.pass);
      const user = res.user;

      await updateProfile(user, {
        displayName: values.name,
        photoURL: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-479x512-n8sg74wg.png",
      });

      await setDoc(doc(collection(db, "Users"), user.uid), {
        User_ID: user.uid,
        Name: user.displayName,
        Email: user.email,
        Password: values.pass,
      });

      await addDoc(collection(db, "Users", user.uid, "Chats"), {
        User_ID: user.uid,
        Message: "Hello",
      });

      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("userName", user.displayName);
      navigate("/");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSubmitButtonDisabled(false);
    }
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
              <Link to="/login"> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
