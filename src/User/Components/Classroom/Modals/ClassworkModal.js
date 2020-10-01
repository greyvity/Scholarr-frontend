import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { addToDo } from "../../Integrations/TodoClassroom";
// import * as Google from "../../Integrations/Google";

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
  user,
  setShowClassworkModal,
  extractClassInfo,
  classroom,
}) => {
  const [workType, setWorkType] = useState("Assignment");
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  console.log(members);
  const handleGetUsers = useCallback(async () => {
    try {
      const users = classroom?.classMembers?.enrolledMembers;
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
        console.log(response);
        const jsonResponse = await response.json();
        setMembers(jsonResponse);
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }, [token, classroom]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      const type = e.target["work-type"].value.toLowerCase();

      if (type === "general" || type === "question") {
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
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/create_${type}`,
          options
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          setShowClassworkModal(false);
          extractClassInfo();
        }
        setError(jsonResponse.error?.message);
      } else {
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
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/create_${type}`,
          attachments,
          options
        );

        if (response.data.success) {
          setShowClassworkModal(false);
          extractClassInfo();
          if (type !== "material") {
            if (window.confirm("Add To your todo?")) {
              const newTodo = {
                description: `Check ${response.data.success.classworkDetails.title} of class ${classroom.className}`,
                priority: "Medium",
                completed: false,
                responsible: "myself",
                user,
                token,
              };
              addToDo(newTodo);
              //   const emails = [];
              //   members.forEach((member) => emails.push({ email: member.email }));
              //   const temp = response.data.success.classworkDetails.attachments[0].location
              //     .split("\\")
              //     .join("/");
              //   console.log(emails);
              //   const event = {
              //     summary: `${response.data.success.classworkDetails.title} of class ${classroom.className}`,
              //     description: response.data.success.classworkDetails.description,
              //     start: {
              //       dateTime: response.data.success.classworkDetails.deadlineDate,
              //       timeZone: "Asia/Kathmandu",
              //     },
              //     end: {
              //       dateTime: response.data.success.classworkDetails.deadlineDate,
              //       timeZone: "Asia/Kathmandu",
              //     },
              //     attendees: { email: "sthasuraj2@gmail.com" },
              //     reminders: {
              //       useDefault: true,
              //     },
              //     source: {
              //       title: "Assignment",
              //       url: `http://localhost:4000/${temp}`,
              //     },
              //   };
              //   Google.handleClick("addEvent", event);
              // }
            }
          }
        }
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
          <motion.div
            // style={{ width: "50%" }}
            className="modal"
            variants={modal}
          >
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
              {workType === "General" || workType === "Material" || (
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
                    type="datetime-local"
                    name="date-picker"
                    required
                    id="date-picker"
                  />
                </div>
              )}
              {workType === "General" || workType === "Question" || (
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
