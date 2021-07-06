import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import {
  Tabs,
  Select,
  Row,
  Col,
  Form,
  Input,
  Spin,
  Button,
  Card,
  Tag,
  Tooltip,
} from "antd";
import { RiHospitalLine } from "react-icons/ri";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import {
  MenuOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import ImageUploader from "components/uploaders/ImageUploader";
import NewDestinationCU from "./NewDestinationCU";
import { useWorkRouteService } from "./services/workRouteServices";
import { comunities } from "utils/NationalCitiesHandler";
import { remove } from "lodash";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { useQuery } from "@apollo/react-hooks";
import { PatientsReviewGQL } from "graphql/queries/patientsQueries";
import gql from "graphql-tag";
const { Option } = Select;
const { TabPane } = Tabs;

const employeesListGQL = gql`
  query employeesList {
    result: employeesList {
      id
      first_name
      last_name
      clinic
    }
  }
`;

export default function WorkRouteCU(props) {
  const [featuredImage, setFeaturedImage] = useState(null);
  const [destinationModal, setDestinationModal] = useState(false);
  const handleDestination = () => setDestinationModal(!destinationModal);
  const countryList = csc.getAllCountries();
  const [patients, setPatients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const states = departments();
  const [cities, setCities] = useState([]);
  const handleState = (e) => {
    const states = comunities(e);
    handleChange(e, "state");
    setCities(states);
  };

  //#region Fetch patients and employees
  const {} = useQuery(PatientsReviewGQL, {
    onCompleted: (patiensResponse) => {
      setPatients(
        patiensResponse.result.map((value) => ({
          label: value.name,
          value: value.id,
        }))
      );
    },
  });
  const {} = useQuery(employeesListGQL, {
    onCompleted: (employeesResponse) => {
      setEmployees(
        employeesResponse.result.map((value) => ({
          label: `${value.first_name} ${value.last_name}`,
          value: value.id,
          clinic: value.clinic,
        }))
      );
    },
  });
  //#endregion
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    loading,
    onchangeDescription,
    loadingFetch,
    handleClinic,
    clinics,
    editorState,
    destinations,
    setDestinations,
  } = useWorkRouteService(props);

  const addDestination = (data) => {
    if (
      !destinations.some(
        (dest) => dest.destination_name === data.destination_name
      )
    ) {
      setDestinations([...destinations, data]);
    }
    handleDestination();
  };
  const removeDestination = (id) => {
    let remain = destinations.map((v) => v);
    remove(remain, (item) => item.destination_name === id);
    setDestinations(remain);
  };

  useEffect(() => {
    if (destinations.length > 0) {
      console.log(destinations);
    }
  }, [destinations]);
  return (
    <ModalForm
      openModal={props.openModal}
      width={600}
      loading={loading}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <RiHospitalLine
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new WorkRoute
        </span>
      }
      style={{ top: 20 }}
      handleClose={props.handleCloseModal}
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
          <Tabs size="large" style={{ marginBottom: 32 }}>
            <TabPane
              tab={
                <span>
                  <MenuOutlined />
                  General
                </span>
              }
              key="1"
            >
              <Row gutter={[10]} justify="space-between">
                <Col span={12}>
                  <Row gutter={[16]}>
                    <Col span={24}>
                      <Form.Item
                        validateStatus={
                          errors.route_name ? "error" : "validating"
                        }
                        help={errors.route_name}
                        label="Name of WorkRoute"
                      >
                        <Input
                          id="route_name"
                          name="route_name"
                          autoComplete={"false"}
                          onBlur={handleBlur}
                          value={values.route_name}
                          onChange={handleChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[16]}>
                    <Col span={24}>
                      <Form.Item
                        validateStatus={errors.clinic ? "error" : "validating"}
                        help={errors.clinic}
                        label="Clinic"
                      >
                        <Select
                          showSearch
                          id="clinic"
                          name="clinic"
                          autoComplete={"false"}
                          onBlur={handleBlur}
                          value={values.clinic}
                          onChange={(value) => {
                            handleClinic(value);
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
                    setImageValue={(v) => setFeaturedImage(v)}
                    imageValue={featuredImage}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 5 }}>
                <span>Description</span>
                <Col span={24}>
                  <FroalaEditorComponent
                    tag="textarea"
                    model={editorState}
                    onModelChange={(value) => onchangeDescription(value)}
                  />
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <UsergroupAddOutlined />
                  Work Organization
                </span>
              }
              key="2"
            >
              <Row gutter={[10]}>
                <Col span={18}>
                  <Form.Item
                    validateStatus={errors.city ? "error" : "validating"}
                    help={errors.city}
                    label="Work-Route Team"
                  >
                    <Select
                      showSearch
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      id="employees"
                      name="employees"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      // value={values.employees}
                      onChange={(value) => {
                        handleChange(value, "employees");
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {employees &&
                        employees.map((v, i) => (
                          <Option key={i} value={v.value}>
                            {v.label}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[10]}>
                <Col span={18}>
                  <Form.Item
                    validateStatus={errors.patients ? "error" : "validating"}
                    help={errors.patients}
                    label="Patients Attended"
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      showSearch
                      id="patients"
                      name="patients"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      // value={values.patients}
                      onChange={(value) => {
                        handleChange(value, "patients");
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {patients &&
                        patients.map((v, i) => (
                          <Option key={i} value={v.value}>
                            {v.label}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[10]}>
                <Col span={18}>
                  <Form.Item
                    validateStatus={
                      errors.destinations ? "error" : "validating"
                    }
                    help={errors.destinations}
                    label={
                      <span>
                        Destination References{" "}
                        <Button
                          type="ghost"
                          size="small"
                          shape="round"
                          className="ant-btn-info"
                          onClick={handleDestination}
                          icon={<PlusOutlined />}
                        >
                          Add New
                        </Button>
                      </span>
                    }
                  >
                    <Card color="success">
                      {destinations?.length > 0
                        ? destinations.map((item, index) => {
                            return (
                              <Tooltip
                                color="#fff"
                                key={index}
                                title={
                                  <span style={{ color: "GrayText" }}>
                                    {item.description}
                                  </span>
                                }
                              >
                                <Tag
                                  color="geekblue"
                                  closable
                                  style={{ fontSize: 15, padding: "3px 7px" }}
                                  onClose={(e) => {
                                    e.preventDefault();
                                    removeDestination(item.destination_name);
                                  }}
                                >
                                  {item.destination_name}
                                </Tag>
                              </Tooltip>
                            );
                          })
                        : null}
                    </Card>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
      {destinationModal && (
        <NewDestinationCU
          openModal={destinationModal}
          handleCloseModal={handleDestination}
          addDestination={addDestination}
        />
      )}
    </ModalForm>
  );
}
