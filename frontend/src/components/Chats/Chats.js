import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import styles from './Chats.module.css';
import { io } from "socket.io-client";
import { useSpeechSynthesis } from 'react-speech-kit';
import { useSpeechRecognition } from 'react-speech-recognition';
import { split } from 'sentence-splitter';
import SpeechRecognition from 'react-speech-recognition';


function Chats(props) {
  const [userName, setUserName] = useState("");
  const [showList, setShowList] = useState(true);
  const [showVoice, setShowVoice] = useState(false);
  const navigate = useNavigate();

  const socket = useMemo(() => io("http://localhost:5173"), []);

  const [messages, setMessages] = useState([{ text: 'Hello, I am Chatbot', fromUser: false }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { speak } = useSpeechSynthesis();
  const { transcript, listening } = useSpeechRecognition();

  const keyValuePairList = {}; // Define your key-value pairs
  const fixedAnswers = {}; // Define your fixed answers

  const handleUserInput = async () => {
    const userMessage = input.trim();

    if (userMessage) {
      if (keyValuePairList.hasOwnProperty(userMessage)) {
        // Handle key-value pairs
        const value = keyValuePairList[userMessage];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `${userMessage}`, fromUser: true },
          { text: `${value}`, fromUser: false },
        ]);
        speak({ text: value });
      } else if (fixedAnswers.hasOwnProperty(userMessage)) {
        // Handle predefined answers
        const fixedAnswer = fixedAnswers[userMessage];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `${userMessage}`, fromUser: true },
          { text: `${fixedAnswer}`, fromUser: false },
        ]);
        speak({ text: fixedAnswer });
      } else {
        // Handle other user messages
        setIsTyping(true);
        const userMessage = input;
        setInput('');

        const typingDelay = 20;

        setMessages((prevMessages) => [...prevMessages, { text: 'You: ', fromUser: true }]);

        await delay(userMessage.length * typingDelay);

        setMessages((prevMessages) => prevMessages.slice(0, prevMessages.length - 1));

        setMessages((prevMessages) => [...prevMessages, { text: userMessage, fromUser: true }]);

        socket.emit('user-message', userMessage);
      }

      setInput('');
    }
  };

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!listening && input.trim() !== '') {
      handleSubmit();
    }
  }, [listening]);

  const isProcessingRef = useRef(false);

  useEffect(() => {
    socket.on('bot-message', async (message) => {
      if (!isProcessingRef.current) {
        isProcessingRef.current = true;
        setIsTyping(true);

        const typingDelay = 5;

        if (message) {
          const sentences = split(message);

          for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i].raw;
            await delay(i * typingDelay);

            if (i === 0) {
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  text: isTyping ? prevMessages.pop().text + sentence : sentence,
                  fromUser: false,
                },
              ]);
            }
          }

          setIsTyping(false);
        }

        isProcessingRef.current = false;
      }
    });
  }, [socket]);

  const lastSpokenMessageRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.fromUser && lastMessage.text !== lastSpokenMessageRef.current) {
        speak({ text: lastMessage.text });
        lastSpokenMessageRef.current = lastMessage.text;
      }
    }
  }, [messages, speak]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    handleUserInput();
  };

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
          <div className="max-h-full m-12">
            <div className="h-[500px] overflow-y-scroll" style={{ color: 'whitesmoke', color: 'black' }}>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.fromUser ? 'text-black-600 text-right to-blue ' : 'text-white-800'} rounded-md p-1`}
                >
                  {message.text}
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-4 text-gray-600">
                  <span className="animate-bounce inline-block">&#9612;</span>
                  <span className="animate-bounce inline-block">&#9612;</span>
                  <span className="animate-bounce inline-block">&#9612;</span>
                </div>
              )}
            </div>

            <p style={{ color: 'green' }}>Microphone: {listening ? 'on' : 'off'}</p>

            <form className="flex">
              <button
                type="button"
                className="bg-yellow-400 text-black p-2 mr-2 rounded-lg"
                onClick={SpeechRecognition.startListening}
              >
                🎤
              </button>

              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-grow border rounded-lg p-2 text-black bg-white"
                placeholder="Type your message..."
              ></input>

              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-blue-600 text-white p-2 ml-2 rounded-[50%] w-10 h-10"
                >
                Ok
              </button>
            </form>
          </div>
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
