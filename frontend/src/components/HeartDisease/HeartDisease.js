import React, { useState, useEffect } from "react";
import "./heartDesease.css";
import { Navbar } from "../assets";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; // Update with your server endpoint

const HeartDisease = () => {
  const [result, setResult] = useState("");
  const [inputs, setInputs] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("prediction", (data) => {
      setResult(data.prediction);
    });

    return () => socket.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const predict = () => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("heart", inputs);
  };

  return (
    <section>
      <Navbar />
      <div className="min-h-full bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 border-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Heart Disease Prediction
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
              {/* Input fields */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Add other input fields similarly */}
            </div>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={predict}
            >
              Predict
            </button>
            {/* Display prediction result */}
            {result && (
              <div className="mt-6">
                <h3 className="text-center text-xl font-semibold">
                  Prediction Result: {result}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeartDisease;
