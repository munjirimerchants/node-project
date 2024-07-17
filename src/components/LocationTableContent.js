import "../assets/css/components/LocationTableContent.css";

const LocationTableContent = (tableContentData) => {
  return (
    <tbody>
      <tr>
        <td className="table col1" style={{ paddingLeft: "1.5rem" }}>
          {tableContentData.location}
        </td>
        <td className="table col1">{tableContentData.delivery1}</td>
        <td className="table col1">{tableContentData.delivery2}</td>
      </tr>
    </tbody>
  );
};

export default LocationTableContent;
