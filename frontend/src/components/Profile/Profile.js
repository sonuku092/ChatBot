import React from 'react'
import styles from './Profile.module.css'

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
            <div className={styles.profileDetails}>
                <h1>John Doe</h1>
                <p>
                    <strong>Email:</strong>
                    <span>
                        sonukumar@gmail.com
                    </span>
                </p>
                <p>
                    <strong>Phone:</strong>
                    <span>

                    </span>
                </p>

                <p>
                    <strong>Address:</strong>
                    <span>
                        Darbhanga, Bihar - 846004 
                    </span>
                </p>

                <p>
                    <strong>City:</strong>
                    <span>

                    </span>
                </p>

                <p>

                    <strong>State:</strong>
                    <span>

                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Profile
