import "../assets/css/components/EnquiriesTable.css";
import React from "react";
import { Table, Dropdown } from "react-bootstrap";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

const AdminUsersTableComponent = ({
  handleSortByEnquiryDate,
  sortByOrderDate,
  displayedEntries,
  handleCheckboxChange,
  selectedOrderIds,
  getStatusStyle,
  navigateToUser,
  handlePatch,
}) => {
  return (
    <Table striped bordered hover responsive className="enquiryTable">
      <thead>
        <tr>
          <th></th>
          <th onClick={handleSortByEnquiryDate}>
            Date Added
            {sortByOrderDate === "descending" && (
              <ChevronDownIcon className="enquiryTableArrowIcon" />
            )}
            {sortByOrderDate === "ascending" && (
              <ChevronUpIcon className="enquiryTableArrowIcon" />
            )}
          </th>
          <th>Id</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Contact No.</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {displayedEntries?.map((entry, index) => (
          <>
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(entry.userID)}
                  checked={selectedOrderIds.includes(entry.userID)}
                />
              </td>
              <td className="">{entry?.createdAt}</td>
              <td> {entry?.userID} </td>
              <td className="">
                {entry?.firstName} {entry?.surname}
              </td>
              <td className="">{entry?.email}</td>

              <td className="">{entry?.telephone}</td>
              <td className="">
                <p className={`status ${getStatusStyle(entry?.status)}`}>
                  {entry?.status}
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
                          navigateToUser(entry.userID);
                        }}
                      >
                        Show
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handlePatch(entry.userID, null, "Active")
                        }
                      >
                        Activate
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handlePatch(entry.userID, null, "Inactive")
                        }
                      >
                        Deactivate
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

export default AdminUsersTableComponent;
