import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClassroomShortened from "./ClassroomShortened";

const Classroom = ({ token, user, isLoading, setIsLoading }) => {
  /** state variables */
  const [teachingClassrooms, setTeachingClassrooms] = useState();
  const [attendingClassrooms, setAttendingClassrooms] = useState();
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const handleAdd = () => {
    setIsCreating(!isCreating);
    // navigator.clipboard.writeText("Copied successfully"); // use it to copy to clipboard
  };
  const handleJoin = () => {
    setIsJoining(!isJoining);
    // navigator.clipboard.writeText("Copied successfully"); // use it to copy to clipboard
  };

  const handleSubmitClass = async (e) => {
    setIsLoading(true);

    try {
      e.preventDefault();
      const formData = e.target;
      const classAttributes = {
        className: formData.className.value,
        classDescription: formData.classDescription.value,
        classSubject: formData.subject.value,
        affiliatedInstitution: formData.affiliation.value,
      };

      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
        method: "POST",
        body: JSON.stringify(classAttributes),
      };
      const response = await fetch(
        "https://tranquil-woodland-86159.herokuapp.com/api/classrooms/create",
        options
      );
      setIsLoading(false);

      const jsonResponse = await response.json();
      if (jsonResponse.success) {
        setIsCreating(false);
        getClassData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClass = async (classroom) => {
    setIsLoading(true);
    try {
      if (window.confirm("Are you sure you want to Delete this class?")) {
        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
          method: "DELETE",
        };

        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/delete/${classroom._id}`,
          options
        );
        setIsLoading(false);
        const jsonResponse = await response.json();
        if (jsonResponse.success) {
          getClassData();
          window.alert("Class Deleted Successfully");
        }
      } else {
        window.alert("Deletion Cancelled.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClassData = useCallback(async () => {
    setIsLoading(true);
    try {
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const response = await fetch(
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/user/${user._id}`,
        options
      );
      setIsLoading(false);

      const jsonResponse = await response.json();
      if (!response.ok) throw jsonResponse.error;
      setAttendingClassrooms(jsonResponse.classesAttending);
      setTeachingClassrooms(jsonResponse.classesTeaching);
    } catch (error) {
      console.log(error);
      // window.alert(error.message);
    }
  }, [token, user._id, setIsLoading]);

  const handleJoinClass = async (e) => {
    try {
      e.preventDefault();
      if (window.confirm("Are you sure you want to join this class?")) {
        const classAttributes = {
          classCode: e.target.classCode.value,
        };

        const options = {
          headers: {
            "content-type": "application/json",
            "auth-token": token,
          },
          method: "POST",
          body: JSON.stringify(classAttributes),
        };
        const response = await fetch(
          "https://tranquil-woodland-86159.herokuapp.com/api/classrooms/request",
          options
        );
        const jsonResponse = await response.json();
        if (jsonResponse.Success) {
          setIsJoining(false);
          window.alert(
            "You will be able to view your class once your teacher accepts your request"
          );
          getClassData();
        }
      } else {
        window.alert("Invite cancelled by sender.");
        e.target.classCode.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
      <div className="temp">
        <h1 className="section-title">You are Teaching</h1>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="classrooms"
          >
            {teachingClassrooms?.map((classroom) => (
              <motion.div
                variants={childVariants}
                key={classroom._id}
                // className="classroom"
              >
                <ClassroomShortened
                  isTeaching={true}
                  token={token}
                  classroom={classroom}
                  getClassData={getClassData}
                  handleDeleteClass={handleDeleteClass}
                ></ClassroomShortened>
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
                        placeholder="Class Name"
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
                        placeholder="Class Description"
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
                        placeholder="Subject"
                        className="subject"
                      />
                    </div>
                    <div className="subject-input input-fields">
                      <label htmlFor="affiliation">Affiliation</label>
                      <input
                        type="text"
                        id="affiliation"
                        name="affiliation"
                        placeholder="Affiliation"
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
        </AnimatePresence>
      </div>

      <div className="temp">
        <h1 className="section-title">You are Attending</h1>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            variants={parentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="classrooms"
          >
            {attendingClassrooms?.map((classroom) => (
              <motion.div
                variants={childVariants}
                key={classroom._classId}
                // className="classroom"
              >
                <ClassroomShortened
                  classroom={classroom}
                  isTeaching={false}
                ></ClassroomShortened>
              </motion.div>
            ))}

            <motion.div
              // variants={lastchildVariants}
              initial={{
                y: 30,
                opacity: 0,
              }}
              animate={{
                width: isJoining ? "300px" : "200px",
                height: isJoining ? "250px" : "200px",
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
                  justifyContent: isJoining ? "space-between" : "center",
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
                {isJoining && (
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
                    Join Class
                  </motion.h3>
                )}
                <motion.svg
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: isJoining ? 135 : 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                  onClick={handleJoin}
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
                {isJoining && (
                  <motion.form
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    exit={{ opacity: 0, y: 100 }}
                    action="#"
                    onSubmit={handleJoinClass}
                    className="create-classroom-form"
                  >
                    <div className="name-input input-fields">
                      <label htmlFor="class-code">Class Code</label>
                      <input
                        required
                        type="text"
                        id="class-code"
                        name="classCode"
                        placeholder="code"
                        className="class-code"
                      />
                    </div>
                    <input
                      required
                      type="submit"
                      className="create-classroom-submit create-classroom-join"
                      value="Join"
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Classroom;
