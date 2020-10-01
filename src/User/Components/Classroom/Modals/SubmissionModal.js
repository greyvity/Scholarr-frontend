import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
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

const SubmissionModal = ({
  showSubmissionModal,
  setShowSubmissionModal,
  classId,
  token,
  classwork,
  extractClassInfo,
}) => {
  const [submission, setSubmission] = useState({});
  const [description, setDescription] = useState(submission.description);
  const handleWorkSubmission = async (e) => {
    e.preventDefault();
    try {
      if (classwork.classworkType === "Question") {
        const body = {
          description: e.target.description.value,
        };

        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
          method: "POST",
          body: JSON.stringify(body),
        };

        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/${classwork._id}/submit`,
          options
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setShowSubmissionModal(false);
          extractClassInfo();
        }
      } else {
        const fileData = e.target["file-picker"].files[0];
        if (
          window.confirm(
            fileData
              ? "Are you sure you want to submit it?"
              : "No file selected. Do you wish to submit it?"
          )
        ) {
          const attachments = new FormData();
          attachments.append("submissions", fileData);
          attachments.append("description", description);

          const options = {
            headers: {
              "content-type":
                "multipart/form-data; boundary=---------------------------974767299852498929531610575",
              "auth-token": token,
            },
            onUploadProgress: (progressEvent) => {
              console.log(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
              // Clear percentage
              // setTimeout(() => setUploadPercentage(0), 10000);
            },
          };

          const response = await axios.post(
            `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/${classwork._id}/submit`,
            attachments,
            options
          );

          if (response.data.success) {
            setShowSubmissionModal(false);
            extractClassInfo();
          }
        }
      }
    } catch (err) {
      console.log(err);
      window.alert(err);
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
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/${classwork._id}/submissions/detail/${classwork.submissions[0]?.submission}`,
          options
        );
        const jsonResponse = await response.json();
        setSubmission(jsonResponse.success.submission);
        setDescription(jsonResponse.success.submission.description);
      } catch (error) {
        console.log(error);
      }
    }
  }, [classId, token, classwork]);

  useEffect(() => {
    handleGetSubmission();
  }, [handleGetSubmission]);

  return (
    <AnimatePresence>
      {showSubmissionModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 className="modal-heading">
              {classwork.submissions.length === 0
                ? "ADD SUBMISSION"
                : "EDIT SUBMISSION"}
            </h1>
            <div className="attachments">
              {submission.attachments?.map((attachment) => (
                <a
                  key={attachment._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://tranquil-woodland-86159.herokuapp.com/${attachment.location}`}
                  className="attachment"
                >
                  {attachment.name}
                </a>
              ))}
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
              className="question"
            >
              {classwork.title}
            </motion.h2>
            <form
              action="#"
              className="create-work"
              onSubmit={handleWorkSubmission}
              encType="multipart/form-data"
            >
              <div className="description">
                <label htmlFor="description">Answer</label>
                <textarea
                  type="text"
                  placeholder={description || "description"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  id="description"
                />
              </div>
              {classwork.classworkType !== "Question" && (
                <div className="file-picker">
                  <label htmlFor="file-picker">Attachment</label>
                  <input
                    type="file"
                    id="file-picker"
                    name="file-picker"
                    accept="image/*, .pdf, .doc"
                  />
                </div>
              )}
              <div className="submit-actions">
                <input
                  type="submit"
                  value="Submit Work"
                  className="add-work-submit"
                />
              </div>
            </form>
            <button
              className="add-work-submit cancel"
              onClick={() => setShowSubmissionModal(false)}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmissionModal;
