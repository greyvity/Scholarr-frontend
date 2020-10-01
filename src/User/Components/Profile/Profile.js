import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
// import ViewYourWorks from "./YourWorksModal";

const Profile = ({ user, token, setUser }) => {
  const [username, setUsername] = useState(user.username || "");
  const [firstName, setfirstName] = useState(user.firstName || "");
  const [middleName, setMiddleName] = useState(user.middleName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [bio, setBio] = useState(user.bio || "");
  const [dob, setdob] = useState(user.dateOfBirth || "");
  const [error, setError] = useState("");
  const [showYourWorks, setShowYourWorks] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = window.prompt(
      "Please Enter Your Password To Make Changes"
    );
    console.log(showYourWorks);

    try {
      const profileDetails = {
        firstName: firstName || user.firstName,
        middleName: middleName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
        dateOfBirth: dob || user.dob,
        password,
      };
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        method: "PATCH",
        body: JSON.stringify(profileDetails),
      };

      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/users/${user._id}/profile/edit/`,
        options
      );

      const jsonResponse = await response.json();
      if (jsonResponse.Success) {
        extractUserInfo();
      }
      setError(jsonResponse.error?.message);
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const extractUserInfo = useCallback(async () => {
    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/users/${user._id}/private`,
        options
      );

      const jsonResponse = await response.json();
      if (jsonResponse._id) {
        setUser(jsonResponse);

        localStorage.setItem("user", JSON.stringify(jsonResponse));
      }
      setError(jsonResponse.error?.message);
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  }, [token, user._id, setUser]);

  useEffect(() => {
    extractUserInfo();
  }, [extractUserInfo]);

  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      className="profile-container"
    >
      {/* {showYourWorks && (
        <ViewYourWorks
          user={user}
          token={token}
          showYourWorksModal={showYourWorks}
          setShowYourWorksModal={setShowYourWorks}
        />
      )} */}
      <h1 className="modal-heading">Profile</h1>
      {error && <h3 className="error-message">{error}</h3>}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
        className="your-works"
        onClick={() => setShowYourWorks(true)}
      >
        View Your Works
      </motion.h2>
      <form
        actionn="#"
        className="create-work profile-form"
        onSubmit={handleSubmit}
      >
        <div className="email">
          <h3>Email</h3>
          <h4>{user.email}</h4>
        </div>
        <div className="username-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder={username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="first-name-input">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder={firstName || "first name"}
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>
        <div className="middle-name-input">
          <label htmlFor="middle-name">Middle Name</label>
          <input
            type="text"
            name="middle-name"
            placeholder={middleName || "Middle Name"}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            id="middle-name"
          />
        </div>
        <div className="last-name-input">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            placeholder={lastName || "Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="bio-input">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            name="bio"
            id="bio"
            placeholder={bio || "Bio"}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="date-picker-container">
          <label htmlFor="date-picker">DateOfBirth</label>
          <input
            type="date"
            name="date-picker"
            value={dob && dob.split("T")[0]}
            onChange={(e) => setdob(e.target.value)}
            id="date-picker"
          />
        </div>

        {/* <div className="file-picker-container">
          <label htmlFor="file-picker">Attachment:</label>
          <input
            type="file"
            id="file-picker"
            name="file-picker"
            accept="image/*, .pdf, .doc"
          />
        </div> */}
        <div className="submit-actions">
          <input type="submit" value="Submit" className="add-work-submit" />
        </div>
      </form>
      {/* </motion.div> */}
    </motion.div>
  );
};
export default Profile;
