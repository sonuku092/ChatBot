import { Injectable } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class HeartDiseaseService {
    private model: tf.LayersModel | null = null;

    constructor() {
        this.initModel();
    }

    private async loadKerasModel() {
        try {
            // Load the Keras model
            const modelPath = './heart_disease_prediction_model.h5';
            const model = await tf.loadLayersModel('file://' + modelPath);
            return model;
        } catch (error) {
            console.error('Error loading Keras model:', error);
            return null;
        }
    }

    private async initModel() {
        this.model = await this.loadKerasModel();
    }

    async predictHeartDisease(data: any): Promise<number> {
        if (!this.model) {
            console.error('Model not initialized.');
            return -1;
        }

        try {
            // Convert input data to tensor
            const inputData = tf.tensor2d(data, [1, data.length]);

            // Perform prediction using the loaded model
            const prediction = this.model.predict(inputData) as tf.Tensor;

            // Get the predicted value
            const predictionValue = (await prediction.data())[0];

            // Clean up: dispose tensors
            inputData.dispose();
            prediction.dispose();

            return predictionValue;
        } catch (error) {
            console.error('Error during prediction:', error);
            return -1;
        }
    }
}
