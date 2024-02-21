import React from 'react'
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


function Chats(props) {

  const [userName, setUserName] = useState("");

  useEffect(()=>{
    setUserName(localStorage.getItem("userName"));  
  },[userName]);
  
  const handleSignout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.reload();
    
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
      })
      .catch((error) => {
        console.log("Signout error", error);
      });
  };

  return (
    <div>
        <h2>
          {userName ? `Welcome - ${userName}` : "Please Login"}
        </h2>    
        <button onClick={handleSignout}>Logout</button>
      </div>
  )
}

export default Chats
