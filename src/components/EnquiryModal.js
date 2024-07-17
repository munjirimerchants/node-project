import "../assets/css/components/EnquiryModal.css";
import axios from "axios";
import {
  Button,
  Modal,
  Row,
  Col,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { convertDateFormatDateAndTime } from "../utils/dateConversion";
import { XIcon } from "@heroicons/react/solid";
import { connections, endpoints } from "../config/connections";
import Comment from "../components/Comment";
import CommentForm from "../forms/CommentForm";
import EnquiryModalBody from "../components/EnquiryModalBody";

const EnquiryModal = ({
  showModal,
  closeEnquiryModal,
  enquiry,
  setEnquiry,
  currentMachineID,
  setCurrentMachine,
  currentMachine,
  updateUserEnquiry,
}) => {
  const [isCommentBoxOpen, setIsCommentBoxOpen] = useState(false);

  //changes the style of enquiry status depending on if its open or closed
  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "enquiryModalStatusOpen";
      case "Closed":
        return "enquiry-status-closed";
      default:
        return ""; // Return empty string for unknown status or no specific style
    }
  };

  //changes the style of enquiry status depending on if its open or closed
  const getTextSize = (text) => {
    if (text?.length >= 30) {
      return "enquirySmallSizeText";
    } else {
      return "enquiryNormalSizeText";
    }
  };

  useEffect(() => {
    if (currentMachineID) {
      axios
        .get(
          `${connections.server}${endpoints.machineproducts}/${currentMachineID}`
        )
        .then((response) => {
          setCurrentMachine(response.data);
        });
    }
  }, [currentMachineID]);

  useEffect(() => {
    if (enquiry && enquiry.EnquiryChat && enquiry.EnquiryChat.EnquiryComments) {
      enquiry.EnquiryChat.EnquiryComments.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setEnquiry(enquiry);
    }
  }, [showModal]);

  function closeAll() {
    closeEnquiryModal();
    setIsCommentBoxOpen(false);
  }

  const [isDisabled, setIsDisabled] = useState(false);
  const [toolTipMessage, setToolTipMessage] = useState(
    <Tooltip id="button-tooltip">Maximum of 3 Replies</Tooltip>
  );
  useEffect(() => {
    if (enquiry?.enquiryStatus === "Closed") {
      setIsDisabled(true);
      setToolTipMessage(
        <Tooltip id="button-tooltip">Can not reply on closed enquiries</Tooltip>
      );
      return;
    }
    const filteredComments = enquiry?.EnquiryChat?.EnquiryComments;

    if (!filteredComments || filteredComments.length === 0) {
      setIsDisabled(false);
      return;
    }

    // Sort comments by timestamp in ascending order
    const sortedComments = filteredComments
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    let allowance = 3;

    for (const comment of sortedComments) {
      if (comment.role === "Admin") {
        allowance = 3;
        setIsDisabled(false);
      } else {
        allowance--;
        if (allowance <= 0) {
          setIsDisabled(true);
          setToolTipMessage(
            <Tooltip id="button-tooltip">Maximum of 3 Replies</Tooltip>
          );
        }
      }
    }
  }, [enquiry]);

  console.log(isDisabled);
  return (
    <Modal show={showModal} onHide={closeEnquiryModal} size="lg">
      <Modal.Body className="enquiryModal">
        {enquiry && (
          <div>
            <div>
              <div className="enquiryModalCloseButtonDiv">
                <XIcon
                  onClick={closeEnquiryModal}
                  className="enquiryModalCloseButton"
                />
              </div>
              <Stack
                className="enquiryModalEnquiryIDStack"
                direction="horizontal"
                gap="3"
              >
                <p className="enquiryModalEnquiryID">
                  EnquiryID
                  <span className="enquiryModalEnquiryIDNumber">
                    &nbsp;#{enquiry?.userEnquiryID}
                  </span>
                </p>
                <p className={getStatusStyle(enquiry?.enquiryStatus)}>
                  {enquiry?.enquiryStatus}
                </p>
              </Stack>

              <Row>
                <Col lg="4">
                  <Stack gap="0">
                    <p className="enquiryModalCategoryTag">Category</p>
                    <p className="enquiryModalCategory">
                      {enquiry?.enquiryType}
                    </p>
                  </Stack>
                </Col>
                {enquiry?.machineID && (
                  <Col lg="4">
                    <Stack gap="0">
                      <p className="enquiryModalCategoryTag">Product</p>
                      <p className="enquiryModalCategory">
                        {currentMachine?.name}
                      </p>
                    </Stack>
                  </Col>
                )}
              </Row>
            </div>
            <div className="profileLine my-2" />
            <EnquiryModalBody enquiry={enquiry} getTextSize={getTextSize} />
            <div className="profileLine my-2" />
            <div>
              <p className="enquiryModalCategory">Comments</p>
              <Comment
                comment={enquiry?.comments}
                initials={enquiry?.firstName[0] + " " + enquiry?.surname[0]}
                dateOfComment={convertDateFormatDateAndTime(enquiry?.createdAt)}
                role="User"
              />
              {enquiry?.EnquiryChat?.EnquiryComments.map(
                (commentObj, index) => (
                  <Comment
                    role={commentObj.role}
                    key={index}
                    comment={commentObj?.comment}
                    initials={
                      commentObj.role === "User"
                        ? enquiry?.firstName[0] + " " + enquiry?.surname[0] // Set initials for User
                        : "Admin" // Set initials for Admin
                    }
                    dateOfComment={convertDateFormatDateAndTime(
                      commentObj?.createdAt
                    )}
                  />
                )
              )}
            </div>
            {isCommentBoxOpen && (
              <CommentForm
                updateUserEnquiry={updateUserEnquiry}
                setIsCommentBoxOpen={setIsCommentBoxOpen}
                enquiry={enquiry}
                comments={enquiry?.enquiryChat?.enquiryComments}
                setEnquiry={setEnquiry}
              />
            )}
            {!isCommentBoxOpen && !isDisabled && (
              <Button
                className="enquiryModalReplyButton"
                onClick={() => setIsCommentBoxOpen(true)}
              >
                Reply
              </Button>
            )}
            {!isCommentBoxOpen && isDisabled && (
              <OverlayTrigger
                placement="top"
                overlay={toolTipMessage}
                delay={{ show: 250, hide: 400 }}
              >
                <span className="d-inline-block">
                  <Button
                    disabled
                    title={"Only 3 maximum replies!"}
                    className="enquiryModalReplyButton"
                    onClick={() => setIsCommentBoxOpen(true)}
                  >
                    Reply
                  </Button>
                </span>
              </OverlayTrigger>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeAll}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EnquiryModal;
