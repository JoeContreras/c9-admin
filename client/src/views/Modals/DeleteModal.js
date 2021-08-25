import React, { useState } from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";

const DeleteModal = (props) => {
  return (
    <>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={props.modalState}
        toggle={() => props.toggleModal()}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            {props.title}
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggleModal()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">{props.content}</div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              props.handleClick(props.id);
              props.toggleModal();
            }}
            color="primary"
            type="button"
          >
            Borrar
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={() => props.toggleModal()}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
