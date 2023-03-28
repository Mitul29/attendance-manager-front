import React from "react";

const Input = React.forwardRef(({ label, ...rest }, ref) => {
  return (
    <div className="form-control">
      <label className="form-label" htmlFor={rest.id}>
        {label}
      </label>
      <input type="form-input" ref={ref} {...rest} />
    </div>
  );
});

export default Input;
