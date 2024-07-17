import { Row, Col, Stack, Form, Dropdown } from "react-bootstrap";
import { FilterIcon, SearchIcon } from "@heroicons/react/outline";

const AdminOrdersTableFiltersAndSort = ({
  searchTerm,
  handleSearchChange,
  handleFilterChange,
  selectedFilters,
  sortedBy,
  sortByEnquiryDate,
  handleSortByEnquiryDateToggle,
  setShowDeleteModal,
}) => {
  return (
    <Row className="enquiryEntryInputRow">
      <Col>
        <div className="enquirySearchFieldDiv">
          <Stack direction="horizontal" className="enquirySearchFieldStack">
            <SearchIcon style={{ height: "1.5rem", width: "1.5rem" }} />
            <Form.Control
              size="lg"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="enquirySearchField"
            ></Form.Control>
          </Stack>
        </div>
      </Col>
      <Col>
        <Dropdown className="enquiryTableDropDownAdmin" autoClose="outside">
          <Dropdown.Toggle
            className="enquiryTableDropDownButtonAdmin"
            variant="success"
            id="dropdown-autoclose-outside"
          >
            <FilterIcon style={{ width: "1.5rem", height: "1.5rem" }} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterChange("Pending")}>
              <input
                type="checkbox"
                checked={selectedFilters.includes("Pending")}
                readOnly // Set input as readOnly to prevent checkbox click from being intercepted by Bootstrap
              />
              Pending Orders
            </Dropdown.Item>

            <Dropdown.Item onClick={() => handleFilterChange("Complete")}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("Complete")}
                  readOnly
                />
                Complete Orders
              </label>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("In Progress")}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("In Progress")}
                  readOnly
                />
                In Progress Orders
              </label>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("PaymentPending")}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("PaymentPending")}
                  readOnly
                />
                Pending Payment
              </label>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("50%")}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("50%")}
                  readOnly
                />
                50% Payment
              </label>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("Full")}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes("Full")}
                  readOnly
                />
                Full Payment
              </label>
            </Dropdown.Item>

            <Dropdown.Item onClick={() => handleFilterChange(null)}>
              <input
                type="checkbox"
                checked={selectedFilters.length === 0}
                readOnly
              />
              All Orders
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle
            className="enquiryTableDropDownButtonAdmin"
            id="dropdown-autoclose-outside"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "1.5rem", height: "1.5rem" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            {sortedBy === "date" && (
              <span>
                {sortByEnquiryDate === "ascending"
                  ? "Oldest first"
                  : "Newest first"}
              </span>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => handleSortByEnquiryDateToggle("descending")}
            >
              Newest first
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSortByEnquiryDateToggle("ascending")}
            >
              Oldest first
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col className="enquiryTableOptionsCol">
        <Dropdown className="enquiryTableOptionsDiv">
          <Dropdown.Toggle className="enquiryTableOptionsDiv">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              style={{ width: "2rem", height: "2rem" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
              Delete Selected
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default AdminOrdersTableFiltersAndSort;
