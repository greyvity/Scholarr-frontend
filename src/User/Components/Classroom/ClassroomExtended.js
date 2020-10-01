import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import ClassworkModal from "./Modals/ClassworkModal";
import ClassworksList from "./ClassworksList";
import InvitesModal from "./Modals/InvitesModal";
import ViewYourWorks from "../Profile/YourWorksModal";
import MembersModal from "./Modals/MembersModal";
// import Classroom from "./Classroom";

const ClassroomExtended = ({ token, match, user, location }) => {
  const [classDetails, setClassDetails] = useState({});
  const [showYourWorksModal, setShowYourWorksModal] = useState(false);
  const [classworks, setClassworks] = useState([]);
  const [showClassworkModal, setShowClassworkModal] = useState(false);
  const [showInvitesModal, setShowInvitesModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
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
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/detail/${classId}`,
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
        `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks`,
        classworkOptions
      );
      const jsonClassworkResponse = await classworkResponse.json();
      setClassworks(jsonClassworkResponse.success.classworks);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  }, [token, match.params.classId]);

  useEffect(() => {
    extractClassInfo();
  }, [extractClassInfo]);

  return (
    <motion.div exit={{ y: 1000 }} className="extended classroom-container">
      <ClassworkModal
        classroom={classDetails}
        showClassworkModal={showClassworkModal}
        setShowClassworkModal={setShowClassworkModal}
        classId={classDetails._id}
        token={token}
        user={user}
        extractClassInfo={extractClassInfo}
      />
      <ViewYourWorks
        showYourWorksModal={showYourWorksModal}
        setShowYourWorksModal={setShowYourWorksModal}
        classroom={classDetails}
        token={token}
        user={user}
        classId={match.params.classId}
        extractClassInfo={extractClassInfo}
      />
      <MembersModal
        showModal={showMembersModal}
        setShowModal={setShowMembersModal}
        classDetails={classDetails}
        token={token}
        user={user}
        classId={match.params.classId}
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
          {location.state.isTeaching ? (
            <h3 className="invites" onClick={() => setShowInvitesModal(true)}>
              Show Invites
            </h3>
          ) : (
            <h3 className="invites" onClick={() => setShowYourWorksModal(true)}>
              Show Your Submissions
            </h3>
          )}
          <h3 className="invites" onClick={() => setShowMembersModal(true)}>
            Show Members
          </h3>
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
                animate={{
                  rotate: showClassworkModal ? -45 : 0,
                }}
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
            {classworks
              .slice(0)
              .reverse()
              .map((classwork) => (
                <ClassworksList
                  key={classwork._id}
                  isTeaching={location.state.isTeaching}
                  classwork={classwork}
                  token={token}
                  user={user}
                  classroom={classDetails}
                  classId={match.params.classId}
                  extractClassInfo={extractClassInfo}
                />
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassroomExtended;
