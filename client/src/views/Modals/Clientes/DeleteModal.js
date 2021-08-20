import React, { useState } from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";
import axios from "axios";

const DeleteModal = (props) => {
  const { setLoading, setCallback, setData, callback, data, token } = props;

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/admin/clientes/${id}`, {
        headers: { Authorization: token },
      });
      setLoading(false);
      setCallback(!callback);
    } catch (e) {
      setData({ ...data, err: e.response.data.msg, success: "" });
    }
  };
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
            Borrar Cliente
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
        <div className="modal-body">
          Estas Seguro que deseas borrar a este Cliente?
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              handleDelete(props.id);
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
