import { Controller, Post, Body } from '@nestjs/common';
import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs';

@Controller('predict')
export class HeartDiseaseModel {
  private model: tf.LayersModel | null = null;

  constructor() {
    this.initModel();
  }

  private loadHeartDiseaseDataset() {
    try {
      // Load the CSV data
      const csvData = fs.readFileSync('./data/heart.csv', 'utf8');

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

  private async trainHeartDiseaseModel() {
    const { xs, ys } = this.loadHeartDiseaseDataset();
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

  private async initModel() {
    this.model = await this.trainHeartDiseaseModel();
  }

  @Post()
  async predict(@Body() data: number[][]): Promise<number[]> {
    if (!this.model) {
      console.error('Model not initialized.');
      return [];
    }

    try {
      // Convert the new data to a tensor
    const newInput = tf.tensor2d(data);

    // Make predictions
    const predictions = this.model.predict(newInput) as tf.Tensor;

    // Convert predictions tensor to a JavaScript array
    const predictionsArray = Array.from(predictions.dataSync());

    // Clean up: dispose tensors
    newInput.dispose();
    predictions.dispose();

    return predictionsArray;
    } catch (error) {
      console.error('Error during prediction:', error);
      return [];
    }
  }
}
