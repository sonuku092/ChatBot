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
      <div className={styles.links}>
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
  );
}

export default Home;
