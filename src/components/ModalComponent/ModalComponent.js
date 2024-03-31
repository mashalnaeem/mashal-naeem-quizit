
import { Modal, Button } from 'react-bootstrap';

function ModalComponent({ show, onHide, title, body, closeButton, primaryButton, onClick }) {

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {closeButton}
        </Button>
        <Button variant="primary" onClick={onClick}>
          {primaryButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
