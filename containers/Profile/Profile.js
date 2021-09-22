import { useState, useEffect, useContext } from "react";
import Button from "../../components/Button/Button";
import Link from "next/link";
import styles from "./Profile.module.css";
import ProjectContext from "../../context/Project-context";
import Image from "next/image";
export default function Profile() {
  const context = useContext(ProjectContext);
  const { username, profileImg, date } = context.userData;
  const { handleChangeProfileImage } = context;
  const [imageChangerState, setImageChangerState] = useState({
    imagesArray: Array.from(Array(22).keys()),
    selectedImage: "",
    currentProfileImage: "",
  });
  const { imagesArray, selectedImage, currentProfileImage } = imageChangerState;
  const [formatedDate, setFormatedDate] = useState("");
  useEffect(() => {
    if (profileImg) {
      const profileImgNumber = profileImg.replace(/\D/g, "");
      setImageChangerState((prevState) => ({
        ...prevState,
        selectedImage: profileImgNumber,
        currentProfileImage: profileImgNumber,
      }));
    }
  }, [context.userData]);
  console.log(imageChangerState);

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

  const handleSelectProfileImage = (image) =>
    setImageChangerState((prevState) => ({
      ...prevState,
      selectedImage: image,
    }));

  return (
    <main className={styles.profile}>
      {/* Profile Info Section */}
      {context.userData.profileImg && (
        <div className={styles.profile__info + " " + styles.profile__section}>
          <div className={styles.profile__info__userImage}>
            <Image
              src={profileImg}
              alt={username}
              width="149"
              height="150"
              loading="eager"
            />
          </div>
          <div className={styles.profile__info__usernameAndDate}>
            <h1>{username}'s Profile</h1>
            <p>Account created: {formatedDate}</p>
          </div>
        </div>
      )}

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

                <Image
                  src={`/images/default-profile-pictures/image-${image}.jpg`}
                  alt=""
                  width="149"
                  height="150"
                  layout="responsive"
                  loading="eager"
                />
              </button>
            );
          })}
        </div>
        <Button
          value={"Save changes"}
          isDisabled={selectedImage === currentProfileImage}
          func={() =>
            handleChangeProfileImage(
              `/images/default-profile-pictures/image-${selectedImage}.jpg`
            )
          }
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
