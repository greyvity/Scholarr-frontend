import React, { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";

const ClassroomExtended = ({ token, match }) => {
  const [classDetails, setClassDetails] = useState({});

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
      console.log(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  }, [token, match.params.classId]);

  useEffect(() => {
    extractClassInfo();
  }, [extractClassInfo]);

  return (
    <motion.div exit={{ y: 1000 }} className="extended classroom-container">
      <div className="inner-container">
        <h1 className="class-name-header">{classDetails.className}</h1>
        <h2 className="class-name-header">{classDetails.classDescription}</h2>
        <h3 className="class-name-header">{classDetails.classCode}</h3>
      </div>
    </motion.div>
  );
};

export default ClassroomExtended;
