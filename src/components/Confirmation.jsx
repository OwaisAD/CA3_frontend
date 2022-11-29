import React from "react";
import { Modal, Button } from "react-bootstrap";

const Confirmation = ({ title, body }) => {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
