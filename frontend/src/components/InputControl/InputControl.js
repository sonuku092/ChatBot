// InputControl.js
import React from 'react';
import styles from './InputControl.module.css';

function InputControl({ label, placeholder, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
}

export default InputControl;
