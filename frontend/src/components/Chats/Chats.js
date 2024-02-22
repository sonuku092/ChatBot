import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Chats.module.css";

function Chats(props) {
  const [userName, setUserName] = useState("");
  const [showList, setShowList] = useState(true);
  const [showVoice, setShowVoice] = useState(false);

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

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

  const toggleList = () => {
    setShowVoice(false)
    setShowList(!showList);
  };

  const toggleVoice = () => {
    setShowVoice(!showVoice);
  };

  return (
    <div className="h-screen">
      <div className="w-full px-14 py-1 ">
        <div className="flex gap-1">
          <div className="flex-none px-10 max-h-max  rounded-sm py-2 items-center">
            <h1>Chatbot</h1>
          </div>
          <div className="flex-grow max-h-max  rounded-sm py-2">
            <button onClick={handleSignout}>
              Logout
            </button>
          </div>
          <div className="flex w-auto pl-8 py-1 max-h-max  rounded-sm items-center">
            <h2 className=" text-[#5f9ea0]">
              {userName ? `Welcome - ${userName}` : "Please Login"}
            </h2>
            <div className="w-6 h-6 rounded-[50%] border-[1px] mx-2 border-[#5f9ea0]"></div>
          </div>
        </div>
      </div>

      <div className="w-full h-[93vh] flex">

        <div className={`w-${showList ? '1/4' : '0'} border-2 transition-all duration-500 overflow-hidden `}>
          <div className="border-b-2 pb-2">
            {showList && 
            <div className=" w-[200px]">
              List
            </div>}
          </div>
        </div>

        <div className="w-auto border-2 flex-grow">
          <h1>Main Content</h1>
          <button onClick={toggleList}>Toggle List</button>
          <button onClick={toggleVoice}>Toggle Voice</button>
          {showList && <div>List content...</div>}
        </div>

        <div className={`w-${showVoice ? 'fit' : '0'} md:block border-2 transition-all duration-2000 overflow-hidden`}>
          <div className="border-b-2 pb-2">
            {showVoice && 
            <div className=" w-[400px]">
              Voice
            </div>}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Chats;
