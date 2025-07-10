import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = (props) => {
  let { ComponentName } = props;

  let navigate = useNavigate();

  useEffect(() => {
    let status = localStorage.getItem("medicityadminid");
    
    
    if (!status) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ComponentName />
    </>
  );
};

export default Protect;

