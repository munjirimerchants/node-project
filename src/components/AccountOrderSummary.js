import "../assets/css/components/AccountOrderSummary.css";

import React, { useMemo, useState, useEffect } from "react";
import { Col, Form, Button, Row, Stack, ButtonGroup } from "react-bootstrap";
import { convertDateFormatDateAndTime } from "../utils/dateConversion";
import { Pagination } from "react-bootstrap";
import AccountOrderSummaryProduct from "./AccountOrderSummaryProduct";

const AccountOrderSummary = ({ brickOrders, loadingDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [goToPage, setGoToPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [inProgressOrdersCount, setInProgressOrdersCount] = useState(0);
  console.log(brickOrders);
  useEffect(() => {
    if (brickOrders && Object.keys(brickOrders).length > 0) {
      // Filter brickOrders array based on different statuses
      const pendingOrders = brickOrders?.filter(
        (order) => order.orderStatus === "Pending"
      );
      const completedOrders = brickOrders?.filter(
        (order) => order.orderStatus === "Complete"
      );
      const inProgressOrders = brickOrders?.filter(
        (order) => order.orderStatus === "In Progress"
      );

      // Update state with the count of orders for each status
      setPendingOrdersCount(pendingOrders.length);
      setCompletedOrdersCount(completedOrders.length);
      setInProgressOrdersCount(inProgressOrders.length);
    }
  }, [brickOrders]);

  const formatBrickOrderItem = (item) => ({
    amount: item.amount,
    isColoured: item.isColoured,
    itemPrice: item.itemPrice,
    brickProduct: {
      image: item.BrickProduct.image,
      name: item.BrickProduct.name,
    },
  });

  const formattedData = useMemo(() => {
    if (!loadingDetails) {
      let filteredOrders = brickOrders;

      if (statusFilter !== "all") {
        filteredOrders = filteredOrders.filter(
          (order) => order.orderStatus === statusFilter
        );
      }

      return filteredOrders.map((order) => ({
        totalPrice: order.totalPrice,
        firstName: order.firstName,
        surname: order.surname,
        orderDate: convertDateFormatDateAndTime(order.orderDate),
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        dateOfDelivery: order.dateOfDelivery,
        addressLine1: order.addressLine1,
        addressLine2: order.addressLine2,
        brickOrderItems: order.BrickOrderItems.map(formatBrickOrderItem),
      }));
    } else {
      return [];
    }
  }, [brickOrders, loadingDetails, statusFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formattedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(formattedData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToPage = () => {
    if (goToPage >= 1 && goToPage <= totalPages) {
      setCurrentPage(goToPage);
      setGoToPage(1); // Reset the input after navigating to the page
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    handleGoToPage(); // Call handleGoToPage when the form is submitted
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <>
      {brickOrders && Object.keys(brickOrders).length > 0 ? (
        <>
          <Row className="">
            <Col xs={12} className="my-2 accountOrderFilterCol">
              <ButtonGroup className="accountOrderFilterButtonGroup">
                <Button
                  className={
                    statusFilter === "all"
                      ? "accountOrderFilterButtonSelected"
                      : "accountOrderFilterButton"
                  }
                  onClick={() => handleStatusFilterChange("all")}
                >
                  All
                  <span className="accountOrderCountSpan">
                    {brickOrders.length}
                  </span>
                </Button>
                <Button
                  className={
                    statusFilter === "Pending"
                      ? "accountOrderFilterButtonSelected"
                      : "accountOrderFilterButton"
                  }
                  onClick={() => handleStatusFilterChange("Pending")}
                >
                  Pending
                  <span className="accountOrderCountSpan">
                    {pendingOrdersCount}
                  </span>
                </Button>
                <Button
                  className={
                    statusFilter === "Complete"
                      ? "accountOrderFilterButtonSelected"
                      : "accountOrderFilterButton"
                  }
                  onClick={() => handleStatusFilterChange("Complete")}
                >
                  Completed
                  <span className="accountOrderCountSpan">
                    {completedOrdersCount}
                  </span>
                </Button>
                <Button
                  className={
                    statusFilter === "In Progress"
                      ? "accountOrderFilterButtonSelected"
                      : "accountOrderFilterButton"
                  }
                  onClick={() => handleStatusFilterChange("In Progress")}
                >
                  In Progress
                  <span className="accountOrderCountSpan">
                    {inProgressOrdersCount}
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>

          {currentItems.map((formattedOrder, index) => (
            <AccountOrderSummaryProduct
              key={index}
              index={index}
              formattedData={formattedOrder}
            />
          ))}

          <Row className="accountOrderPaginationRow">
            <Col className="mb-5 accountOrderPaginationCol">
              <Pagination className="m-0">
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
            <Col className="mb-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGoToPage">
                  <Stack direction="horizontal" gap="2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="accountOrderArrowIcon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                      />
                    </svg>

                    <Form.Label className="m-0 accountOrderGoToLabel">
                      Go to:
                    </Form.Label>
                    <Form.Control
                      className="accountOrderGoToBox"
                      type="number"
                      value={goToPage}
                      onChange={(e) => setGoToPage(parseInt(e.target.value))}
                      min={1}
                      max={totalPages}
                    />
                    <Button type="submit">Go</Button>
                  </Stack>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <>No Orders...</>
      )}
    </>
  );
};

export default AccountOrderSummary;
