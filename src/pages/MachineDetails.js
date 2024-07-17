import "../assets/css/pages/MachineDetails.css";
import "../assets/css/components/MachineFormModal.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MachineCard from "../components/MachineCard";
import backArrow from "../assets/icons/blue_arrow.svg";
import MachineryDetailsBreadcrumb from "../components/ItemBreadcrumb";
import Banner from "../layouts/Banner";
import FormModal from "../components/FormModal";
import Button from "react-bootstrap/Button";
import MachineFormHeader from "../components/machineForm/MachineFormHeader";
import MachineFormBody from "../components/machineForm/MachineFormBody";
import MachineFormValues from "../components/machineForm/MachineFormValues";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images, icons } from "../config/resources";

function MachineDetails() {
  const bannerImage = `${resourceFolder.images}${images.machineDetailPageBannerImage}`;
  const { slug: slugRoute } = useParams();
  const [slug, setSlug] = useState(slugRoute);
  const [machine, setMachine] = useState([]);
  const { initialValues, validationSchema, loading } = MachineFormValues();
  // Update id state when routeId changes
  useEffect(() => {
    setSlug(slugRoute);
  }, [slugRoute]);

  useEffect(() => {
    if (slug) {
      axios
        .get(`${connections.server}${endpoints.machineproductsBySlug}/${slug}`)
        .then((response) => {
          setMachine(response.data);
        });
    }
  }, [slug]);

  let tagArray = [];
  let negativeTagArray = [];

  if (machine != null) {
    tagArray = [];
    negativeTagArray = [];
    for (let i = 0; i < machine.MachineAdvantages?.length; i++) {
      tagArray.push(machine.MachineAdvantages[i].name);
    }
    for (let i = 0; i < machine.MachineDisadvantages?.length; i++) {
      negativeTagArray.push(machine.MachineDisadvantages[i].name);
    }
  }

  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
  }

  const renderMachineDescription = () => {
    if (machine.MachineDescriptions && machine.MachineDescriptions.length > 0) {
      return (
        <>
          {machine.MachineDescriptions[0]?.descImage && (
            <Col
              xs="12"
              md="6"
              lg="6"
              xl="4"
              className="mb-2 d-flex justify-content-center float-start"
            >
              <Image
                fluid
                src={machine.MachineDescriptions[0]?.descImage}
                className="pe-3 pt-1"
              ></Image>
            </Col>
          )}
          {machine.MachineDescriptions[0]?.subDescription ||
            "Default Description"}
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <Container className="px-0 pt-2">
        <Banner image={bannerImage} />
        <div className="py-5" />
        <div className="machineDetails-titleContainer">
          <div class="machineDetails-titleContent">
            <h1 className="machineDetails-titleHome1">{machine.name}</h1>

            <h2 className="machineDetails-titleHome2">PLANT MACHINE</h2>
          </div>
        </div>
        <FormModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          modalstyleheader="machineModalStyleHeader"
          modalstylebody="machineModalStyleBody"
          HeaderComponent={MachineFormHeader}
          BodyComponent={MachineFormBody}
          headerProps={{ currentMachine: machine }}
          initialValues={initialValues}
          validationSchema={validationSchema}
          id={slug}
          loading={loading}
        />
        <div className="machineDetails-breadCrumbs">
          <MachineryDetailsBreadcrumb
            currentItem={machine.name}
            itemCategory="Machines"
            previousPage="/plant-hire"
          />
        </div>
      </Container>
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Container className="mt-2 machineDetails-backToButtonContainer">
          <Link to="/plant-hire" className="text-decoration-none">
            <button className="machineDetails-backToButton">
              <Image src={backArrow} className="machineDetails-arrow" />
              Back to list
            </button>
          </Link>
        </Container>
        <MachineCard
          extraStyle="p-2 m-0"
          id="machX"
          pictureDirection="left"
          image={machine.image}
          machineName={machine.name}
          text={machine.description}
          availability={machine.availability}
          tags={tagArray}
          negativeTags={negativeTagArray}
          button={
            <Button className="enquireButton" onClick={openModal}>
              Enquire Now
            </Button>
          }
        />
        <Container fluid className="d-flex justify-content-center">
          <hr className="machineDetails-underline-grey " />
        </Container>
        <Container className="machineDetails-overViewContainer">
          <h1 className="text-uppercase machineDetails-header">
            Overview of the pneumatic crawler drilling rig
          </h1>
          <Row className="pb-4 ">
            <Col xs="12" md="12" lg="12" xl="12" className="mt-3">
              {renderMachineDescription()}
            </Col>
          </Row>
          {machine.MachineDescriptions &&
            machine.MachineDescriptions.length > 0 && (
              <>
                <Image src={machine.MachineDescriptions[0]?.bigImage}></Image>
              </>
            )}
        </Container>
      </div>
    </div>
  );
}

export default MachineDetails;
