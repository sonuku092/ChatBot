import * as tf from '@tensorflow/tfjs';
import { loadDataset, preprocessData } from '../utils/utils'; // Assuming you have utility functions to load and preprocess data

async function trainSkinDiseaseModel() {
    // Load and preprocess the dataset
    const { images, labels } = await loadDataset('skin-disease-dataset'); // Replace 'skin-disease-dataset' with your dataset name
    const { xs, ys } = preprocessData(images, labels);

    // Define the model architecture
    const model = tf.sequential();
    model.add(tf.layers.conv2d({
        inputShape: [224, 224, 3],
        kernelSize: 3,
        filters: 16,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    // Compile the model
    model.compile({
        optimizer: 'adam',
        loss: 'sparseCategoricalCrossentropy',
        metrics: ['accuracy']
    });

    // Train the model
    await model.fit(xs, ys, {
        epochs: 10,
        validationSplit: 0.2,
        callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 2 })
    });

    // Save the model
    await model.save('file://./skin-disease-model');
}

// Call the function to train the model
trainSkinDiseaseModel();
