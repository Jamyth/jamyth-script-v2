import React from "react";
import ReactDOM from "react-dom";
import { async } from "./util/async";

const Main = async(() => import("./module/main"), "Main");

const ROOT = document.getElementById("_jamyth_");

ReactDOM.render(<Main />, ROOT);
