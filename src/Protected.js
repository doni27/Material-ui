import Header from "./Header";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Protected(props) {
  console.log("isi dari props protected>>>", props.Cmp.name);
  let history = useHistory();
  let Cmp = props.Cmp;

  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      history.push("/register");
    }
  }, []);
  return (
    <div>
      <Cmp />
    </div>
  );
}
export default Protected;
