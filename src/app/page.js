"use client"
import React from "react";

import Introduction from "./Home/Introduction";
import Warn from "./Home/Warn";





export default function page() {
  return <React.Fragment>
    <Introduction />
    <Warn />
  </React.Fragment>;
}
