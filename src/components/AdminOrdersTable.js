import "../assets/css/components/EnquiriesTable.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Pagination, Form, Stack } from "react-bootstrap";
import { convertDate } from "../utils/dateConversion";
import { filterBySearchTermForOrders } from "../utils/tableUtils";
import { useAuth } from "../context/AuthContext";
import { connections, endpoints } from "../config/connections";
import AdminOrdersTableFiltersAndSort from "./AdminOrdersTableFiltersAndSort";
import AdminDeleteModal from "./AdminDeleteModal";
import { useNavigate } from "react-router-dom";
import AdminOrdersTableComponent from "./AdminOrdersTableComponent";

const AdminOrdersTable = () => {
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
          `${connections.server}${endpoints.brickorders}`,
          payloadHeader
        );

        setData(response.data.brickOrders);
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
  const [sortByOrderDate, setSortByOrderDate] = useState("descending");
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
      setSortByOrderDate(
        sortByOrderDate === "ascending" ? "descending" : "ascending"
      );
    } else {
      // If not sorting by date, set to ascending by default
      setSortedBy("date");
      setSortByOrderDate("ascending");
    }
  };

  const handleSortByEnquiryDateToggle = (sortingDirection) => {
    setSortedBy("date");
    setSortByOrderDate(sortingDirection);
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
      case "Pending":
        return "order-status-pending";
      case "In Progress":
        return "order-status-in-progress";
      case "50%":
        return "order-status-50";
      case "Complete":
        return "enquiry-status-closed";
      case "Full":
        return "enquiry-status-closed";
      default:
        return ""; // Return empty string for unknown status or no specific style
    }
  };

  //Sort data by date
  useEffect(() => {
    if (!loading && data && Array.isArray(data) && data.length > 0) {
      let sortedEntries = [...data];

      if (sortByOrderDate === "ascending") {
        sortedEntries.sort(
          (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
        );
      } else {
        sortedEntries.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
      }

      setSortedData(sortedEntries);
    }
  }, [data, loading, sortByOrderDate]);

  //filter data and display it
  useEffect(() => {
    if (!loading) {
      let filteredData = filterBySearchTermForOrders(sortedData, searchTerm);

      // Apply other filters
      const statusFilters = selectedFilters.filter((filter) =>
        ["Pending", "In Progress", "Complete"].includes(filter)
      );

      const paymentStatusFilters = selectedFilters.filter((filter) =>
        ["PaymentPending", "50%", "Full"].includes(filter)
      );

      if (statusFilters.length > 0) {
        filteredData = filteredData.filter((entry) =>
          statusFilters.includes(entry.orderStatus)
        );
      }

      if (paymentStatusFilters.includes("PaymentPending")) {
        filteredData = filteredData.filter(
          (entry) => entry.paymentStatus === "Pending"
        );
      } else if (paymentStatusFilters.length > 0) {
        filteredData = filteredData.filter((entry) =>
          paymentStatusFilters.includes(entry.paymentStatus)
        );
      }
      // Calculate displayed entries
      const startIndex = (currentPage - 1) * PER_PAGE;
      const endIndex = startIndex + PER_PAGE;
      const displayedEntries = filteredData
        .slice(startIndex, endIndex)
        .map((entry) => {
          if (entry.orderDate) {
            const formattedDate = convertDate(entry.orderDate);
            return { ...entry, orderDate: formattedDate };
          }
          return entry;
        });

      // Update displayed entries state
      setDisplayedEntries(displayedEntries);
      setFilteredData(filteredData);
    }
  }, [currentPage, data, selectedFilters, searchTerm, loading, sortedData]);

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

  /**** pagination logic ****/
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /***** checkboxes *****/

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (enquiryId) => {
    // Check if the enquiry ID is already in the selectedEnquiryIds array
    const isSelected = selectedOrderIds.includes(enquiryId);

    // Update selectedEnquiryIds based on checkbox status
    if (isSelected) {
      // Remove the ID if it's already selected
      setSelectedOrderIds((prevIds) =>
        prevIds.filter((id) => id !== enquiryId)
      );
    } else {
      // Add the ID if it's not already selected
      setSelectedOrderIds((prevIds) => [...prevIds, enquiryId]);
    }
  };

  /******* deletes ******/

  //deletes checkbox selected items
  async function deleteSelectedEnquiries() {
    if (selectedOrderIds && selectedOrderIds.length > 0) {
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
          selectedOrderIds.forEach(async (brickOrderID) => {
            try {
              const response = await axios.delete(
                `${connections.server}${endpoints.brickorders}/${brickOrderID}`,
                payloadHeader
              );
              console.log("Response on delete:", response.data);
              // Filter out the deleted ID from displayedEntries
              setDisplayedEntries((prevDisplayedEntries) =>
                prevDisplayedEntries.filter(
                  (entry) => entry.brickOrderID !== brickOrderID
                )
              );
              setSelectedOrderIds([]);
            } catch (error) {
              // Handle error if DELETE request fails
              console.error(
                `Failed to delete enquiry with ID ${brickOrderID}:`,
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

  //delete the entry that is individually selected
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
            `${connections.server}${endpoints.brickorders}/${id}`,
            payloadHeader
          );
          console.log("Response on delete:", response.data);
          // Filter out the deleted ID from displayedEntries
          setDisplayedEntries((prevDisplayedEntries) =>
            prevDisplayedEntries.filter((entry) => entry.brickOrderID !== id)
          );
          setCurrentlySelectedID(null);
        } catch (error) {
          console.error(`Failed to delete enquiry with ID ${id}:`, error);
        }
      } else {
        console.log("no token");
      }
    } else {
      console.log("no user status");
    }
  }

  useEffect(() => {
    // Reset currentPage to 1 if it exceeds totalPages
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //delete for both checkbox deletes and individual deletes
  const handleDelete = (id, selectedOrderIDs) => {
    if (id) {
      deleteCurrentEnquiry(id);
      console.log("delete by id");
    } else if (selectedOrderIDs && selectedOrderIDs.length > 0) {
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

  function navigateToOrder(id) {
    navigate(`/admin/brick-orders/${id}`);
  }

  return (
    <div className="enquiryTableDivAdmin">
      <AdminDeleteModal
        show={showDeleteModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={currentlySelectedID}
        selectedEnquiryIds={selectedOrderIds}
        deleteSelectedEnquiries={deleteSelectedEnquiries}
      />
      {data && Object.keys(data).length > 0 ? (
        <>
          <AdminOrdersTableFiltersAndSort
            {...{
              searchTerm,
              handleSearchChange,
              handleFilterChange,
              selectedFilters,
              sortedBy,
              sortByEnquiryDate: sortByOrderDate,
              handleSortByEnquiryDateToggle,
              setShowDeleteModal,
            }}
          />

          <div className="">
            <AdminOrdersTableComponent
              {...{
                handleSortByEnquiryDate,
                sortByOrderDate,
                displayedEntries,
                handleCheckboxChange,
                selectedOrderIds,
                getStatusStyle,
                navigateToOrder,
                setIDandOpenModal,
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
        <>No Brick Orders...</>
      )}
    </div>
  );
};

export default AdminOrdersTable;
