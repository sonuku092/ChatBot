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
    <div className={`${styles.container} md:flex`}>
      <div className={`${styles.intro}`}>
        <h1>Welcome to the Home Page</h1>
        <p>
          This is a simple authentication app built using React and Firebase.
        </p>
      </div>
      <div className={styles.right}>
        <h1>
          Get started
        </h1>
        <div className={`${styles.Link} md:flex gap-1`}>
          <Link to="/login">
            <button className={styles.button}>Login</button>
          </Link>
          <Link to="/signup">
            <button className={styles.button}>Sign up</button>
          </Link>
        </div>
        <h2 className=" text-2px mt-10">
          Please login or signup to continue
        </h2>
      </div>
    </div>
  );
}

export default Home;
