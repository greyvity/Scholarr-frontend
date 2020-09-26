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

  const handleAcceptInvite = async (e, userId) => {
    e.preventDefault();
    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const response = await fetch(
        `/api/classrooms/${classId}/accept_request/${userId}`,
        options
      );
      const jsonResponse = await response.json();
      if (jsonResponse.Success) {
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUsers = useCallback(async () => {
    try {
      const users = classDetails?.classMembers?.enrolledMembers;
      if (users) {
        console.log(classDetails.classMembers);
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
        console.log(options);

        const response = await fetch(`/api/users/group_users`, options);
        console.log(response);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        //   setMembers(jsonResponse);
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
              {members &&
                members.map((member) => (
                  <div className="invite-container" key={member.id}>
                    <li className="invite">{member.email}</li>
                    <h4
                      className="accept-icon"
                      onClick={(e) => handleAcceptInvite(e, member.id)}
                    >
                      ✔
                    </h4>
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
