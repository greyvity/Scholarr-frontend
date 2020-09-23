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

const InvitesModal = ({
  showInvitesModal,
  classDetails,
  classId,
  token,
  setShowInvitesModal,
  extractClassInfo,
  user,
}) => {
  const [pendingUsers, setPendingUsers] = useState([]);

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
      console.log(jsonResponse);
      if (jsonResponse.Success) {
        setShowInvitesModal(false);
        extractClassInfo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetUsers = useCallback(async () => {
    try {
      const users = classDetails?.classMembers?.memberRequest;

      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      let tempCollection = [];
      for (let user in users) {
        const response = await fetch(`/api/users/${users[user]}`, options);
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        tempCollection = [...tempCollection, { ...jsonResponse }];
        console.log(tempCollection);
      }
      setPendingUsers(tempCollection);
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
      {showInvitesModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 className="modal-heading">Invites</h1>
            <div className="display-invites">
              {pendingUsers &&
                pendingUsers.map((pendingUser) => (
                  <div className="invite-container" key={pendingUser.id}>
                    <li className="invite">{pendingUser.email}</li>
                    <h4
                      className="accept-icon"
                      onClick={(e) => handleAcceptInvite(e, pendingUser.id)}
                    >
                      ✔
                    </h4>
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvitesModal;
