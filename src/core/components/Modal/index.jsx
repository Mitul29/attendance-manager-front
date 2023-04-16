import classNames from "classnames";
import React from "react";

const Modal = ({
  title,
  wrapperClass = "",
  isOpen,
  hasFooter = true,
  cancelBtn = true,
  cancelBtnText = "Cancel",
  showHeaderClose = true,
  onClickCancel,
  submitBtn = true,
  submitBtnText = "Save",
  submitBtnDisabled = false,
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
    <div
      className={classNames("modal__wrapper", wrapperClass, { show: isOpen })}
    >
      <div className="modal__overllay"></div>
      <div className="inner__wrapper">
        <div className="modal__CN">
          <div className="modal__header">
            <h2 className="title">{title}</h2>
            {showHeaderClose && (
              <button className="close__btn" onClick={onCancel}></button>
            )}
          </div>
          <div className="modal__body">{children}</div>
          {hasFooter && (
            <div className="modal__footer">
              {cancelBtn && (
                <button className="cancel__btn" onClick={onCancel}>
                  {cancelBtnText}
                </button>
              )}
              {submitBtn && (
                <button
                  className="save__btn"
                  disabled={submitBtnDisabled}
                  onClick={onClickSubmit}
                >
                  {submitBtnText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
