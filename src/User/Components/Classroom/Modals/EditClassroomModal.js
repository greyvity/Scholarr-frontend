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

const EditClassroomModal = ({
  editClassroomModal,
  token,
  setEditClassroomModal,
  getClassData,
  classroom,
}) => {
  const [error, setError] = useState("");
  const [className, setClassName] = useState(classroom.className);
  const [classDescription, setClassDescription] = useState(
    classroom.classDescription
  );
  const [classSubject, setClassSubject] = useState(classroom.classSubject);
  const [affiliatedInstitution, setAffiliatedInstitution] = useState(
    classroom.affiliatedInstitution
  );

  const handleEditClass = async (e) => {
    e.preventDefault();
    try {
      const body = {
        className,
        classDescription,
        classSubject,
        affiliatedInstitution,
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
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/update/${classroom._id}`,
        options
      );
      const jsonResponse = await response.json();
      if (jsonResponse.Success) {
        setEditClassroomModal(false);
        getClassData();
      }
      setError(jsonResponse.error?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {editClassroomModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="modal" variants={modal}>
            <h1 style={{ color: "black" }} className="modal-heading">
              EDIT CLASSROOM
            </h1>
            <h3 className="error-message">{error}</h3>
            <motion.form
              style={{ color: "black" }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, y: 100 }}
              action="#"
              onSubmit={handleEditClass}
              className="create-work"
            >
              <div
              //    className="name-input input-fields"
              >
                <label htmlFor="class-name">Name</label>
                <input
                  required
                  type="text"
                  id="class-name"
                  name="className"
                  placeholder="Class Name"
                  //   className="class-name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
              <div
              //   className="description-input input-fields"
              >
                <label htmlFor="class-description">Description</label>
                <input
                  required
                  type="text"
                  id="class-description"
                  name="classDescription"
                  placeholder="Class Description"
                  //   className="class-description"
                  value={classDescription}
                  onChange={(e) => setClassDescription(e.target.value)}
                />
              </div>
              <div
              //   className="subject-input input-fields"
              >
                <label htmlFor="subject">Subject</label>
                <input
                  required
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  //   className="subject"
                  value={classSubject}
                  onChange={(e) => setClassSubject(e.target.value)}
                />
              </div>
              <div
              //   className="subject-input input-fields"
              >
                <label htmlFor="affiliation">Affiliation</label>
                <input
                  type="text"
                  id="affiliation"
                  name="affiliation"
                  placeholder="Affiliation"
                  //   className="affiliation"
                  value={affiliatedInstitution}
                  onChange={(e) => setAffiliatedInstitution(e.target.value)}
                />
              </div>
              <div>
                <input
                  required
                  type="submit"
                  className="add-work-submit"
                  value="Create"
                />
              </div>
            </motion.form>
            <button
              className="add-work-submit cancel"
              onClick={() => setEditClassroomModal(false)}
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditClassroomModal;
