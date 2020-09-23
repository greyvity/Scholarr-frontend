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
      window.alert(err);
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
            <h1 className="modal-heading">Student Submissions</h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassworkModal;
