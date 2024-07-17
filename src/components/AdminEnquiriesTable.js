import "../assets/css/components/EnquiriesTable.css";
import React, { useState, useEffect } from "react";
import { Pagination, Form, Stack } from "react-bootstrap";
import { convertDate } from "../utils/dateConversion";
import { sortEntryByStatus } from "../utils/tableUtils";

import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { connections, endpoints } from "../config/connections";
import AdminEnquiryTableFiltersAndSort from "./AdminEnquiryTableFiltersAndSort";
import AdminDeleteModal from "./AdminDeleteModal";
import { useNavigate } from "react-router-dom";
import AdminEnquiriesTableComponent from "./AdminEnquiriesTableComponent";

const AdminEnquiriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const PER_PAGE = 10;
  const { userStatus } = useAuth();
  const navigate = useNavigate();

  // Function to fetch data for the specified page
  const fetchDataForPage = async (page) => {
    if (userStatus) {
      const token = await userStatus.getIdToken();
      if (token) {
        console.log("TOKEN: ", token);
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${connections.server}${endpoints.enquiries}`,
          payloadHeader
        );

        setData(response.data.enquiries);
        console.log("DATA LOADED", response.data);
        setTotalPages(response?.data?.pagination?.totalPages);
        setLoading(false);
      } else {
        console.log("no token");
      }
    } else {
      console.log("no user status");
    }
  };

  // Fetch data for the first page when the component mounts and userStatus loads
  useEffect(() => {
    if (userStatus) {
      fetchDataForPage(1);
    }
  }, [userStatus]);

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("1");

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
  const [searchTerm, setSearchTerm] = useState("");

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
        setCurrentPage(1);
      }
    }
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value); // Update the search term state
  };

  // Handle input page change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
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

  const handleSortByEnquiryDateToggle = (sortingDirection) => {
    setSortedBy("date");
    setSortByEnquiryDate(sortingDirection);
  };

  const handleSortByEnquiryStatusToggle = (status) => {
    setSortedBy("status");
    setSortByEnquiryStatus(status);
  };

  // Sort data by date when component mounts
  useEffect(() => {
    if (!loading && data && Array.isArray(data) && data.length > 0) {
      const sortedData = [...data].sort((a, b) => {
        return new Date(b.enquiryDate) - new Date(a.enquiryDate);
      });
      setSortedData(sortedData);
    }
  }, [loading]);

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

  //Sort data by date or status
  useEffect(() => {
    if (!loading && data && Array.isArray(data) && data.length > 0) {
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
          [...data], // Create a copy before sorting
          sortByEnquiryStatus,
          "Open",
          "Closed"
        );
      }

      setSortedData(sortedEntries);
    }
  }, [data, loading, sortedBy, sortByEnquiryStatus, sortByEnquiryDate]);

  //filter data and display it
  useEffect(() => {
    if (!loading) {
      // Filter data based on search term
      let filteredData = [...sortedData];

      if (searchTerm.trim() !== "") {
        // If search term is not empty
        filteredData = sortedData.filter((entry) => {
          // Check if any of the specified properties include the search term
          return [
            "firstName",
            "surname",
            "enquiryStatus",
            "enquiryType",
            "comments",
            "userEnquiryID",
            "enquiryDate",
          ].some((property) =>
            String(entry[property])
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        });
      }

      // Apply other filters
      const typeFilters = selectedFilters.filter(
        (filter) => !["Open", "Closed"].includes(filter)
      );
      if (typeFilters.length > 0) {
        filteredData = filteredData.filter((entry) =>
          typeFilters.includes(entry.enquiryType)
        );
      }

      const statusFilter = selectedFilters.find(
        (filter) => filter === "Open" || filter === "Closed"
      );
      if (statusFilter) {
        filteredData = filteredData.filter(
          (entry) => entry.enquiryStatus === statusFilter
        );
      }

      // Calculate displayed entries
      const startIndex = (currentPage - 1) * PER_PAGE;
      const endIndex = startIndex + PER_PAGE;
      const displayedEntries = filteredData
        .slice(startIndex, endIndex)
        .map((entry) => {
          if (entry.enquiryDate) {
            const formattedDate = convertDate(entry.enquiryDate);
            return { ...entry, enquiryDate: formattedDate };
          }
          return entry;
        });

      // Update displayed entries state
      setDisplayedEntries(displayedEntries);
      setFilteredData(filteredData);
    }
  }, [currentPage, data, selectedFilters, searchTerm, loading, sortedData]);

  // Total Pages logic
  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      // Recalculate total pages whenever data or filter changes
      let totalPages = Math.ceil(filteredData.length / PER_PAGE);

      if (isNaN(totalPages)) {
        totalPages = 0;
      }

      // Update totalPages state
      setTotalPages(totalPages);
    }
  }, [filteredData]);

  // Pagination logic
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //checkboxes

  const [selectedEnquiryIds, setSelectedEnquiryIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (enquiryId) => {
    // Check if the enquiry ID is already in the selectedEnquiryIds array
    const isSelected = selectedEnquiryIds.includes(enquiryId);

    // Update selectedEnquiryIds based on checkbox status
    if (isSelected) {
      // Remove the ID if it's already selected
      setSelectedEnquiryIds((prevIds) =>
        prevIds.filter((id) => id !== enquiryId)
      );
    } else {
      // Add the ID if it's not already selected
      setSelectedEnquiryIds((prevIds) => [...prevIds, enquiryId]);
    }
  };

  useEffect(() => {
    // Reset currentPage to 1 if it exceeds totalPages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  //deletes

  async function deleteSelectedEnquiries() {
    if (selectedEnquiryIds && selectedEnquiryIds.length > 0) {
      if (userStatus) {
        const token = await userStatus.getIdToken();
        if (token) {
          console.log("TOKEN: ", token);
          const payloadHeader = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          console.log("deleting...");
          selectedEnquiryIds.forEach(async (enquiryId) => {
            try {
              const response = await axios.delete(
                `${connections.server}${endpoints.enquiries}/${enquiryId}`,
                payloadHeader
              );
              console.log("Response on delete:", response.data);
              // Filter out the deleted ID from displayedEntries
              setDisplayedEntries((prevDisplayedEntries) =>
                prevDisplayedEntries.filter(
                  (entry) => entry.userEnquiryID !== enquiryId
                )
              );
              setSelectedEnquiryIds([]);
            } catch (error) {
              // Handle error if DELETE request fails
              console.error(
                `Failed to delete enquiry with ID ${enquiryId}:`,
                error
              );
            }
          });
        } else {
          console.log("no token");
        }
      } else {
        console.log("no user status");
      }
    }
    console.log("nothing selected");
  }

  async function deleteCurrentEnquiry(id) {
    if (userStatus) {
      const token = await userStatus.getIdToken();
      if (token) {
        console.log("TOKEN: ", token);
        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("deleting...");

        try {
          const response = await axios.delete(
            `${connections.server}${endpoints.enquiries}/${id}`,
            payloadHeader
          );
          console.log("Response on delete:", response.data);
          // Filter out the deleted ID from displayedEntries
          setDisplayedEntries((prevDisplayedEntries) =>
            prevDisplayedEntries.filter((entry) => entry.userEnquiryID !== id)
          );
          setCurrentlySelectedID(null);
        } catch (error) {
          // Handle error if DELETE request fails
          console.error(`Failed to delete enquiry with ID ${id}:`, error);
        }
      } else {
        console.log("no token");
      }
    } else {
      console.log("no user status");
    }
  }

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (id, selectedEnquiryIds) => {
    if (id) {
      deleteCurrentEnquiry(id);
      console.log("delete by id");
    } else if (selectedEnquiryIds && selectedEnquiryIds.length > 0) {
      deleteSelectedEnquiries();
      console.log("delete selected");
    } else {
      console.log("neither");
    }
    setShowDeleteModal(false);
  };

  const [currentlySelectedID, setCurrentlySelectedID] = useState(null);

  function setIDandOpenModal(id) {
    setCurrentlySelectedID(id);
    setShowDeleteModal(true);
  }

  function handleClose() {
    setCurrentlySelectedID(null);
    setShowDeleteModal(false);
    console.log("closed!");
  }

  function navigateToEnquiry(id) {
    navigate(`/admin/enquiries/${id}`);
  }

  return (
    <div className="enquiryTableDivAdmin">
      <AdminDeleteModal
        show={showDeleteModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={currentlySelectedID}
        selectedEnquiryIds={selectedEnquiryIds}
        deleteSelectedEnquiries={deleteSelectedEnquiries}
      />
      {data && Object.keys(data).length > 0 ? (
        <>
          <AdminEnquiryTableFiltersAndSort
            {...{
              searchTerm,
              handleSearchChange,
              handleFilterChange,
              selectedFilters,
              sortedBy,
              sortByEnquiryDate,
              sortByEnquiryStatus,
              handleSortByEnquiryStatusToggle,
              handleSortByEnquiryDateToggle,
              setShowDeleteModal,
            }}
          />

          <div className="">
            <AdminEnquiriesTableComponent
              {...{
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
              }}
            />
            <Pagination className="enquiryPaginationAdmin">
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

export default AdminEnquiriesTable;
