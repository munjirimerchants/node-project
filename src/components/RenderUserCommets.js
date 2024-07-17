import React from "react";

function renderUserComments(enquiryDetails) {
  const enquiryComments = enquiryDetails?.EnquiryChat?.EnquiryComments;

  return (
    <div>
      <div className="adminEnquiryName">User Comments:</div>
      <div className="adminCommentText">{enquiryDetails?.comments}</div>
      <div className="adminCommentDate">
        {new Date(enquiryDetails?.enquiryDate).toLocaleString()}
      </div>

      {enquiryComments &&
        enquiryComments.map((comment, index) => (
          <div key={index} className="userComment">
            <div className="adminCommentText">{comment?.comment}</div>
            <div className="adminCommentDate">
              {new Date(comment?.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
    </div>
  );
}

export default renderUserComments;
