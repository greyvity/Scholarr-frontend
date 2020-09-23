import React from "react";
import { Link } from "react-router-dom";

const ClassroomShortened = ({ classroom, handleDeleteClass, isTeaching }) => {
  return (
    <div className="classroom">
      <Link
        to={{
          pathname: `class/${classroom._id || classroom._classId}`,
          state: { isTeaching: isTeaching },
        }}
      >
        <h1>{classroom.className}</h1>
      </Link>
      <div className="actions">
        <button
          className="actions"
          onClick={() => handleDeleteClass(classroom)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ClassroomShortened;
