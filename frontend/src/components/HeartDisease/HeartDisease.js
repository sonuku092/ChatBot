import React, { useState } from "react";
import axios from "axios";
import "./heartDesease.css"; // Import the CSS file

import { Navbar } from "../assets"; // Import the Navbar component

const HeartDesease = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const predict = () => {
    axios
      .post("http://localhost:8001/predict", inputs)
      .then((response) => {
        setResult(response.data.prediction);
      })
      .catch((error) => {
        console.error("Error predicting:", error);
      });
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
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Sex
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="sex"
                  name="sex"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="cp"
                className="block text-sm font-medium text-gray-700"
              >
                Chest Pain Type
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="cp"
                  name="cp"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Typical Angina</option>
                  <option value="1">Atypical Angina</option>
                  <option value="2">Non-Anginal Pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="trestbps"
                className="block text-sm font-medium text-gray-700"
              >
                Resting Blood Pressure
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="trestbps"
                  name="trestbps"
                  type="number"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="chol"
                className="block text-sm font-medium text-gray-700"
              >
                Cholesterol
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="chol"
                  name="chol"
                  type="number"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="fbs"
                className="block text-sm font-medium text-gray-700"
              >
                Fasting Blood Sugar
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="fbs"
                  name="fbs"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Less Than 120 mg/dl</option>
                  <option value="1">Greater Than 120 mg/dl</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="restecg"
                className="block text-sm font-medium text-gray-700"
              >
                Resting Electrocardiographic Results
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="restecg"
                  name="restecg"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="thalach"
                className="block text-sm font-medium text-gray-700"
              >
                Maximum Heart Rate Achieved
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="thalach"
                  name="thalach"
                  type="number"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="exang"
                className="block text-sm font-medium text-gray-700"
              >
                Exercise Induced Angina
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="exang"
                  name="exang"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="oldpeak"
                className="block text-sm font-medium text-gray-700"
              >
                ST Depression Induced by Exercise Relative to Rest
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="oldpeak"
                  name="oldpeak"
                  type="number"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="slope"
                className="block text-sm font-medium text-gray-700"
              >
                Slope of the Peak Exercise ST Segment
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="slope"
                  name="slope"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="ca"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Major Vessels Colored by Fluoroscopy
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="ca"
                  name="ca"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="thal"
                className="block text-sm font-medium text-gray-700"
              >
                Thalassemia
              </label>
              <div className="mt-1 flex items-center">
                <select
                  id="thal"
                  name="thal"
                  className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">Normal</option>
                  <option value="1">Fixed Defect</option>
                  <option value="2">Reversible Defect</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={predict}
              >
                Predict
              </button>
            </div>

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

export default HeartDesease;
