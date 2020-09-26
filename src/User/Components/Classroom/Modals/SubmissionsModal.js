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

  const handleSubmitMarks = async (e, submission) => {
    e.preventDefault();

    const body = {
      obtainedGrade: e.target.grades?.value,
      description: submission.description,
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
      `/api/classrooms/cw/${classId}/classworks/${classwork._id}/update_submission/${submission._id}`,
      options
    );
    const jsonResponse = await response.json();
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
          `/api/classrooms/cw/${classId}/classworks/${classwork._id}/submissions`,
          options
        );
        const jsonResponse = await response.json();
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
            <h1 className="modal-heading">Student Submissions</h1>
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
                      href={`http://localhost:4000/${submission.attachments[0]?.location}`}
                      className="file-name"
                    >
                      {submission.attachments[0]?.name}
                    </a>
                    <input
                      type="number"
                      name="grades"
                      id="grades"
                      placeholder={0}
                      className="grades"
                      max={classwork.totalGrade}
                    />{" "}
                    <h3>/{classwork.totalGrade}</h3>
                    <input type="submit" className="accept-icon" value="✔" />
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
