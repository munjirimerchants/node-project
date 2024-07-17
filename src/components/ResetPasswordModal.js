import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function ResetPasswordModal({ show, handleClose }) {
  const { currentUser, resetPasswordEmail, logout } = useAuth(); // Get necessary functions from AuthContext

  const handleResetPassword = async () => {
    try {
      await resetPasswordEmail(currentUser.email);
      // Show a success message to the user
      console.log("Password reset email sent successfully");
      handleClose(); // Close the modal after sending email
      logout(); // Log out the user after sending email
    } catch (error) {
      // Handle error if password reset email couldn't be sent
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Once you press this button, a confirmation email will be sent and you
          will be logged out.
        </p>
        <Button variant="primary" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ResetPasswordModal;
