import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import styles from './Chats.module.css';
import { io } from "socket.io-client";

function Chats(props) {
  const [userName, setUserName] = useState("");
  const [showList, setShowList] = useState(true);
  const [showVoice, setShowVoice] = useState(false);
  const navigate = useNavigate();

  const socket = io("http://localhost:5173");

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));

    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.reload();

    signOut(auth)
      .then(() => {
        navigate("/Home");
      })
      .catch((error) => {
        console.log("Signout error", error);
      });
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  const toggleVoice = () => {
    setShowVoice(!showVoice);
  };

  return (
    <div className="h-screen">
      <div className="w-full px-14 py-1 mb-1  ">
        <div className="flex gap-1">
          <div className="flex items-center px-2 max-h-max rounded-sm py-1">
            <h1 className={styles.heading}>Chatbot</h1>
          </div>
          <div className="flex-grow max-h-max rounded-sm py-2">
            <button className={styles.button} onClick={handleSignout}>
              Logout
            </button>
          </div>
          <div className="flex w-auto px-5 py-1 max-h-max rounded-sm items-center hover:bg-slate-50">
            <h1>Eng</h1>
          </div>
          <div className="flex w-auto pl-8 py-1 max-h-max rounded-sm items-center hover:bg-slate-50 hover:cursor-pointer">
            <h2 className="text-[#5f9ea0]">
              {userName ? `Welcome - ${userName}` : "Please Login"}
            </h2>
            <div className="w-6 h-6 rounded-[50%] border-[1px] mx-2 border-[#5f9ea0]"></div>
          </div>
        </div>
      </div>

      <div className="w-full h-[93vh] pb-1 flex">
        <div className={`${styles.slider} ${showList ? styles.show : styles.hide}`}>
          {showList && 
            <div className="p-2 m-1 rounded-md bg-slate-100 items-center">
              List the items
            </div>}
        </div>

        <div className="w-auto mx-1 border-2 flex-grow rounded-lg">
          <h1>Main Content</h1>
          <button className={styles.button} onClick={toggleList}>Toggle List</button>
          <button className={styles.button} onClick={toggleVoice}>Toggle Voice</button>
        </div>

        <div className={`${styles.rslider} ${showVoice ? styles.show : styles.hide}`}>
          {showVoice && 
            <div className="w-[400px] pb-2 m-6">
              Voice content...
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Chats;
