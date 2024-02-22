import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

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
    setShowList(!showList);
  };

  const toggleVoice = () => {
    setShowVoice(!showVoice);
  };

  return (
    <div className="h-screen">
      <div className="w-full px-14 py-1 bg-slate-400">
        <div className="flex gap-1">
          <div className="flex-none px-10 max-h-max bg-slate-50 rounded-sm py-2 items-center">
            <h1>Chatbot</h1>
          </div>
          <div className="flex-grow max-h-max bg-slate-50 rounded-sm py-2">
            <button onClick={handleSignout}>Logout</button>
          </div>
          <div className="flex w-auto pl-8 py-1 max-h-max bg-slate-50 rounded-sm items-center">
            <h2>{userName ? `Welcome - ${userName}` : "Please Login"}</h2>
            <div className="w-6 h-6 rounded-[50%] border-[1px] mx-2 border-black"></div>
          </div>
        </div>
      </div>

      <div className="w-full h-[93vh] bg-green-400 flex">
        <div className={`w-${showList ? '1/5' : '0'} border-2 transition-all duration-500 overflow-hidden`}>
          <div className="border-b-2 pb-2">
            {showList && <button onClick={toggleList}>Toggle List</button>}
            List
          </div>
        </div>

        <div className="w-full border-2">
          <h1>Main Content</h1>
          <button onClick={toggleList}>Toggle List</button>
          <button onClick={toggleVoice}>Toggle Voice</button>
        </div>

        <div className={`w-${showVoice ? '1/5' : '0'} md:block border-2 transition-all duration-500 overflow-hidden`}>
          {showVoice && <button onClick={toggleVoice}>Toggle Voice</button>}
          Voice
        </div>
      </div>
    </div>
  );
}

export default Chats;
