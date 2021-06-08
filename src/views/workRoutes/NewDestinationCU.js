import ModalForm from "components/modalForm";
import React from "react";

export default function NewDestinationCU({
  openModal,
  handleCloseModal,
  idWorkRoute,
  refetchDestination,
}) {
  const countryList = csc.getAllCountries();
  const [featuredImage, setFeaturedImage] = useState(null);
  const states = departments();
  const [cities, setCities] = useState([]);
  const defaultValues = {
    id: null,
    destination_name: null,
    description: null,
    picture: null,
    clinic: null,
    country: null,
    city: null,
    state: null,
    google_map_url: null,
  };
  return (
    <ModalForm
      openModal={openModal}
      width={600}
      loading={loading}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <RiHospitalLine
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new Destination
        </span>
      }
      style={{ top: 20 }}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
    ></ModalForm>
  );
}
