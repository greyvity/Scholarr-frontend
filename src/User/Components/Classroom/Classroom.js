import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Classroom = ({ token }) => {
  /** state variables */
  const [classrooms, setClassrooms] = useState();
  const [isCreating, setIsCreating] = useState(false);

  const handleAdd = () => {
    setIsCreating(!isCreating);
    // navigator.clipboard.writeText("Copied successfully"); // use it to copy to clipboard
  };

  const handleSubmitClass = async (e) => {
    try {
      e.preventDefault();
      const formData = e.target;
      const classAttributes = {
        className: formData.className.value,
        classDescription: formData.classDescription.value,
        classSubject: formData.subject.value,
        affiliatedInstitution: formData.affiliation.value,
      };
      console.log(classAttributes);

      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        method: "POST",
        body: JSON.stringify(classAttributes),
      };
      const response = await fetch("/api/classrooms/create", options);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.success) {
        setIsCreating(false);
        getClassData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClassData = useCallback(async () => {
    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const response = await fetch("/api/classrooms/", options);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      setClassrooms([...jsonResponse]);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    console.log("firing");
    getClassData();
  }, [getClassData]);

  const parentVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
    exit: {
      y: -100,
    },
  };
  const childVariants = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };

  return (
    <motion.div exit={{ y: 1000 }} className="classroom-container">
      <h1 className="section-title">You are teaching</h1>
      {/* <motion.div className="classrooms"> */}
      <AnimatePresence exitBeforeEnter>
        {classrooms && (
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="classrooms"
          >
            {classrooms.map((classroom) => (
              <motion.div
                variants={childVariants}
                key={classroom._classId}
                className="classroom"
              >
                <h1>{classroom.className}</h1>
                <div className="actions">
                  <h5 className="delete-action">bin</h5>
                </div>
              </motion.div>
            ))}

            <motion.div
              // variants={lastchildVariants}
              initial={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                width: isCreating ? "500px" : "200px",
                height: isCreating ? "300px" : "200px",
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -10,
                opacity: 0,
              }}
              className="create-classroom classroom"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  justifyContent: "center",
                }}
                animate={{
                  justifyContent: isCreating ? "space-between" : "center",
                  opacity: 1,
                  transition: {
                    justifyContent: {
                      type: "spring",
                      stiffness: 700,
                      damping: 30,
                    },
                  },
                }}
                className="open-close-form"
              >
                {isCreating && (
                  <motion.h3
                    initial={{ x: 400, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                      },
                    }}
                    className="class-text"
                  >
                    Create a new class
                  </motion.h3>
                )}
                <motion.svg
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isCreating ? 135 : 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  onClick={handleAdd}
                  width="30"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2L16 30M2 15H30"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </motion.div>
              <AnimatePresence exitBeforeEnter>
                {isCreating && (
                  <motion.form
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    exit={{ opacity: 0, y: 100 }}
                    action="#"
                    onSubmit={handleSubmitClass}
                    className="create-classroom-form"
                  >
                    <div className="name-input input-fields">
                      <label htmlFor="class-name">Class Name</label>
                      <input
                        required
                        type="text"
                        id="class-name"
                        name="className"
                        className="class-name"
                      />
                    </div>
                    <div className="description-input input-fields">
                      <label htmlFor="class-description">Description</label>
                      <input
                        required
                        type="text"
                        id="class-description"
                        name="classDescription"
                        className="class-description"
                      />
                    </div>
                    <div className="subject-input input-fields">
                      <label htmlFor="subject">Subject</label>
                      <input
                        required
                        type="text"
                        id="subject"
                        name="subject"
                        className="subject"
                      />
                    </div>
                    <div className="subject-input input-fields">
                      <label htmlFor="affiliation">Affiliation</label>
                      <input
                        type="text"
                        id="affiliation"
                        name="affiliation"
                        className="affiliation"
                      />
                    </div>
                    <input
                      required
                      type="submit"
                      className="create-classroom-submit"
                      value="Create"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Classroom;
