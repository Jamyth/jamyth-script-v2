import React from "react";
import "./index.scss";

interface Props {}

export const Main = React.memo(({}: Props) => {
  return (
    <div>
      <h1>Hello Jamyth!</h1>
    </div>
  );
});
