import { Controller, Post, Body } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs';

@Controller('heart-disease')
export class HeartDiseaseModel {
  private model: tf.LayersModel | null = null;

  constructor() {
    this.initModel();
  }

  private async loadKerasModel() {
    try {
      // Load the Keras model
      const modelPath = './heart_disease_prediction_model.h5';
      return await tf.loadLayersModel('file://' + modelPath);
    } catch (error) {
      console.error('Error loading Keras model:', error);
      return null;
    }
  }

  private async initModel() {
    this.model = await this.loadKerasModel();
  }

  @Post('predict')
  async predict(@Body() data: number[][]): Promise<number[]> {
    if (!this.model) {
      console.error('Model not initialized.');
      return [];
    }

    try {
      // Standardize the input data (assuming you're using the same scaler used during training)
      const scaler = JSON.parse(fs.readFileSync('./scaler.json', 'utf8'));
      data = data.map((datapoint: number[]) => scaler.transform([datapoint]));

      // Make predictions
      const predictions = this.model.predict(tf.tensor2d(data)) as tf.Tensor;

      // Convert predictions tensor to a JavaScript array
      const predictionsArray: number[] = Array.from(predictions.dataSync());

      // Clean up: dispose tensors
      predictions.dispose();

      return predictionsArray;
    } catch (error) {
      console.error('Error during prediction:', error);
      return [];
    }
  }
}
