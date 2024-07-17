import "../assets/css/components/EnquiriesTable.css";
import React, { useState, useEffect } from "react";
import { Table, Pagination, Form, Stack, Dropdown } from "react-bootstrap";
import { convertDate } from "../utils/dateConversion";
import {
  calculateDisplayedEntries,
  sortEntryByStatus,
} from "../utils/tableUtils";
import EnquiryModal from "./EnquiryModal";
import {
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

const EnquiriesTable = ({
  data,
  entriesPerPage,
  loadingDetails,
  updateUserEnquiry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const [entriesPerPageValue, setEntriesPerPageValue] =
    useState(entriesPerPage);

  const [totalPages, setTotalPages] = useState();
  //the actual sorted data
  const [sortedData, setSortedData] = useState([data]);
  //state for the sorted data by status (open or closed)
  const [sortByEnquiryStatus, setSortByEnquiryStatus] = useState("Nothing");
  //state for the sorted data by date (ascending or descending)
  const [sortByEnquiryDate, setSortByEnquiryDate] = useState("descending");
  //state to see what the data is sorted by
  //can be date, status
  const [sortedBy, setSortedBy] = useState("date");

  const [selectedFilters, setSelectedFilters] = useState([]);

  const [displayedEntries, setDisplayedEntries] = useState();
  const [filteredData, setFilteredData] = useState();

  const handleFilterChange = (filter) => {
    if (filter === null) {
      setSelectedFilters([]); // Clear all filters
    } else {
      if (selectedFilters.includes(filter)) {
        setSelectedFilters(selectedFilters.filter((f) => f !== filter)); // Remove filter if already selected
      } else {
        // If the filter being selected is "Open" and "Closed" is already selected,
        // then deselect "Closed" and select "Open"
        if (filter === "Open" && selectedFilters.includes("Closed")) {
          setSelectedFilters(selectedFilters.filter((f) => f !== "Closed"));
        }
        // If the filter being selected is "Closed" and "Open" is already selected,
        // then deselect "Open" and select "Closed"
        if (filter === "Closed" && selectedFilters.includes("Open")) {
          setSelectedFilters(selectedFilters.filter((f) => f !== "Open"));
        }
        setSelectedFilters((prevFilters) => [...prevFilters, filter]); // Add the selected filter
      }
    }
  };

  // Handle input page change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle entries per page change
  const handleEntriesPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPageValue(value);
    setCurrentPage(1); // Reset current page when changing entries per page
  };

  // Handle input submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const page = parseInt(inputValue, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Update inputValue when currentPage changes
  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  // Handle sorting by Enquiry Status
  const handleSortByEnquiryStatus = () => {
    // Toggle between sorting by "Open" and "Closed" status
    setSortedBy("status");
    setSortByEnquiryStatus(sortByEnquiryStatus === "Open" ? "Closed" : "Open");
  };

  // Handle sorting by Date
  const handleSortByEnquiryDate = () => {
    // Toggle between sorting by descending or ascending order
    if (sortedBy === "date") {
      // If already sorting by date, toggle between ascending and descending
      setSortByEnquiryDate(
        sortByEnquiryDate === "ascending" ? "descending" : "ascending"
      );
    } else {
      // If not sorting by date, set to ascending by default
      setSortedBy("date");
      setSortByEnquiryDate("ascending");
    }
  };

  // Sort data by date when component mounts
  useEffect(() => {
    if (!loadingDetails && data && Array.isArray(data) && data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        return new Date(b.enquiryDate) - new Date(a.enquiryDate);
      });
      setSortedData(sortedData);
    }
  }, [loadingDetails]);

  //changes the style of enquiry status depending on if its open or closed
  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "enquiry-status-open";
      case "Closed":
        return "enquiry-status-closed";
      default:
        return ""; // Return empty string for unknown status or no specific style
    }
  };

  // Sort data by date or status
  useEffect(() => {
    if (!loadingDetails && data && Array.isArray(data) && data.length > 0) {
      let sortedEntries = [...data];

      if (sortedBy === "date") {
        if (sortByEnquiryDate === "ascending") {
          sortedEntries.sort(
            (a, b) => new Date(a.enquiryDate) - new Date(b.enquiryDate)
          );
        } else {
          sortedEntries.sort(
            (a, b) => new Date(b.enquiryDate) - new Date(a.enquiryDate)
          );
        }
      } else if (sortedBy === "status") {
        sortedEntries = sortEntryByStatus(
          sortedEntries,
          sortByEnquiryStatus,
          "Open",
          "Closed"
        );
      }

      setSortedData(sortedEntries);
    }
  }, [data, loadingDetails, sortedBy, sortByEnquiryStatus, sortByEnquiryDate]);

  useEffect(() => {
    const { displayedEntries, filteredData } = calculateDisplayedEntries(
      currentPage,
      entriesPerPageValue,
      sortedData,
      convertDate,
      selectedFilters
    );

    // Update displayed entries state
    setDisplayedEntries(displayedEntries);
    setFilteredData(filteredData);
  }, [currentPage, entriesPerPageValue, sortedData, selectedFilters]);

  // Total Pages logic
  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      // Recalculate total pages whenever data or filter changes
      let totalPages = Math.ceil(filteredData.length / entriesPerPageValue);

      if (isNaN(totalPages)) {
        totalPages = 0;
      }

      // Update totalPages state
      setTotalPages(totalPages);
    }
  }, [filteredData, entriesPerPageValue]);

  // Pagination logic
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //EnquiryModal
  const [showModal, setShowModal] = useState(false);
  const [enquiry, setEnquiry] = useState(null);

  const [currentMachineID, setCurrentMachineID] = useState();
  const [currentMachine, setCurrentMachine] = useState();

  const openEnquiryModal = (enquiryData) => {
    setCurrentMachineID(enquiryData.machineID);
    setEnquiry(enquiryData);
    setShowModal(true);
  };

  const closeEnquiryModal = () => {
    setShowModal(false);
  };

  return (
    <div className="enquiryTableDiv">
      {data && Object.keys(data).length > 0 ? (
        <>
          <EnquiryModal
            updateUserEnquiry={updateUserEnquiry}
            showModal={showModal}
            closeEnquiryModal={closeEnquiryModal}
            enquiry={enquiry}
            setEnquiry={setEnquiry}
            currentMachineID={currentMachineID}
            setCurrentMachine={setCurrentMachine}
            currentMachine={currentMachine}
          />
          <Stack direction="horizontal" className="enquiryEntryInputStack">
            <Form onSubmit={handleSubmit} className="enquiryEntryInputForm">
              <Form.Control
                type="number"
                min={1}
                max={50}
                value={entriesPerPageValue}
                onChange={handleEntriesPerPageChange}
              />
            </Form>
            <p style={{ marginLeft: "0.5rem", marginBottom: "0" }}>
              {" "}
              Entries per page{" "}
            </p>
            <Dropdown className="enquiryFilterDropdown" autoClose="outside">
              <Dropdown.Toggle
                className="enquiryTableDropDownButton"
                variant="success"
                id="dropdown-autoclose-outside"
              >
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleFilterChange("Open")}>
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes("Open")}
                    readOnly // Set input as readOnly to prevent checkbox click from being intercepted by Bootstrap
                  />
                  Open Enquiries
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleFilterChange("Closed")}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("Closed")}
                      readOnly
                    />
                    Closed Enquiries
                  </label>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange("General")}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("General")}
                      readOnly
                    />
                    General Enquiries
                  </label>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange("Machine")}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("Machine")}
                      readOnly
                    />
                    Machine Enquiries
                  </label>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterChange("Brick")}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes("Brick")}
                      readOnly
                    />
                    Brick Enquiries
                  </label>
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleFilterChange(null)}>
                  <input
                    type="checkbox"
                    checked={selectedFilters.length === 0}
                    readOnly
                  />
                  All Enquiries
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <div className="enquiries-table-wrapper">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th onClick={handleSortByEnquiryDate}>
                    Date Added
                    {sortByEnquiryDate === "descending" && (
                      <ChevronDownIcon className="enquiryTableArrowIcon" />
                    )}
                    {sortByEnquiryDate === "ascending" && (
                      <ChevronUpIcon className="enquiryTableArrowIcon" />
                    )}
                  </th>
                  <th>Enquiry About</th>
                  <th>Enquiry Details</th>
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
                  <tr key={index}>
                    <td className="enquiryTableTD">{entry?.enquiryDate}</td>
                    <td className="enquiryTableTD">{entry?.enquiryType}</td>
                    <td className="enquiryTableTD">{entry?.comments}</td>
                    <td className="enquiryTableTD">
                      <p
                        className={`status ${getStatusStyle(
                          entry?.enquiryStatus
                        )}`}
                      >
                        {entry?.enquiryStatus}
                      </p>
                    </td>
                    <td
                      onClick={() => openEnquiryModal(entry)}
                      className="enquiryTableTD"
                    >
                      <EyeIcon className="enquiryEyeIcon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className="enquiryPagination">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <Stack direction="horizontal" className="enquiryNumberInputStack">
                <Form
                  onSubmit={handleSubmit}
                  className="enquiryNumberInputForm"
                >
                  <Form.Control
                    type="text"
                    min={1}
                    max={totalPages}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </Form>
                &nbsp; out of {totalPages}
              </Stack>
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      ) : (
        <>No Enquiries...</>
      )}
    </div>
  );
};

export default EnquiriesTable;
