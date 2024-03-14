import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Chats.module.css";
import { io } from "socket.io-client";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-recognition";
import { split } from "sentence-splitter";
import SpeechRecognition from "react-speech-recognition";
import axios from "axios"; // Import Axios
import { MdDoubleArrow } from "react-icons/md";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { CgArrowRightR } from "react-icons/cg";
import { Navbar } from "../assets";

function Chats(props) {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(true);
  const [showVoice, setShowVoice] = useState(false);
  const [activeChat, setActiveChat] = useState(false);

  const socket = useMemo(() => io("http://localhost:8001"), []);

  const [messages, setMessages] = useState([
    { text: "Hello, I am Chatbot", fromUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotMessage, setLastBotMessage] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const { speak } = useSpeechSynthesis();
  const { transcript, listening } = useSpeechRecognition();

  const predefinedAnswers = {
    "What is your name?": "My name is HealthBot. How can I assist you today?",
    "What is the function of the skin?":
      "The skin serves as a protective barrier for the body, regulating temperature, preventing dehydration, and providing sensory input.",
    "How does the heart pump blood throughout the body?":
      "The heart pumps blood through a network of arteries and veins using its rhythmic contractions. Blood is pumped from the heart to the rest of the body through arteries and returns to the heart through veins.",
    "What are some common skin conditions?":
      "Common skin conditions include acne, eczema, psoriasis, dermatitis, and fungal infections like athlete's foot.",
    "What role do blood vessels play in skin health?":
      "Blood vessels in the skin help regulate temperature by dilating or constricting to release or conserve heat. They also supply nutrients and oxygen to skin cells and remove waste products.",
    "How does the skin protect against harmful UV radiation?":
      "The skin produces melanin, a pigment that absorbs UV radiation and prevents damage to skin cells. Additionally, the outer layer of the skin thickens in response to UV exposure, providing further protection.",
    "What are the major components of the heart?":
      "The major components of the heart include four chambers (two atria and two ventricles), valves, coronary arteries, and the cardiac conduction system.",
    "How does exercise benefit both the skin and the heart?":
      "Exercise improves circulation, which helps deliver oxygen and nutrients to the skin and promotes the removal of toxins. It also strengthens the heart muscle, improves cardiovascular function, and reduces the risk of heart disease.",
    "What are some lifestyle factors that can impact skin and heart health?":
      "Lifestyle factors such as diet, exercise, stress management, sleep quality, and sun exposure can significantly impact both skin and heart health. A balanced diet rich in fruits, vegetables, and omega-3 fatty acids, along with regular physical activity, can promote overall wellness for both the skin and heart.",
    "How does aging affect the skin and heart?":
      "Aging leads to changes in the skin, including reduced elasticity, increased dryness, and the formation of wrinkles. Similarly, the aging process can affect the heart, leading to decreased cardiac output, stiffening of blood vessels, and an increased risk of cardiovascular disease.",
    "What are some ways to maintain healthy skin and heart simultaneously?":
      "Maintaining healthy skin and heart involves a combination of practices such as protecting the skin from sun damage, staying hydrated, eating a balanced diet, exercising regularly, managing stress levels, avoiding smoking, and getting enough sleep.",
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
        setInput("");

        const typingDelay = 20;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "You: ", fromUser: true },
        ]);

        await delay(userMessage.length * typingDelay);

        setMessages((prevMessages) =>
          prevMessages.slice(0, prevMessages.length - 1)
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: userMessage, fromUser: true },
        ]);

        socket.emit("message", userMessage);
      }

      setInput("");
    }
  };

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (!listening && input.trim() !== "") {
      handleSubmit();
    }
  }, [listening]);

  const isProcessingRef = useRef(false);

  useEffect(() => {
    socket.on("message", async (message) => {
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
                  text: isTyping
                    ? prevMessages.pop().text + sentence
                    : sentence,
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
    setActiveChat(true);
    if (event) {
      event.preventDefault();
    }
    handleUserInput();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    // Fetch conversation history from backend when component mounts
    // axios.get('http://localhost:8001/conversations')
    //   .then(response => {
    //     setConversationHistory(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching conversation history:', error);
    //   });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const toggleList = () => {
    setShowList(!showList);
  };

  const toggleVoice = () => {
    setShowVoice(!showVoice);
  };

  return (
    <div className="h-screen">
      <Navbar />

      <div className="w-full h-full pb-1 pt-14 flex">
        <div
          className={`${styles.slider} ${showList ? styles.show : styles.hide}`}
        >
          {showList && (
            <div className="m-1 rounded-md  items-center h-full p-1">
              <div className="flex items-center justify-center">
                <button className="p-1 rounded-md border-[2px] items-center cursor-pointer hover:border-red-400 w-full">
                  <h4 className="font-bold text-sm text-gray-600">SOS</h4>
                  <p className="text-[10px] text-gray-400">
                    Emergency assistance
                  </p>
                </button>
              </div>

              <div className=" flex-col space-y-1 bg-slate-10 rounded overflow-scroll mt-2 w-full h-[90%]">
                <button className="p-2 w-full rounded-md border-[1px] text-start font-semibold cursor-pointer text-sm text-gray-600 hover:border-blue-400">
                  Last Chat
                </button>
              </div>
            </div>
          )}
        </div>

        <div className=" mx-1 border-2 flex flex-grow rounded-lg">
          <div className="flex justify-between items-center start-0">
            <div onClick={toggleList} className=" cursor-pointer m-2">
              <HiArrowLeftOnRectangle className=" h-6 w-6" />
            </div>
          </div>

          <div className="max-h-full flex-grow">
            <div className="h-[86%] overflow-y-auto mx-[12%]">
              <div className="flex flex-col">
                
                {!activeChat && (
                  <div className="flex-col p-4 ">
                    <div className="border-2 w-20 h-20 rounded-full mx-auto mb-16 mt-8">
                      <img
                        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                        alt="avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>

                    <h2 className="text-2xl font-bold w-fit mx-auto text-gray-800">
                      How can I help you today?
                    </h2>
                    <p className=" text-xs mx-auto w-fit text-gray-400">
                      Chat with me or use voice commands to interact.
                    </p>

                    <div className="grid grid-cols-2 mt-16 w-max mx-auto">
                      <div
                        className="p-2 m-1 rounded-md border-[1px] items-center cursor-pointer hover:border-green-400"
                        onClick={() => navigate("/predict/heartdisease")}
                      >
                        <h4 className=" font-semibold text-sm text-gray-600	">
                          Heart Disease
                        </h4>
                        <p className=" text-[10px] text-gray-400">
                          to avoid sun damage.
                        </p>
                      </div>
                      <div className="p-2 m-1 rounded-md border-[1px] items-center cursor-pointer hover:border-green-400 "
                        onClick={ () => navigate("/predict/skindisease")}
                      >
                        <h4 className=" font-semibold text-sm text-gray-600	">
                          Skin Disease
                        </h4>
                        <p className=" text-[10px] text-gray-400">
                          to lower cholesterol naturally.
                        </p>
                      </div>
                      <div className="p-2 m-1 col-span-2 rounded-md border-[1px] items-center cursor-pointer hover:border-green-400">
                        <h4 className=" font-semibold text-sm text-gray-600"
                          onClick={() => setInput("How does stress affect overall health?")
                        }
                        >
                          How does stress affect overall health?
                        </h4>
                        <p className=" text-[10px] text-gray-400">
                          Learning to manage stress is important for maintaining
                          overall well-being.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={` flex  ${
                      message.fromUser ? "text-black-600 justify-end" : ""
                    } rounded-md p-1 `}
                  >
                    <div
                      className={`${
                        message.fromUser ? "text-end" : ""
                      } bg-slate-100 max-w-[70%] px-1 py-1 rounded-md
                      ${index === 0 ? " hidden" : " block"}
                      `}
                    >
                      <p className="text-sm font-bold">
                        {message.fromUser ? "You" : "Bot"}
                      </p>
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

            <p className=" text-xs text-green-500 mx-[12%]">
              Microphone: {listening ? "on" : "off"}
            </p>

            <form className="flex rounded-lg border-2 active:border-blue-400 mx-[12%]">
              <button
                type="button"
                className="bg-yellow-300 text-black p-2 mr-2 rounded-lg"
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
                <CgArrowRightR className=" h-8 w-8 items-center mr-1" />
              </button>
            </form>
            <div className="flex justify-center items-center mt-1">
              <p className="text-gray-500 text-xs text-center">
                Disclaimer: ChatBot info may not be perfect. Always verify with
                a healthcare professional.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center end-0">
            <div onClick={toggleVoice} className=" cursor-pointer m-2">
              <MdDoubleArrow className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div
          className={`${styles.rslider} ${
            showVoice ? styles.show : styles.hide
          }`}
        >
          {showVoice && (
            <div className="w-[400px] pb-2 m-6">Voice content...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
