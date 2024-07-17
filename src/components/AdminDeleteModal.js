import { Modal, Button } from "react-bootstrap";

const AdminDeleteModal = ({
  show,
  handleClose,
  handleDelete,
  id,
  selectedEnquiryIds,
}) => {
  return (
    <>
      {id != null || (selectedEnquiryIds && selectedEnquiryIds.length > 0) ? (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Proceed to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>

            <Button
              variant="danger"
              onClick={() => handleDelete(id, selectedEnquiryIds)}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            Please select something to delete
          </Modal.Header>
        </Modal>
      )}
    </>
  );
};

export default AdminDeleteModal;
