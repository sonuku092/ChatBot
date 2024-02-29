import * as tf from '@tensorflow/tfjs';
import axios from 'axios';

async function loadHeartDiseaseDataset() {
    try {
        // Load the CSV data
        const response = await axios.get('https://example.com/heart-disease-dataset.csv');
        const csvData = response.data;

        // Parse the CSV data
        const rows = csvData.split('\n').map(row => row.split(','));

        // Extract features and labels
        const x = rows.map(row => row.slice(0, -1).map(parseFloat));
        const y = rows.map(row => parseFloat(row[row.length - 1]));

        // Convert data to tensors
        const xs = tf.tensor2d(x);
        const ys = tf.tensor2d(y, [y.length, 1]);

        return { xs, ys };
    } catch (error) {
        console.error('Error loading heart disease dataset:', error);
        return null;
    }
}

// Define and train the model
async function trainHeartDiseaseModel() {
    const { xs, ys } = await loadHeartDiseaseDataset();
    if (xs && ys) {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, inputShape: [xs.shape[1]], activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        model.compile({
            optimizer: 'adam',
            loss: 'binaryCrossentropy',
            metrics: ['accuracy']
        });

        await model.fit(xs, ys, {
            epochs: 50,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
                }
            }
        });

        return model;
    }
}

// Usage
(async () => {
    const model = await trainHeartDiseaseModel();
    if (model) {
        // Make predictions on new data
        const newData = [
            [0.63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1], // Example new data point
            // Add more new data points here if needed
        ];

        // Convert the new data to a tensor
        const newInput = tf.tensor2d(newData);

        // Make predictions
        const predictions = model.predict(newInput) as tf.Tensor;

        // Convert predictions tensor to a JavaScript array
        const predictionsArray = predictions.dataSync();

        // Log predictions
        console.log('Predictions:', predictionsArray);

        // Clean up: dispose tensors
        newInput.dispose();
        predictions.dispose();
    }
})();
