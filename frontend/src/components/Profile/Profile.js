import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import OutputControl from '../assets/InputControl/OutputControl';
import { Navbar } from '../assets';
import { auth, db } from '../../firebase';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in', user.uid);

                // Get the Firestore document reference for the user
                const userRef = db.collection('Users').doc(user.uid);

                // Retrieve the user data from Firestore
                userRef.get().then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        console.log('User data:', userData);
                        setUserData(userData);
                    } else {
                        console.log('User data not found');
                    }
                }).catch((error) => {
                    console.log('Error getting user data:', error);
                });
            } else {
                console.log('User is signed out');
                setUserData(null); // Reset user data when user signs out
            }
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from the auth listener
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
                    {userData && Object.entries(userData).map(([key, value]) => (
                        <div key={key}>
                            <OutputControl label={key} value={value} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Profile;
