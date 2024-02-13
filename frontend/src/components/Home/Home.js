import { signOut } from 'firebase/auth';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import styles from './Home.module.css'

function Home(props) {
  const handleSignout = () => {
    signOut(auth);
  };

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
        <button className={styles.button} onClick={handleSignout}>Logout</button>
      </div>
    </div>
  );
}

export default Home;
