import React, {useEffect} from 'react'
import styles from './Profile.module.css'
import OutputControl from '../assets/InputControl/OutputControl'
import { auth, db } from '../../firebase'
import { Navbar } from '../assets'

function Profile() {

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in', user.uid);
                const userName = user.displayName;

                // Get the Firestore document reference for the user
                // const userRef = db.collection('Users').doc();

                // // Retrieve the user data from Firestore
                // userRef.get().then((doc) => {
                //     if (doc.exists) {
                //         const userData = doc.data();
                //         console.log('User data:', userData);
                //         // Do something with the user data
                //     } else {
                //         console.log('User data not found');
                //     }
                // }).catch((error) => {
                //     console.log('Error getting user data:', error);
                // });
            } else {
                console.log('User is signed out');
            }
        });
    }, []);


  return (
    <section>

        <Navbar />

        <div className={`${styles.profile} `}>
            <div className={styles.profileImage}>
                <img src="https://via.placeholder.com/150" alt="Profile" />

                <button className={styles.uploadBtn}>
                    <i className="fas fa-camera"></i>
                </button>
            </div>
            <div className="grid grid-flow-row-dense grid-cols-2 items-center min-w-[50%] max-w-full gap-2 justify-center">
                <div className="">
                    <OutputControl label="Name" value="Sonu Kumar" />
                </div>
                <div className="">
                    <OutputControl label="Age" value="22 Year" />
                </div>
                <div className="">
                    <OutputControl label="Gender" value="Male" />
                </div>
                <div className="">
                <OutputControl label="Email" value="sonu@gmail.com" />
                </div>
                <div className="">
                <OutputControl label="Phone" value="1234567890" />
                </div>
                <div className="">
                <OutputControl label="Address" value="Bangalore, Karnataka" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default Profile
