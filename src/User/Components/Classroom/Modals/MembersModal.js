import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCallback } from "react";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const MembersModal = ({
  showModal,
  classDetails,
  classId,
  token,
  user,
  setShowModal,
}) => {
  const [members, setMembers] = useState([]);

  const handleGetUsers = useCallback(async () => {
    try {
      const users = classDetails?.classMembers?.enrolledMembers;
      if (users) {
        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
          method: "POST",
          body: JSON.stringify({
            userGroup: users,
          }),
        };

        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/users/group_users`,
          options
        );
        const jsonResponse = await response.json();
        setMembers(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }, [token, classDetails]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 className="modal-heading">Members</h1>
            <div className="display-invites">
              <div className="invite-container">
                <li className="invite" style={{ fontWeight: "bold" }}>
                  Email
                </li>
                <li className="invite" style={{ fontWeight: "bold" }}>
                  Username
                </li>
              </div>
              {members &&
                members.map((member) => (
                  <div className="invite-container" key={member._id}>
                    <li className="invite">{member.email}</li>
                    <li className="invite">{member.username}</li>
                  </div>
                ))}
            </div>
            <div className="submit-actions">
              <input type="submit" value="Add" className="add-work-submit" />
              <button
                className="add-work-submit cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MembersModal;
