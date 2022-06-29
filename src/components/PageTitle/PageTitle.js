import React from "react";
import classNames from "classnames"
// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classNames(classes.pageTitleContainer, "px-[30px] shadow-xl border-b border-white border-opacity-10")}>
        <h1 className="text-white opacity-80 text-[30px] font-semibold">
            {props.title}
        </h1>
      {props.button && props.button}
    </div>
  );
}
