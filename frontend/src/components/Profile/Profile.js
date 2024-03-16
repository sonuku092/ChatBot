import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import OutputControl from "../assets/InputControl/OutputControl";
import { auth, db, storage } from "../../firebase";
import { Navbar } from "../assets";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in", user.uid);
        const fetchData = async () => {
          try {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              setUserData(docSnap.data());

              getDownloadURL(ref(storage, "./ProfileUrl/pexels-yuliya-strizhkina-1198802.jpg"))
                .then((url) => {
                  setImage(url);
                })
                .catch((error) => {
                  console.log("Error getting document:", error);
                });
            } else {
              console.log("No such document!");
              setUserData(null);
            }
          } catch (error) {
            console.log("Error getting document:", error);
            setUserData(null);
          }
        };

        fetchData();
      } else {
        console.log("User is signed out");
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section>
      <Navbar />
      <div className={`${styles.profile} `}>
        {userData && (
          <div className={styles.profileImage}>
            <img src={image} alt="Profile" />
            <button className={styles.uploadBtn}>
              <i className="fas fa-camera"></i>
            </button>
          </div>
        )}
        {!userData && (
          <div className={styles.profileImage}>
            <img src={image} alt="Profile" />
            <button className={styles.uploadBtn}>
              <i className="fas fa-camera"></i>
            </button>
          </div>
        )}

        <div className="grid grid-flow-row-dense grid-cols-2 items-center min-w-[50%] max-w-full gap-2 justify-center">
          {userData && (
            <>
              {userData.Name && (
                <OutputControl label="Name" value={userData.Name} />
              )}
              {userData.Username && (
                <OutputControl label="Username" value={userData.Username} />
              )}
              {userData.Age && (
                <OutputControl label="Age" value={userData.Age} />
              )}
              {userData.Gender && (
                <OutputControl label="Gender" value={userData.Gender} />
              )}
              {userData.Email && (
                <OutputControl label="Email" value={userData.Email} />
              )}
              {userData.Address && (
                <OutputControl label="Address" value={userData.Address} />
              )}
              {userData.Phone && (
                <OutputControl label="Phone" value={userData.Phone} />
              )}
            </>
          )}
          {!userData && (
            <>
              <OutputControl label="Name" value="......." />
              <OutputControl label="Email" value="......." />
              <OutputControl label="Username" value="......." />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
