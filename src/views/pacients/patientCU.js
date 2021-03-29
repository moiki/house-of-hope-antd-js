import React, { useEffect, useState, useContext } from "react";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import { Select, Row, Col, Form, Input, Spin, DatePicker } from "antd";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";
import useForm from "utils/useForm/UseForm";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import { comunities } from "utils/NationalCitiesHandler";
import { GraphError } from "components/MyAlert/GraphQlError";
import { MedicineBoxOutlined, UserOutlined } from "@ant-design/icons";
import { CreateUpdatePatientGQL } from "graphql/mutations/patientMutation";
import ImageUploader from "components/uploaders/ImageUploader";
import { MainStore } from "App";
import { getPatientGQL } from "graphql/queries/patientsQueries";
import patientSchema from "./patientSchema";

const { Option } = Select;

export default function PatientCU(props) {
  const { state } = useContext(MainStore);
  const { clinics } = state;
  const { openModal, handleCloseModal, idPatient, refetchPatients } = props;
  const countryList = csc.getAllCountries();
  const states = departments();
  const [cities, setCities] = useState([]);
  const [imageEmployee, setImageEmployee] = useState(null);
  const [openPositionModal, setOpenPositionModal] = useState(false);
  const togglePosition = () => setOpenPositionModal(!openPositionModal);
  const handleState = (e) => {
    const states = comunities(e);
    handleChange(e, "state");
    setCities(states);
  };

  const handleclinic = (e) => {
    handleChange(e, "clinic");
  };

  const [fetchPatient, { loading: loadingFetch }] = useLazyQuery(
    getPatientGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        updateValues({
          first_name: res.first_name,
          last_name: res.last_name,
          clinic: res.clinic,
          profile: res.profile,
          address: res.address,
          country: res.country,
          state: res.state,
          city: res.city,
          gender: res.gender,
        });
      },
      onError: (e) => {
        handleCloseModal();
        GraphError(e);
      },
    }
  );
  const [executeCreateUpdate, { loading }] = useMutation(
    CreateUpdatePatientGQL,
    {
      onCompleted: (e) => {
        refetchPatients();
        AlertMessage(
          "Completed!",
          <span>Employee Created Successfully!</span>,
          "success"
        );
        handleCloseModal();
      },
      onError: (e) => {
        GraphError(e);
      },
    }
  );

  const defaultValues = {
    first_name: "",
    last_name: "",
    clinic: "",
    birth_date: "",
    gender: "",
    address: "",
    country: "Nicaragua",
    state: "",
    city: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: idPatient,
      profile: null,
      first_name: values.first_name,
      last_name: values.last_name,
      clinic: values.clinic,
      birth_date: values.birth_date,
      gender: values.gender,
      address: values.address,
      country: "Nicaragua",
      state: values.state,
      city: values.city,
    };
    executeCreateUpdate({
      variables: {
        ...sbm,
      },
    });
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,<RiHospitalLine className="anticon" />
  } = useForm(submitForm, defaultValues, patientSchema);

  useEffect(() => {
    if (idPatient) {
      fetchPatient({
        variables: { id: idPatient },
      });
    }
  }, [idPatient]);

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  return (
    <ModalForm
      openModal={openModal}
      width={600}
      loading={loading}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <MedicineBoxOutlined
            size={50}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Register a new patient
        </span>
      }
      style={{ top: 20 }}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Spin
        spinning={loadingFetch}
        className="custom-spinner"
        indicator={<BeatLoader size={20} color="#084954" loading />}
      >
        <Form
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Row gutter={[10]}>
                <Col span={22}>
                  <Form.Item
                    validateStatus={errors.first_name ? "error" : "validating"}
                    help={errors.first_name}
                    label="First Name"
                  >
                    <Input
                      id="first_name"
                      name="first_name"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.first_name}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[10]}>
                <Col span={22}>
                  <Form.Item
                    validateStatus={errors.last_name ? "error" : "validating"}
                    help={errors.last_name}
                    label="Last Name"
                  >
                    <Input
                      id="last_name"
                      name="last_name"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.last_name}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[2]}>
                <Col span={22}>
                  <Form.Item
                    validateStatus={errors.clinic ? "error" : "validating"}
                    help={errors.clinic}
                    label="Clinic"
                  >
                    <Select
                      showSearch
                      showArrow
                      id="clinic"
                      name="clinic"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.clinic}
                      onChange={(value) => {
                        handleclinic(value);
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {clinics &&
                        clinics.map((v, i) => (
                          <Option key={i} value={v.value}>
                            {v.label}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <ImageUploader
                setImageValue={(v) => setImageEmployee(v)}
                imageValue={imageEmployee}
              />
            </Col>
          </Row>
          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.gender ? "error" : "validating"}
                help={errors.gender}
                label="Gender"
              >
                <Select
                  showSearch
                  showArrow
                  id="gender"
                  name="gender"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.gender}
                  onChange={(value) => {
                    handleChange(value, "gender");
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="MALE">MALE</Option>{" "}
                  <Option value="FEMALE">FEMALE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.birth_date ? "error" : "validating"}
                help={errors.birth_date}
                label="Birthday"
              >
                <DatePicker
                  onChange={(v) =>
                    handleChange(v.format("MM-DD-YYYY"), "birth_date")
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.country ? "error" : "validating"}
                help={errors.country}
                label="Country"
              >
                <Input
                  disabled
                  id="country"
                  name="country"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.country}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                validateStatus={errors.state ? "error" : "validating"}
                help={errors.state}
                label="State/Dept"
              >
                <Select
                  showSearch
                  id="state"
                  name="state"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.state}
                  onChange={(value) => {
                    handleState(value);
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {states &&
                    states.map((v, i) => (
                      <Option key={i} value={v.value}>
                        {v.value}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.city ? "error" : "validating"}
                help={errors.city}
                label="Town/Comunity"
              >
                <Select
                  showSearch
                  id="city"
                  name="city"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.city}
                  onChange={(value) => {
                    handleChange(value, "city");
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {cities &&
                    cities.map((v, i) => (
                      <Option key={i} value={v.value}>
                        {v.value}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.address ? "error" : "validating"}
                help={errors.address}
                label="Address"
              >
                <Input
                  id="address"
                  name="address"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.address}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </ModalForm>
  );
}
