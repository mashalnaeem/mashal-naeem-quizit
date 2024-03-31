import "./ModalComponent.scss";

import modalIcon from "../../assets/images/modal.svg";
import { Modal, Button } from 'react-bootstrap';

function ModalComponent({ show, onHide, title, body, closeButton, primaryButton, onClick }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal__header">
        <Modal.Title className="modal__title">{title}</Modal.Title>
        <img className="modal__img" src={modalIcon} alt="exclamation-mark" />
      </Modal.Header>
      <Modal.Body className="modal__text">
        {body}
      </Modal.Body>
      <Modal.Footer className="modal__footer">
        {closeButton && (
          <Button className="modal__button" variant="secondary" onClick={onHide}>
            {closeButton}
          </Button>
        )}
        {primaryButton && (
          <Button className="modal__button" variant="primary" onClick={onClick}>
            {primaryButton}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;

