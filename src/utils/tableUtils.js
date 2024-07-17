function calculateDisplayedEntries(
  currentPage,
  entriesPerPageValue,
  sortedData,
  convertDate,
  selectedFilters,
  searchTerm
) {
  let filteredData = [...sortedData];

  // Apply type filters if provided
  const typeFilters = selectedFilters.filter(
    (filter) => !["Open", "Closed"].includes(filter)
  );
  if (typeFilters.length > 0) {
    filteredData = filteredData.filter((entry) =>
      typeFilters.includes(entry.enquiryType)
    );
  }

  // Apply status filter if provided
  const statusFilter = selectedFilters.find(
    (filter) => filter === "Open" || filter === "Closed"
  );
  if (statusFilter) {
    filteredData = filteredData.filter(
      (entry) => entry.enquiryStatus === statusFilter
    );
  }

  // Apply search filter if search term is provided
  if (searchTerm) {
    filteredData = filteredData.filter((entry) =>
      entry.some((key) => key.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  const startIndex = (currentPage - 1) * entriesPerPageValue;
  const endIndex = startIndex + entriesPerPageValue;
  const displayedEntries = filteredData
    .slice(startIndex, endIndex)
    .map((entry) => {
      if (entry.enquiryDate) {
        const formattedDate = convertDate(entry.enquiryDate);
        return { ...entry, enquiryDate: formattedDate };
      }
      return entry;
    });

  return { displayedEntries, filteredData };
}

// Function to sort entries by status
function sortEntryByStatus(data, sortByEnquiryStatus, status1, status2) {
  return data.sort((a, b) => {
    if (a.enquiryStatus === b.enquiryStatus) {
      return new Date(a.enquiryDate) - new Date(b.enquiryDate);
    }
    if (sortByEnquiryStatus === status1) {
      return b.enquiryStatus.localeCompare(a.enquiryStatus);
    } else if (sortByEnquiryStatus === status2) {
      return a.enquiryStatus.localeCompare(b.enquiryStatus);
    }
    return 0;
  });
}

function filterBySearchTermForOrders(sortedData, searchTerm) {
  // Filter data based on search term
  let filteredData = [...sortedData];

  if (searchTerm.trim() !== "") {
    // If search term is not empty
    const hasMatchingBrickOrderItem = filteredData.some((order) =>
      order.BrickOrderItems.some((item) =>
        item.BrickProduct.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (hasMatchingBrickOrderItem) {
      // If there is at least one BrickOrderItem with a matching BrickProduct name
      filteredData = filteredData
        .map((order) => ({
          ...order,
          BrickOrderItems: order.BrickOrderItems.filter((item) =>
            item.BrickProduct.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((order) => order.BrickOrderItems.length > 0);
    } else {
      // If search term doesn't match any BrickProduct names, apply other filters
      filteredData = filteredData.filter((order) => {
        // Check if any of the specified properties in brickOrders include the search term
        const orderMatch = [
          "firstName",
          "surname",
          "email",
          "orderStatus",
          "paymentStatus",
          "dateOfDelivery",
        ].some((property) =>
          String(order[property])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

        return orderMatch;
      });
    }
  }
  return filteredData;
}

export {
  calculateDisplayedEntries,
  sortEntryByStatus,
  filterBySearchTermForOrders,
};
