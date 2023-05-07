import React from "react";
import classNames from "classnames";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ isLoading = false, icon, children, ...rest }) => {
  return (
    <button className="btn-primary" {...rest}>
      {icon && !isLoading && (
        <>
          {icon} <span className="mx-1" />
        </>
      )}
      {isLoading && (
        <>
          <FontAwesomeIcon
            icon={faSpinner}
            className={classNames({ "fa-spin": isLoading })}
          />
          <span className="mx-1" />
        </>
      )}
      {children}
    </button>
  );
};

export default Button;
