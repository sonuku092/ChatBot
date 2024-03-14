import React, { useState } from 'react';
import { Navbar } from "../assets";

function SkinDisease() {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const predict = () => {
        // Call your prediction API here using image data
        // Update the prediction state with the result
        setPrediction('Skin disease prediction result');
    };

    
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Skin Disease Prediction</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <div className="mt-1 flex items-center">
                            <input id="file" name="file" type="file" className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleImageChange} />
                        </div>
                    </div>

                    {image && (
                        <div className="mt-4 flex justify-center">
                            <img src={image} alt="Uploaded" className="max-w-full h-auto" />
                        </div>
                    )}

                    {prediction && (
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold">Prediction:</h2>
                            <p className="mt-2">{prediction}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <button onClick={predict} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                            Predict
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SkinDisease;
