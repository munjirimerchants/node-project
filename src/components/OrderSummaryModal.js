import "../assets/css/components/OrderSummaryModal.css";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import OrderSummaryForm from "./OrderSummaryForm";

const OrderSummaryModal = ({
  modalShow,
  setModalShow,
  loading,
  OrderSummaryList,
  savedCartItems,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function closeModal() {
    setModalShow(false);
  }

  return (
    <Modal
      show={modalShow}
      dialogClassName="custom-modal-dialog"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={closeModal}
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Summary
          </Modal.Title>
        </Modal.Header>
        <div className="machineBodyHeaderDiv">
          <h4 className="machineBodyHeader">
            Please fill in your information below
          </h4>
        </div>
        <Modal.Body>
          <div className="orderSummaryItems">
            <OrderSummaryList savedCartItems={savedCartItems} />
          </div>
          <OrderSummaryForm savedCartItems={savedCartItems} />
        </Modal.Body>
      </div>

      <Modal.Footer>
        <Button onClick={closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderSummaryModal;
