import "../assets/css/components/EnquiriesTable.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pagination, Form, Stack } from "react-bootstrap";
import { convertDate } from "../utils/dateConversion";
import { useAuth } from "../context/AuthContext";
import { connections, endpoints } from "../config/connections";
import AdminUserTableFiltersAndSort from "./AdminUserTableFiltersAndSort";

import { useNavigate } from "react-router-dom";
import AdminUsersTableComponent from "./AdminUsersTableComponent";

const AdminUsersTable = () => {
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
          `${connections.server}${endpoints.users}`,
          payloadHeader
        );

        setData(response.data.users);
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
  //state for the sorted data by date (ascending or descending)
  const [sortBySignUpDate, setSortBySignUpDate] = useState("descending");
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

  // Handle sorting by Date
  const handleSortByEnquiryDate = () => {
    // Toggle between sorting by descending or ascending order
    if (sortedBy === "date") {
      // If already sorting by date, toggle between ascending and descending
      setSortBySignUpDate(
        sortBySignUpDate === "ascending" ? "descending" : "ascending"
      );
    } else {
      // If not sorting by date, set to ascending by default
      setSortedBy("date");
      setSortBySignUpDate("ascending");
    }
  };

  const handleSortByEnquiryDateToggle = (sortingDirection) => {
    setSortedBy("date");
    setSortBySignUpDate(sortingDirection);
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
      case "Active":
        return "enquiry-status-closed";
      case "Inactive":
        return "enquiry-status-open";
      default:
        return ""; // Return empty string for unknown status or no specific style
    }
  };

  //Sort data by date
  useEffect(() => {
    if (!loading && data && Array.isArray(data) && data.length > 0) {
      let sortedEntries = [...data];

      if (sortBySignUpDate === "ascending") {
        sortedEntries.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else {
        sortedEntries.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setSortedData(sortedEntries);
    }
  }, [data, loading, sortBySignUpDate]);

  const [recalculateDisplayedEntries, setRecalculateDisplayedEntries] =
    useState(false);

  //filter data and display it
  useEffect(() => {
    console.log("Resetting displayed data");
    if (!loading) {
      let filteredData = [...sortedData];

      if (searchTerm.trim() !== "") {
        // If search term is not empty
        filteredData = sortedData.filter((entry) => {
          // Check if any of the specified properties include the search term
          return [
            "firstName",
            "surname",
            "email",
            "userID",
            "telephone",
            "createdAt",
            "status",
          ].some((property) =>
            String(entry[property])
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        });
      }

      // Apply other filters
      const statusFilters = selectedFilters.filter((filter) =>
        ["Active", "Inactive"].includes(filter)
      );

      if (statusFilters.length > 0) {
        filteredData = filteredData.filter((entry) =>
          statusFilters.includes(entry.status)
        );
      }

      // Calculate displayed entries
      const startIndex = (currentPage - 1) * PER_PAGE;
      const endIndex = startIndex + PER_PAGE;
      const displayedEntries = filteredData
        .slice(startIndex, endIndex)
        .map((entry) => {
          if (entry.createdAt) {
            const formattedDate = convertDate(entry.createdAt);
            return { ...entry, createdAt: formattedDate };
          }
          return entry;
        });

      // Update displayed entries state
      setDisplayedEntries(displayedEntries);
      setFilteredData(filteredData);
      setRecalculateDisplayedEntries(false);
    }
  }, [
    currentPage,
    data,
    selectedFilters,
    searchTerm,
    loading,
    sortedData,
    recalculateDisplayedEntries,
  ]);

  /**** total pages logic ****/
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

  useEffect(() => {
    // Reset currentPage to 1 if it exceeds totalPages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  /**** pagination logic ****/
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /***** checkboxes *****/

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (userID) => {
    // Check if the enquiry ID is already in the selectedEnquiryIds array
    const isSelected = selectedUserIds.includes(userID);

    // Update selectedEnquiryIds based on checkbox status
    if (isSelected) {
      // Remove the ID if it's already selected
      setSelectedUserIds((prevIds) => prevIds.filter((id) => id !== userID));
    } else {
      // Add the ID if it's not already selected
      setSelectedUserIds((prevIds) => [...prevIds, userID]);
    }
  };

  /******* patches ******/

  //patches status of checkbox selected items
  async function patchSelectedEnquiries(status) {
    if (selectedUserIds && selectedUserIds.length > 0) {
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
          const statusPayload = { status: status }; // JSON data to be patched
          console.log("patching...");
          try {
            // Create an array of promises for each axios.patch() call
            const patchPromises = selectedUserIds.map(async (userID) => {
              const response = await axios.patch(
                `${connections.server}${endpoints.users}/${userID}`,
                statusPayload,
                payloadHeader
              );
              console.log("Response on patch:", response.data);
              return response.data;
            });

            // Wait for all promises to resolve
            const updatedEntries = await Promise.all(patchPromises);

            // Filter out any undefined entries
            const filteredEntries = updatedEntries.filter((entry) => entry);

            // Update the state with the new array
            setData((prevEntries) => {
              // Merge previous entries with updated entries
              return [
                ...prevEntries.filter(
                  (entry) => !selectedUserIds.includes(entry.userID)
                ),
                ...filteredEntries,
              ];
            });
            setRecalculateDisplayedEntries(true);
          } catch (error) {
            // Handle errors
          }
        } else {
          console.log("no token");
        }
      } else {
        console.log("no user status");
      }
    } else {
      console.log("nothing selected");
    }
  }

  //delete the entry that is individually selected
  async function patchCurrentEnquiry(id, status) {
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
        const statusPayload = { status: status }; // JSON data to be patched
        console.log("patching... " + status);

        try {
          const response = await axios.patch(
            `${connections.server}${endpoints.users}/${id}`,
            statusPayload,
            payloadHeader
          );
          console.log("Response on patch:", response.data);
          // Update the state with the new entry
          setData((prevEntries) => {
            // Find the index of the entry to be updated
            const indexToUpdate = prevEntries.findIndex(
              (entry) => entry.userID === id
            );

            // If found, update the entry
            if (indexToUpdate !== -1) {
              const updatedEntries = [...prevEntries];
              updatedEntries[indexToUpdate] = response.data;
              return updatedEntries;
            }
          });
          setRecalculateDisplayedEntries(true);
        } catch (error) {
          console.error(`Failed to patch user with ID ${id}:`, error);
        }
      } else {
        console.log("no token");
      }
    } else {
      console.log("no user status");
    }
  }

  //delete for both checkbox deletes and individual deletes
  const handlePatch = (id, selectedOrderIDs, status) => {
    if (id) {
      patchCurrentEnquiry(id, status);
      console.log("delete by id");
    } else if (selectedOrderIDs && selectedOrderIDs.length > 0) {
      patchSelectedEnquiries(status);
      console.log("delete selected");
    } else {
      console.log("neither");
    }
  };

  function navigateToUser(id) {
    navigate(`/admin/users/${id}`);
  }

  return (
    <div className="enquiryTableDivAdmin">
      {data && Object.keys(data).length > 0 ? (
        <>
          <AdminUserTableFiltersAndSort
            {...{
              searchTerm,
              handleSearchChange,
              handleFilterChange,
              selectedFilters,
              sortedBy,
              setSortBySignUpDate,
              handleSortByEnquiryDateToggle,
              selectedUserIds,
              handlePatch,
            }}
          />

          <div className="">
            <AdminUsersTableComponent
              {...{
                handleSortByEnquiryDate,
                sortByOrderDate: sortBySignUpDate,
                displayedEntries,
                handleCheckboxChange,
                selectedOrderIds: selectedUserIds,
                getStatusStyle,
                navigateToUser,
                handlePatch,
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
        <>No Users...</>
      )}
    </div>
  );
};

export default AdminUsersTable;
