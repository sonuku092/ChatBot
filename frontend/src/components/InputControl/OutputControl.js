// OutputControl.js
import React from 'react';
import styles from './OutputControl.module.css';

function OutputControl({ label, value }) {
  return (
    <div className={styles.outputContainer}>
      <div className={styles.output}>{value}</div>
      <label className={styles.label}>{label}</label>
    </div>
  );
}

export default OutputControl;
