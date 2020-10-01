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

const SubmissionsListModal = ({
  showSubmissionsModal,
  setShowSubmissionsModal,
  classwork,
  token,
  classId,
  extractClassInfo,
  isTeaching,
}) => {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmitMarks = async (e, submission) => {
    e.preventDefault();
    setMessage("Submitting Grades");
    try {
      const body = {
        obtainedGrade: e.target.grades?.value,
      };

      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        method: "PATCH",
        body: JSON.stringify(body),
      };

      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/${classwork._id}/grade_submission/${submission._id}`,
        options
      );
      const jsonResponse = await response.json();
      if (jsonResponse.success) {
        setMessage("Grades Submitted Successfully");
        handleGetSubmission();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSubmission = useCallback(async () => {
    if (classwork.submissions?.length !== 0) {
      try {
        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
        };
        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/${classwork._id}/submissions`,
          options
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.success) {
          setSubmissions(jsonResponse.success.submissions);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [classId, classwork._id, classwork.submissions, token]);

  useEffect(() => {
    handleGetSubmission();
  }, [handleGetSubmission]);

  return (
    <AnimatePresence>
      {showSubmissionsModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
              className="modal-heading"
            >
              Student Submissions
            </motion.h1>
            {message && (
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
                className="success-message"
              >
                {message}
              </motion.h3>
            )}
            <div className="display-invites">
              {submissions &&
                submissions.map((submission) => (
                  <form
                    className="invite-container"
                    key={submission._id}
                    onSubmit={(e) => handleSubmitMarks(e, submission)}
                  >
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://tranquil-woodland-86159.herokuapp.com/${submission.attachments[0]?.location}`}
                      className="attachment"
                    >
                      {submission.attachments[0]?.name}
                    </a>
                    {submission.description && (
                      <p style={{ fontSize: 20 }}>{submission.description}</p>
                    )}
                    <input
                      type="number"
                      name="grades"
                      id="grades"
                      style={{
                        width: 50,
                        border: "2px solid black",
                        borderRadius: 2,
                      }}
                      className="grades"
                      placeholder={submission.obtainedGrade || 0}
                      max={classwork.totalGrade}
                    />{" "}
                    <h3>/{classwork.totalGrade}</h3>
                    <input
                      type="submit"
                      className="accept-icon"
                      value="✔"
                      style={{ width: 50 }}
                    />
                  </form>
                ))}
            </div>
            <div className="submit-actions">
              <button
                className="add-work-submit cancel"
                onClick={() => setShowSubmissionsModal(false)}
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

export default SubmissionsListModal;
