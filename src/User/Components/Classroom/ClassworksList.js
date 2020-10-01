import React, { useState } from "react";
import SubmissionModal from "./Modals/SubmissionModal";
import SubmissionsListModal from "./Modals/SubmissionsModal";
import EditClassworksModal from "./Modals/EditClassworksModal";

const ClassworksList = ({
  classwork,
  isTeaching,
  token,
  classId,
  user,
  classroom,
  extractClassInfo,
}) => {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false);
  const [showEditClassworksModal, setShowEditClassworksModal] = useState(false);

  const handleDeleteWork = async () => {
    try {
      if (window.confirm("Are you sure you want to delete the classwork?")) {
        const options = {
          headers: {
            "Content-type": "application/json",
            "auth-token": token,
          },
          method: "DELETE",
        };

        const response = await fetch(
          `https://tranquil-woodland-86159.herokuapp.com/api/classrooms/cw/${classId}/classworks/delete/${classwork._id}`,
          options
        );
        const jsonResponse = await response.json();
        if (jsonResponse.success)
          window.alert("Classroom successfully Deleted");
        extractClassInfo();
      } else {
        window.alert("Deletion cancelled by user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`classwork-list ${classwork.classworkType.toLowerCase()}`}
      >
        <EditClassworksModal
          showEditClassworksModal={showEditClassworksModal}
          setShowEditClassworksModal={setShowEditClassworksModal}
          isTeaching={isTeaching}
          classwork={classwork}
          token={token}
          user={user}
          classId={classId}
          classroom={classroom}
          extractClassInfo={extractClassInfo}
        />
        <SubmissionModal
          showSubmissionModal={showSubmissionModal}
          setShowSubmissionModal={setShowSubmissionModal}
          isTeaching={isTeaching}
          classwork={classwork}
          token={token}
          classId={classId}
          extractClassInfo={extractClassInfo}
        />
        <SubmissionsListModal
          showSubmissionsModal={showSubmissionsModal}
          setShowSubmissionsModal={setShowSubmissionsModal}
          isTeaching={isTeaching}
          classwork={classwork}
          token={token}
          classId={classId}
          extractClassInfo={extractClassInfo}
        />
        <div className="classwork-info">
          <h1 className="classwork-title">{classwork.title}</h1>
          <h3 className="classwork-desc">{classwork.description}</h3>
          {classwork.totalGrade && (
            <h3 className="classwork-marks">Grades: {classwork.totalGrade}</h3>
          )}
          <div className="attachments">
            {classwork.attachments?.map((attachment) => (
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

          {isTeaching
            ? classwork.classworkType !== "Material" &&
              classwork.classworkType !== "Generic" && (
                <h3
                  className="submissions"
                  onClick={() => setShowSubmissionsModal(true)}
                >
                  Submissions
                </h3>
              )
            : classwork.classworkType !== "Material" &&
              classwork.classworkType !== "Generic" && (
                <h3
                  className="submission"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowSubmissionModal(true)}
                >
                  YOUR SUBMISSION
                </h3>
              )}
        </div>
        <div className="classwork-type">
          <h4 className="classwork-type-display">{classwork.classworkType}</h4>
          {isTeaching && (
            <>
              <i
                className="fas fa-pen edit-action"
                onClick={() => setShowEditClassworksModal(true)}
              >
                {" "}
                Edit
              </i>
              <i
                className="fas fa-trash delete-action"
                onClick={handleDeleteWork}
              >
                {" "}
                Delete
              </i>
            </>
          )}
          {classwork.deadlineDate && (
            <h3 className="due-date">
              Deadline:
              {classwork.deadlineDate.split("T")[1].split(":")[0] +
                ":" +
                classwork.deadlineDate.split("T")[1].split(":")[1] +
                " " +
                " " +
                classwork.deadlineDate.split("T")[0]}
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassworksList;
