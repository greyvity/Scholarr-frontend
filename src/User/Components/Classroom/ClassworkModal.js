import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleAddWork = async (e) => {
    e.preventDefault();
    try {
      const type = e.target["work-type"].value.toLowerCase();
      let workBody;
      switch (type) {
        case "question": {
          workBody = {
            title: e.target["work-title"].value,
            description: e.target["work-description"].value,
            deadlineDate: e.target["date-picker"].value,
          };
          break;
        }
        case "material":
        case "general":
        case "description": {
          workBody = {
            title: e.target["work-title"].value,
            description: e.target["work-description"].value,
          };
          break;
        }
        default:
          workBody = {
            title: e.target["work-title"].value,
            description: e.target["work-description"].value,
            totalGrade: e.target["total-marks"].value,
            deadlineDate: e.target["date-picker"].value,
          };
          break;
      }
      console.log(workBody);

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
      console.log(jsonResponse);
      if (jsonResponse.success) {
        setShowClassworkModal(false);
        extractClassInfo();
      }
    } catch (err) {
      console.log(err);
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
            <form actionn="#" className="create-work" onSubmit={handleAddWork}>
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
                  type="text"
                  name="work-title"
                  id="work-title"
                  placeholder="title"
                />
              </div>
              <div className="work-description-input">
                <label htmlFor="work-description">Description</label>
                <textarea
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
                      placeholder="total marks"
                      name="total-marks"
                      id="total-marks"
                    />
                  </div>
                )}
              {workType === "General" || workType === "Material" || (
                <div className="date-picker-container">
                  <label htmlFor="date-picker">Deadline</label>
                  <input type="date" name="date-picker" id="date-picker" />
                </div>
              )}
              {workType !== "Assignment" ||
                workType !== "Question" ||
                workType !== "Test" || (
                  <div className="file-picker-container">
                    <label htmlFor="file-picker">Attachment:</label>
                    <input
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

// (
//   <div className="order-place-modal">
//     <div className="order-placed">
//       <h1>Order Placed</h1>
//       <h2>You will be notified on your cell phone shortly.</h2>
//       <h2>Feel free to go through our website.</h2>
//       <h2>Here's some things you might be interested in</h2>
//       <button className="price">Wash your hands</button>
//       <Link to="/">
//         <button className="price">Back to our site</button>
//       </Link>
//       <Link to="/gallery">
//         <button className="price">
//           A Visual Walkthrough of our restaurant
//         </button>
//       </Link>
//       <Link to="/menu">
//         <button className="price">More Fooooood</button>
//       </Link>
//       <button className="price"> Know More About The Developer :v</button>
//     </div>
//     <div className="background"></div>
//   </div>
// ) : (
//   ""
// )
