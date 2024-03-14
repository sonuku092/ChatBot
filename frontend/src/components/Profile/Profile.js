import React from 'react'
import styles from './Profile.module.css'
import OutputControl from '../InputControl/OutputControl'
import { Firestore } from 'firebase/firestore'
import { db } from '../../firebase'

function Profile() {


  return (
    <div className={styles.container}>
        <div className={styles.profile}>
            <div className={styles.profileImage}>
                <img src="https://via.placeholder.com/150" alt="Profile" />

                <button className={styles.uploadBtn}>
                    <i className="fas fa-camera"></i>
                </button>
            </div>
            <div className="grid grid-flow-row-dense grid-cols-2 items-center grid-rows-3 gap-2 justify-center">
                <div className="w-[480px]">
                    <OutputControl label="Name" value="Sonu Kumar" />
                </div>
                <div className="w-[480px]">
                    <OutputControl label="Age" value="22 Year" />
                </div>
                <div className="w-[480px]">
                    <OutputControl label="Gender" value="Male" />
                </div>
                <div className="w-[480px]">
                <OutputControl label="Email" value="sonu@gmail.com" />
                </div>
                <div className="w-[480px]">
                <OutputControl label="Phone" value="1234567890" />
                </div>
                <div className="w-[480px]">
                <OutputControl label="Address" value="Bangalore, Karnataka" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
