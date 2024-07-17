import "../assets/css/components/EnquiriesTable.css";
import React from "react";
import { Table, Dropdown } from "react-bootstrap";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

const AdminEnquiriesTableComponent = ({
  handleSortByEnquiryDate,
  sortByEnquiryDate,
  handleSortByEnquiryStatus,
  displayedEntries,
  handleCheckboxChange,
  getStatusStyle,
  setIDandOpenModal,
  sortByEnquiryStatus,
  selectedEnquiryIds,
  navigateToEnquiry,
}) => {
  return (
    <Table striped bordered hover responsive className="enquiryTable">
      <thead>
        <tr>
          <th></th>
          <th onClick={handleSortByEnquiryDate}>
            Date Added
            {sortByEnquiryDate === "descending" && (
              <ChevronDownIcon className="enquiryTableArrowIcon" />
            )}
            {sortByEnquiryDate === "ascending" && (
              <ChevronUpIcon className="enquiryTableArrowIcon" />
            )}
          </th>

          <th>Id</th>
          <th>User Name</th>
          <th>Enquiry About</th>
          <th>Description</th>
          <th onClick={handleSortByEnquiryStatus}>
            Enquiry Status{" "}
            {sortByEnquiryStatus === "Open" && (
              <ChevronDownIcon className="enquiryTableArrowIcon" />
            )}
            {sortByEnquiryStatus === "Closed" && (
              <ChevronUpIcon className="enquiryTableArrowIcon" />
            )}
            {sortByEnquiryStatus === "Nothing" && (
              <svg
                style={{ width: "1.5rem", height: "1.5rem" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            )}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {displayedEntries?.map((entry, index) => (
          <>
            <tr key={index}>
              <td>
                {/* Checkbox input for each row */}
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(entry.userEnquiryID)}
                  checked={selectedEnquiryIds.includes(entry.userEnquiryID)}
                />
              </td>
              <td className="">{entry?.enquiryDate}</td>
              <td className="">{entry?.userEnquiryID}</td>
              <td className="">
                {entry?.firstName} {entry?.surname}
              </td>
              <td className="">{entry?.enquiryType}</td>
              <td className="">{entry?.comments}</td>
              <td className="">
                <p className={`status ${getStatusStyle(entry?.enquiryStatus)}`}>
                  {entry?.enquiryStatus}
                </p>
              </td>

              <td className=" enquiryTableOptionSingle enquiryShowOverFlow">
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <Dropdown className="enquiryTableOptionsDiv">
                    <Dropdown.Toggle className="enquiryTableOptionsDiv enquiryTableOptionSingle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        style={{ height: "2rem", width: "2rem" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          navigateToEnquiry(entry.userEnquiryID);
                        }}
                      >
                        Show
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setIDandOpenModal(entry.userEnquiryID)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminEnquiriesTableComponent;
