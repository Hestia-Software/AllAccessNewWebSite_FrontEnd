import React from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message/Messages";
import Component from "../../components";
 
const PageNotFound = () => {
  const navigate = useNavigate();
 
  const redirectHome = () => {
    navigate("/");
  };
 
  return (
    <>
      <Message
        status="404"
        title="404"
        subTitle="Sorry, the page not found"
        extra={
          <Component.Button
            onClick={redirectHome}
            className="page-not-found"
            title="Go Home"
          ></Component.Button>
        }
      />
    </>
  );
};
 
export default PageNotFound;