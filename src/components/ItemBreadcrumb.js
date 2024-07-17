import "../assets/css/components/ItemBreadcrumb.css";
import { Breadcrumb } from "react-bootstrap";

const ItemBreadcrumb = (data) => {
  return (
    <Breadcrumb className="">
      <Breadcrumb.Item href={data.previousPage} className="machineBreadcrumb">
        {data.itemCategory}
      </Breadcrumb.Item>
      <Breadcrumb.Item active className="machineBreadcrumb">
        {data.currentItem}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ItemBreadcrumb;
