import Breadcrumb from "react-bootstrap/Breadcrumb";
import "../assets/css/components/ItemBreadcrumb.css";

function AdminItemBreadcrumb(data) {
  return (
    <>
      <Breadcrumb className="adminBreadcrumb">
        <Breadcrumb.Item href={data.previousPage} className="adminBreadcrumb">
          {data.itemCategory}
        </Breadcrumb.Item>
        <Breadcrumb.Item active className="adminBreadcrumb">
          {data.currentItem}
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}

export default AdminItemBreadcrumb;
