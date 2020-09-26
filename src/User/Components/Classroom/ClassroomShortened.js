import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditClassroomModal from "./Modals/EditClassroomModal";

const ClassroomShortened = ({
  classroom,
  handleDeleteClass,
  isTeaching,
  token,
  getClassData,
}) => {
  const [editClassroomModal, setEditClassroomModal] = useState(false);

  return (
    <div className="classroom">
      <EditClassroomModal
        token={token}
        classroom={classroom}
        getClassData={getClassData}
        editClassroomModal={editClassroomModal}
        setEditClassroomModal={setEditClassroomModal}
      />
      <Link
        to={{
          pathname: `class/${classroom._id || classroom._classId}`,
          state: { isTeaching: isTeaching },
        }}
      >
        <h1>{classroom.className}</h1>
      </Link>
      <div className="actions">
        {isTeaching && (
          <>
            <button
              className="actions"
              onClick={() => handleDeleteClass(classroom)}
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
              className="actions"
              onClick={() => setEditClassroomModal(true)}
            >
              <i className="fas fa-pen"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassroomShortened;
