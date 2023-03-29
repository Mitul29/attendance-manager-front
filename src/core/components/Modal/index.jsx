import React from "react";

const Modal = ({
  title,
  isOpen,
  hasFooter = true,
  cancelBtn = true,
  cancelBtnText = "Cancel",
  onClickCancel = () => {},
  submitBtn = true,
  submitBtnText = "Save",
  onClickSubmit = () => {},
  submitBtnLoader = false,
  closeModal,
  children,
}) => {
  const onCancel = () => {
    if (onClickCancel) onClickCancel();
    else closeModal();
  };

  return isOpen ? (
    <div id="myModal" className="modal">
      <div className="modal-header">
        <span className="close">&times;</span>
        <h2>{title}</h2>
      </div>
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        {children}
      </div>
      {hasFooter && (
        <div className="modal-footer">
          {cancelBtn && <button onClick={onCancel}>{cancelBtnText}</button>}
          {submitBtn && (
            <button onClick={onClickSubmit}>{submitBtnText}</button>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default Modal;
