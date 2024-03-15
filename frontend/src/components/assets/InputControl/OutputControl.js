// OutputControl.js
import React from 'react';
import styles from './OutputControl.module.css';

function OutputControl({ label, value }) {
  return (
    <div className={styles.outputContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.output}>{value}</div>
    </div>
  );
}

export default OutputControl;
