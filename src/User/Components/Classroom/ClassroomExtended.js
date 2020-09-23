import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import ClassworkModal from "./ClassworkModal";
import ClassworksList from "./ClassworksList";
import InvitesModal from "./InvitesModal";
// import Classroom from "./Classroom";

const ClassroomExtended = ({ token, match, user, location }) => {
  const [classDetails, setClassDetails] = useState({});
  const [classworks, setClassworks] = useState([]);
  const [showClassworkModal, setShowClassworkModal] = useState(false);
  const [showInvitesModal, setShowInvitesModal] = useState(false);
  // const [isCreating, setIsCreating] = useState(false);
  const [code, setCode] = useState("Click to Copy Code");

  const extractClassInfo = useCallback(async () => {
    try {
      const classId = match.params.classId;
      const options = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const response = await fetch(
        `/api/classrooms/detail/${classId}`,
        options
      );
      const jsonResponse = await response.json();
      setClassDetails(jsonResponse);

      const classworkOptions = {
        headers: {
          "content-type": "application/json",
          "auth-token": token,
        },
      };
      const classworkResponse = await fetch(
        `/api/classrooms/cw/${classId}/classworks`,
        classworkOptions
      );
      const jsonClassworkResponse = await classworkResponse.json();
      console.log(jsonClassworkResponse.success.classworks);
      setClassworks(jsonClassworkResponse.success.classworks);
    } catch (error) {
      console.log(error);
    }
  }, [token, match.params.classId]);

  useEffect(() => {
    extractClassInfo();
  }, [extractClassInfo]);

  return (
    <motion.div exit={{ y: 1000 }} className="extended classroom-container">
      <ClassworkModal
        showClassworkModal={showClassworkModal}
        setShowClassworkModal={setShowClassworkModal}
        classId={classDetails._id}
        token={token}
        extractClassInfo={extractClassInfo}
      />
      <InvitesModal
        classDetails={classDetails}
        showInvitesModal={showInvitesModal}
        setShowInvitesModal={setShowInvitesModal}
        classId={classDetails._id}
        token={token}
        user={user}
        extractClassInfo={extractClassInfo}
      />
      <div className="inner-container">
        <div className="class-information">
          <h1 className="class-name-header">{classDetails.className}</h1>
          <h2 className="class-desc-header">{classDetails.classDescription}</h2>
          {location.state.isTeaching && (
            <h3 className="invites" onClick={() => setShowInvitesModal(true)}>
              Show Invites
            </h3>
          )}
          <h3
            className="class-code-header"
            onClick={(e) => {
              navigator.clipboard.writeText(classDetails.classCode);
              setCode("Copied Successfully");
              setTimeout(() => {
                setCode("Click To Copy Code");
              }, 1000);
            }}
          >
            {code}
          </h3>
        </div>
        <div className="class-body">
          {location.state.isTeaching && (
            <motion.button
              // animate={{ width: isCreating ? 300 : 50 }}
              onClick={() => setShowClassworkModal(true)}
              className="add-assignments-button"
            >
              <motion.svg
                initial={{ rotate: 0 }}
                animate={
                  {
                    // rotate: isCreating ? 135 : 0,
                  }
                }
                transition={{
                  delay: 0.1,
                }}
                width="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 2L16 30M2 15H30"
                  stroke="black"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
              <h3 className="add-assignments">Add Classworks</h3>
            </motion.button>
          )}
          <div className="classworks-list">
            <h3 className="class-title">Classworks</h3>
            {classworks.map((classwork) => (
              <ClassworksList
                key={classwork._id}
                isTeaching={location.state.isTeaching}
                classwork={classwork}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassroomExtended;
