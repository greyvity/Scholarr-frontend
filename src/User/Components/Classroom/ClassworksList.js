import React from "react";

const ClassworksList = ({ classwork, isTeaching }) => {
  const handleWorkSubmission = (e) => {
    e.preventDefault();
    const fileData = e.target["file-picker"].value;
    if (!fileData)
      if (window.confirm("No file selected. Do you wish to submit it?")) {
        console.log("submitting");
      }
  };

  return (
    <>
      <div
        className={`classwork-list ${classwork.classworkType.toLowerCase()}`}
      >
        <div className="classwork-info">
          <h1 className="classwork-title">{classwork.title}</h1>
          <h3 className="classwork-desc">{classwork.description}</h3>
          {classwork.totalGrade && (
            <h3 className="classwork-marks">Grades: {classwork.totalGrade}</h3>
          )}

          {isTeaching
            ? classwork.classworkType !== "Material" &&
              classwork.classworkType !== "Generic" && (
                <h3 className="submissions">Submissions</h3>
              )
            : classwork.classworkType !== "Material" &&
              classwork.classworkType !== "Generic" && (
                <form
                  className="file-container"
                  onSubmit={handleWorkSubmission}
                >
                  <label htmlFor="file-picker">Add Submission:</label>
                  <input
                    type="file"
                    id="file-picker"
                    name="file-picker"
                    accept="image/*, .pdf, .doc"
                  />
                  <input type="submit" value="Submit Work" />
                </form>
              )}
        </div>
        <div className="classwork-type">
          <h4 className="classwork-type-display">{classwork.classworkType}</h4>
          {classwork.deadlineDate && (
            <h3 className="due-date">
              Deadline: 23:59 {classwork.deadlineDate.split("T")[0]}
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassworksList;
