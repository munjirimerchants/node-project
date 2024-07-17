import "../assets/css/components/LocationTableHeader.css";

const LocationTableHeader = (tableHeaderData) => {
  return (
    <thead>
      <tr>
        <th className="table colh1" style={{ paddingLeft: "1.5rem" }}>
          {tableHeaderData.title1}
        </th>
        <th className="table colh1">{tableHeaderData.title2}</th>
        <th className="table colh1">{tableHeaderData.title3}</th>
      </tr>
    </thead>
  );
};

export default LocationTableHeader;
