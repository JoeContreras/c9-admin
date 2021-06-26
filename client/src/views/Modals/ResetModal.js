import React, { useState } from "react";
// reactstrap components
import { Alert, Button, Modal } from "reactstrap";
import { Link } from "react-router-dom";

const ResetModal = (props) => {
  const [modalState, setModalState] = useState(true);
  const toggleModal = (state) => {
    setModalState(!modalState);
  };
  return (
    <>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={modalState}
        toggle={() => toggleModal()}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Reset Password
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          {props.success && (
            <Alert color="info">
              <strong> {props.success}</strong>
            </Alert>
          )}
        </div>
        <div className="modal-footer">
          <Link to="/auth/login" color="primary" type="button">
            OK
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default ResetModal;
