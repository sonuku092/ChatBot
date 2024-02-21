import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

function Home(props) {

 const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1>Welcome to the Home Page</h1>
        <p>
          This is a simple authentication app built using React and Firebase.
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.Link}>
          <h1>
            Get started
          </h1>
          <h1>
            <Link to="/login">Login</Link>
          </h1>
          <h1>
            <Link to="/signup">Signup</Link>
          </h1>
        </div>
        <h2 className={styles["welcome-message"]}>
          {props.name ? `Welcome - ${props.name}` : "Please Login"}
        </h2>
      </div>
    </div>
  );
}

export default Home;
