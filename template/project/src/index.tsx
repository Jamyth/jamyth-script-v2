import React from "react";
import ReactDOM from "react-dom";
import { async } from "util/async";

const MainComponent = async(() => import("module/main"), "Main");

const ROOT = document.getElementById("_jamyth_page");

ReactDOM.render(<MainComponent />, ROOT);
