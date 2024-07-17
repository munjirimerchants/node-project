function convertDate(dateString) {
  const date = new Date(dateString);

  if (!isNaN(date)) {
    // Get day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0, so we add 1
    const year = date.getFullYear();

    // Ensure day and month are formatted with leading zeros if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Construct the formatted date string in the desired format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  } else {
    return dateString;
  }
}

function convertDateFormatDateAndTime(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Extract date components
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = date.getUTCFullYear();

  // Extract time components
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  const sec = String(date.getUTCSeconds()).padStart(2, "0");

  // Construct the formatted date string
  const formattedDate = `${dd}/${mm}/${yyyy} ${hh}:${min}:${sec}`;

  return formattedDate;
}

export { convertDateFormatDateAndTime, convertDate };
