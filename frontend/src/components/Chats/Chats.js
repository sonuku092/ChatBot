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
import axios from 'axios'; // Import Axios
import { MdDoubleArrow } from "react-icons/md";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { CgArrowRightR } from "react-icons/cg";




function Chats(props) {
  const [userName, setUserName] = useState("");
  const [showList, setShowList] = useState(true);
  const [showVoice, setShowVoice] = useState(false);
  const navigate = useNavigate();

  const socket = useMemo(() => io("http://localhost:8001"), []);

  const [messages, setMessages] = useState([{ text: 'Hello, I am Chatbot', fromUser: false }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotMessage, setLastBotMessage] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const { speak } = useSpeechSynthesis();
  const { transcript, listening } = useSpeechRecognition();

  const predefinedAnswers = {
    "What is your name?": "My name is Chatbot.",
    // Define your predefined answers here
  };

  const handleUserInput = async () => {
    const userMessage = input.trim();

    if (userMessage) {
      if (predefinedAnswers.hasOwnProperty(userMessage)) {
        const predefinedAnswer = predefinedAnswers[userMessage];
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `${userMessage}`, fromUser: true },
          { text: `${predefinedAnswer}`, fromUser: false },
        ]);
        speak({ text: predefinedAnswer });
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

              setLastBotMessage(sentence); // Set the last bot message
            }
          }

          setIsTyping(false);
        }

        isProcessingRef.current = false;
      }
    });
  }, [socket, isTyping]);

  const lastSpokenMessageRef = useRef(null);

  useEffect(() => {
    if (lastBotMessage && lastBotMessage !== lastSpokenMessageRef.current) {
      speak({ text: lastBotMessage });
      lastSpokenMessageRef.current = lastBotMessage;
    }
  }, [lastBotMessage, speak]);

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

    // Fetch conversation history from backend when component mounts
    axios.get('http://localhost:8001/conversations')
      .then(response => {
        setConversationHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversation history:', error);
      });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

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

      <div className="w-full px-14 py-1 mb-1 border-2 rounded-lg bg-blue-100 fixed">
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

      <div className="w-full h-[100vh] pb-1 pt-14 flex">
        <div className={`${styles.slider} ${showList ? styles.show : styles.hide}`}>
          {showList &&
            <div className="p-2 m-1 rounded-md bg-slate-100 items-center">
              List the items
            </div>}
        </div>

        <div className=" mx-1 border-2 flex flex-grow rounded-lg">

          <div className="flex justify-between items-center h-full">
          <div onClick={toggleList} className=" cursor-pointer m-2"><HiArrowLeftOnRectangle className=" h-6 w-6" /></div>
          </div>

          <div className="max-h-full flex-grow m-6">
            <div className="h-[86%] overflow-y-auto">
              <div className="flex flex-col sticky">

                <div className="flex-col p-4 ">
                  <div className="p-2 border-2 w-20 h-20 rounded-full mx-auto mb-16 mt-8">
                  </div>

                  <h2 className="text-2xl font-bold w-fit mx-auto">How can I help you today?</h2>
                  <p className=" text-xs mx-auto w-fit text-gray-400">Chat with me or use voice commands to interact.</p>

                  <div className="grid grid-cols-2 mt-16 mx-[10%]">
                    <div className="p-2 m-1 rounded-md border-[1px] items-center cursor-pointer">
                      <h4 className=" font-semibold text-sm text-gray-600	">How can I protect my skin from sun damage?</h4>
                      <p className=" text-[10px] text-gray-400">to avoid sun damage.</p>
                    </div>
                    <div className="p-2 m-1 rounded-md border-[1px] items-center cursor-pointer">
                      <h4 className=" font-semibold text-sm text-gray-600	">How can I lower my cholesterol levels naturally?</h4>
                      <p className=" text-[10px] text-gray-400">to lower cholesterol naturally.</p>
                    </div>
                    <div className="p-2 m-1 col-span-2 rounded-md border-[1px] items-center cursor-pointer">
                      <h4 className=" font-semibold text-sm text-gray-600">How does stress affect overall health?</h4>
                      <p className=" text-[10px] text-gray-400">Learning to manage stress is important for maintaining overall well-being.</p>
                    </div>
                  </div>
                </div>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={` flex  ${message.fromUser ? 'text-black-600 justify-end' : ''} rounded-md p-1 `}
                >
                  <div className={`${message.fromUser ? 'text-end' : ''} bg-slate-100 max-w-[70%] px-1 py-1 rounded-md`}>
                    <p className="text-sm font-bold">{message.fromUser ? 'You' : 'Bot'}</p>
                    <p className="rounded bg-white px-2 py-1 ">
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
              </div>

              {isTyping && (
                <div className="mb-4 text-gray-600">
                  <span className="animate-bounce inline-block">&#9612;</span>
                  <span className="animate-bounce inline-block">&#9612;</span>
                  <span className="animate-bounce inline-block">&#9612;</span>
                </div>
              )}
            </div>

            <p className=" text-xs text-green-500">Microphone: {listening ? 'on' : 'off'}</p>

            <form className="flex rounded-lg border-2 active:border-blue-400">
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
                className="flex-grow text-black bg-white focus:outline-none"
                placeholder="Type your message..."
              ></input>

              <button
                type="submit"
                onClick={handleSubmit}
                className="m-auto text-blue-400 cursor-pointer hover:text-blue-600 rounded-lg "
              >
               <CgArrowRightR className=" h-8 w-8 items-center mr-1"  />
              </button>
            </form>
            <div className="flex justify-center items-center mt-1">
              <p className="text-gray-500 text-xs text-center">
                Disclaimer: ChatBot info may not be perfect. Always verify with a healthcare professional.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center h-full">
            <div onClick={toggleVoice} className=" cursor-pointer m-2"><MdDoubleArrow className="h-6 w-6" /></div>
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
