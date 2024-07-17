import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function Logout({ modal, setModal }) {
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const { logout, setError } = useAuth();

  async function handleLogout() {
    try {
      setError("");
      await logout();
      setModal(false);
      navigate("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <Modal show={modal} as={Fragment}>
      <Modal.Header closeButton onHide={() => setModal(false)}>
        <Modal.Title>Logout?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={() => setModal(false)} ref={cancelButtonRef}>
          Close
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Logout;
