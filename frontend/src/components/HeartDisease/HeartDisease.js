import React, { useState } from 'react';
import axios from 'axios';
import './heartDesease.css'; // Import the CSS file

import { Navbar } from '../assets'; // Import the Navbar component

const HeartDesease = () => {
    const [result, setResult] = useState('');
    const [inputs, setInputs] = useState({
        age: '',
        sex: '',
        cp: '',
        trestbps: '',
        chol: '',
        fbs: '',
        restecg: '',
        thalach: '',
        exang: '',
        oldpeak: '',
        slope: '',
        ca: '',
        thal: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const predict = () => {
        axios.post('http://localhost:8001/predict', inputs)
            .then(response => {
                setResult(response.data.prediction);
            })
            .catch(error => {
                console.error('Error predicting:', error);
            });
    };

    return (
        <>
        <Navbar />
        <div className="heart-desease-form">
            
            <h1>Heart Disease Prediction System</h1>
            <label>Age:</label>
            <input type="text" name="age" value={inputs.age} onChange={handleChange} /><br />

            <label>Sex (1 for male, 0 for female):</label>
            <input type="text" name="sex" value={inputs.sex} onChange={handleChange} /><br />

            <label>Chest pain type (0-3):</label>
            <input type="text" name="cp" value={inputs.cp} onChange={handleChange} /><br />

            <label>Resting blood pressure:</label>
            <input type="text" name="trestbps" value={inputs.trestbps} onChange={handleChange} /><br />

            <label>Serum cholesterol in mg/dl:</label>
            <input type="text" name="chol" value={inputs.chol} onChange={handleChange} /><br />

            <label>Fasting blood sugar  120 mg/dl (1 for true, 0 for false):</label>
            <input type="text" name="fbs" value={inputs.fbs} onChange={handleChange} /><br />

            <label>Resting electrocardiographic results (0, 1, or 2):</label>
            <input type="text" name="restecg" value={inputs.restecg} onChange={handleChange} /><br />

            <label>Maximum heart rate achieved:</label>
            <input type="text" name="thalach" value={inputs.thalach} onChange={handleChange} /><br />

            <label>Exercise induced angina (1 for yes, 0 for no):</label>
            <input type="text" name="exang" value={inputs.exang} onChange={handleChange} /><br />

            <label>ST depression induced by exercise relative to rest:</label>
            <input type="text" name="oldpeak" value={inputs.oldpeak} onChange={handleChange} /><br />

            <label>The slope of the peak exercise ST segment:</label>
            <input type="text" name="slope" value={inputs.slope} onChange={handleChange} /><br />

            <label>Number of major vessels (0-3) colored by flourosopy:</label>
            <input type="text" name="ca" value={inputs.ca} onChange={handleChange} /><br />

            <label>Thal:</label>
            <input type="text" name="thal" value={inputs.thal} onChange={handleChange} /><br />

            <button onClick={predict}>Predict</button>
            <div>Prediction: {result}</div>
        </div>
        </>
    );
};

export default HeartDesease;
