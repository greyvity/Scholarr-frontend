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

const YourWorksModal = ({
  showYourWorksModal,
  classroom,
  classId,
  token,
  setShowYourWorksModal,
  user,
}) => {
  const [submissions, setSubmissions] = useState([]);

  // const handleGetSubmissions = async (e, userId) => {
  //   e.preventDefault();
  //   try {
  //     const options = {
  //       headers: {
  //         "content-type": "application/json",
  //         "auth-token": token,
  //       },
  //     };
  //     const response = await fetch(
  //       `/api/classrooms/${classId}/accept_request/${userId}`,
  //       options
  //     );
  //     const jsonResponse = await response.json();
  //     console.log(jsonResponse);
  //     if (jsonResponse.Success) {
  //       setShowYourWorksModal(false);
  //       extractClassInfo();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleGetSubmissions = useCallback(async () => {
    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };

      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/classworks/submissions/user/${user._id}`,
        options
      );
      const jsonResponse = await response.json();
      if (jsonResponse.success) {
        setSubmissions(jsonResponse.success.submission);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, user._id]);

  useEffect(() => {
    handleGetSubmissions();
  }, [handleGetSubmissions]);

  return (
    <AnimatePresence>
      {showYourWorksModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 className="modal-heading">Your Works</h1>
            <div className="your-works">
              {submissions.map((submission) => (
                <div key={submission.submission._id} className="your-work">
                  <a
                    href={submission.submission.attachments[0]?.location}
                    className="attachment"
                  >
                    {submission.submission.attachments[0]?.fileName} hello
                  </a>
                  <h3 className="grades">
                    {submission.submission.obtainedGrade || "-"}
                  </h3>
                  <h3 className="feedback">
                    {submission.submission.feedback || "-"}
                  </h3>
                </div>
              ))}
            </div>
            <div className="submit-actions">
              <button
                className="add-work-submit cancel"
                onClick={() => setShowYourWorksModal(false)}
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

export default YourWorksModal;
