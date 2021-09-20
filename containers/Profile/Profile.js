import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Link from "next/link";
import styles from "./Profile.module.css";
export default function Profile({ userData }) {
  const { username, profileImg, date } = userData;
  const imagesArray = Array.from(Array(22).keys());
  const [formatedDate, setFormatedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  useEffect(() => {
    if (profileImg) {
      setCurrentProfileImage(profileImg.replace(/\D/g, ""));
      setSelectedImage(profileImg.replace(/\D/g, ""));
    }
  }, [profileImg]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const dayJoined = new Date(date).getDate();
    const mounthJoined = new Date(date).getMonth();
    const yearJoined = new Date(date).getUTCFullYear();
    setFormatedDate(`${dayJoined} ${monthNames[mounthJoined]} ${yearJoined}`);
  }, [date]);

  const handleSelectProfileImage = (image) => setSelectedImage(image);

  return (
    <main className={styles.profile}>
      {/* Profile Info Section */}
      <div className={styles.profile__info + " " + styles.profile__section}>
        <div className={styles.profile__info__userImage}>
          <img src={profileImg} alt={username} />
        </div>
        <div className={styles.profile__info__usernameAndDate}>
          <h1>{username}'s Profile</h1>
          <p>Date joined: {formatedDate}</p>
        </div>
      </div>

      {/* Change Profile Image Section */}
      <div
        className={styles.profile__imageOptions + " " + styles.profile__section}
      >
        <h2>Change profile picture</h2>
        <div className={styles.profile__imageOptions__imagesContainer}>
          {imagesArray.map((image) => {
            return (
              <button
                key={`default-profile-image-${image}-button`}
                onClick={() => handleSelectProfileImage(image.toString())}
                className={
                  `${image}` === selectedImage
                    ? styles.profile__imageOptions__imageContainer__imageOption +
                      " " +
                      styles.profile__imageOptions__imageContainer__selectedImage
                    : styles.profile__imageOptions__imageContainer__imageOption
                }
              >
                {`${image}` === currentProfileImage && (
                  <div
                    className={
                      styles.profile__imageOptions__imageContainer__currentImage
                    }
                  >
                    <i className="fas fa-check"></i>
                  </div>
                )}

                <img
                  src={`/images/default-profile-pictures/image-${image}.jpg`}
                  alt=""
                />
              </button>
            );
          })}
        </div>
        <Button
          value={"Save changes"}
          isDisabled={selectedImage === currentProfileImage}
        />
      </div>

      {/* Change Password Section */}
      <div
        className={
          styles.profile__userChangePassword + " " + styles.profile__section
        }
      >
        <h2>Change password</h2>
        <Link href="/user/reset-password-email-check">Change password</Link>
      </div>
    </main>
  );
}
