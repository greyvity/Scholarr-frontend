import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

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

const ClassworkModal = ({
  showClassworkModal,
  classId,
  token,
  setShowClassworkModal,
  extractClassInfo,
}) => {
  const [workType, setWorkType] = useState("Assignment");
  const [error, setError] = useState("");

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      const type = e.target["work-type"].value.toLowerCase();

      if (!(workType === "general" || workType === "question")) {
        let files;
        files = e.target["file-picker"].files[0];

        const attachments = new FormData();

        switch (type) {
          case "material": {
            attachments.append("attachments", files);
            attachments.append("title", e.target["work-title"].value);
            attachments.append(
              "description",
              e.target["work-description"].value
            );
            break;
          }
          case "question": {
            attachments.append("title", e.target["work-title"].value);
            attachments.append(
              "description",
              e.target["work-description"].value
            );
            attachments.append("deadlineDate", e.target["date-picker"].value);
            break;
          }
          default:
            attachments.append("attachments", files);
            attachments.append("title", e.target["work-title"].value);
            attachments.append(
              "description",
              e.target["work-description"].value
            );
            attachments.append("deadlineDate", e.target["date-picker"].value);
            attachments.append("totalGrade", e.target["total-marks"].value);
            break;
        }

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
          `/api/classrooms/cw/${classId}/classworks/create_${type}`,
          attachments,
          options
        );

        if (response.data.success) {
          setShowClassworkModal(false);
          extractClassInfo();
        }
      } else {
        let workBody = {
          title: e.target["work-title"].value,
          description: e.target["work-description"].value,
        };

        if (type === "question") {
          workBody["totalGrade"] = e.target["total-marks"].value;
          workBody["deadlineDate"] = e.target["date-picker"].value;
        }

        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
          method: "POST",
          body: JSON.stringify(workBody),
        };

        const response = await fetch(
          `/api/classrooms/cw/${classId}/classworks/create_${type}`,
          options
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setShowClassworkModal(false);
          extractClassInfo();
        }
        setError(jsonResponse.error?.message);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      // window.alert(err);
    }
  };

  return (
    <AnimatePresence>
      {showClassworkModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 className="modal-heading">ADD WORK</h1>
            <form
              actionn="#"
              className="create-work"
              encType="multipart/form-data"
              onSubmit={handleAddWork}
            >
              {error && <h3 className="error-message">{error}</h3>}
              <div className="work-type-container">
                <label htmlFor="work-type">Type</label>
                <select
                  required
                  name="work-type"
                  id="work-type"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Question">Question</option>
                  <option value="General">General</option>
                  <option value="Test">Test</option>
                  <option value="Material">Material</option>
                </select>
              </div>
              <div className="work-title-input">
                <label htmlFor="work-title">Title</label>
                <input
                  required
                  type="text"
                  name="work-title"
                  id="work-title"
                  placeholder="title"
                />
              </div>
              <div className="work-description-input">
                <label htmlFor="work-description">Description</label>
                <textarea
                  required
                  name="work-description"
                  placeholder="description"
                  id="work-description"
                />
              </div>
              {workType === "General" ||
                workType === "Question" ||
                workType === "Material" || (
                  <div className="total-marks-container">
                    <label htmlFor="total-marks">Total Marks</label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      required
                      placeholder="total marks"
                      name="total-marks"
                      id="total-marks"
                    />
                  </div>
                )}
              {workType === "General" || workType === "Material" || (
                <div className="date-picker-container">
                  <label htmlFor="date-picker">Deadline</label>
                  <input
                    type="date"
                    name="date-picker"
                    required
                    id="date-picker"
                  />
                </div>
              )}
              {workType === "General" || (
                <div className="file-picker-container">
                  <label htmlFor="file-picker">Attachment:</label>
                  <input
                    required
                    type="file"
                    id="file-picker"
                    name="file-picker"
                    accept="image/*, .pdf, .doc"
                  />
                </div>
              )}
              <div className="submit-actions">
                <input type="submit" value="Add" className="add-work-submit" />
                <button
                  className="add-work-submit cancel"
                  onClick={() => setShowClassworkModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassworkModal;
