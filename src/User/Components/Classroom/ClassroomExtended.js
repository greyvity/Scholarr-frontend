import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const ClassroomExtended = ({ token, match }) => {
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
      console.log(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  }, [token, match.params.classId]);

  useEffect(() => {
    extractClassInfo();
  });

  return (
    <motion.div
      exit={{ y: 1000 }}
      className="extended classroom-container"
    ></motion.div>
  );
};

export default ClassroomExtended;
