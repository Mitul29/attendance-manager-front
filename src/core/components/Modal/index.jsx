import React from "react";
import classNames from "classnames";
import Button from "../Button";

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
                <>
                  <Button
                    className="save__btn"
                    isLoading={submitBtnLoader}
                    disabled={submitBtnLoader || submitBtnDisabled}
                    onClick={onClickSubmit}
                  >
                    {submitBtnText}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
