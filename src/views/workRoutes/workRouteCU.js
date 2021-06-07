import React, { useEffect, useState, useContext } from "react";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import { Tabs, Select, Row, Col, Form, Input, Spin } from "antd";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";

import { RiHospitalLine } from "react-icons/ri";
import useForm from "utils/useForm/UseForm";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import { comunities } from "utils/NationalCitiesHandler";
import { GraphError } from "components/MyAlert/GraphQlError";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML, convertFromHTML } from "draft-convert";
import {
  FileTextOutlined,
  MenuOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { getWorkRouteGQL } from "graphql/queries/workRouteQueries";
import { createUpdateWorkRouteGQL } from "graphql/mutations/workRouteMutation";
import workRouteSchema from "./workRouteSchema";
import { MainStore } from "App";
import ImageUploader from "components/uploaders/ImageUploader";

const { Option } = Select;
const { TabPane } = Tabs;

export default function WorkRouteCU(props) {
  const { openModal, handleCloseModal, idWorkRoute, refetchWorkRoutes } = props;
  const { state } = useContext(MainStore);
  const { clinics } = state;
  const countryList = csc.getAllCountries();
  const [featuredImage, setFeaturedImage] = useState(null);
  const states = departments();
  const [cities, setCities] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleState = (e) => {
    const states = comunities(e);
    handleChange(e, "state");
    setCities(states);
  };
  const [fetchWorkRoute, { loading: loadingFetch }] = useLazyQuery(
    getWorkRouteGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        setEditorState(
          EditorState.createWithContent(convertFromHTML(res.description))
        );
        // debugger;
        updateValues({
          id: res.id,
          route_name: res.route_name,
          description: res.description,
          featured_image: res.featured_image,
          clinic: res.clinic,
          employees: res.employees,
          patients: res.patients,
          destinations: res.destinations,
        });
      },
      onError: (e) => {
        handleCloseModal();
        GraphError(e);
      },
    }
  );
  const [executeCreate, { loading }] = useMutation(createUpdateWorkRouteGQL, {
    onCompleted: (e) => {
      refetchWorkRoutes();
      AlertMessage(
        "Completed!",
        <span>WorkRoute Created Successfully!</span>,
        "success"
      );
      handleCloseModal();
    },
    onError: (e) => {
      GraphError(e);
    },
  });

  const defaultValues = {
    id: null,
    route_name: null,
    description: null,
    featured_image: null,
    clinic: null,
    employees: null,
    patients: null,
    destinations: null,
  };
  const submitForm = async () => {
    const descHtml = convertToHTML(editorState.getCurrentContent());
    const sbm = {
      id: idWorkRoute,
      name: values.name,
      description: descHtml,
      country: values.country,
      state: values.state,
      city: values.city,
      address: values.address,
      phone_number: values.phone_number,
    };
    // if (idWorkRoute) {
    //   executeUpdate({
    //     variables: {
    //       ...sbm,
    //     },
    //   });
    // } else {
    //   executeCreate({
    //     variables: {
    //       ...sbm,
    //     },
    //   });
    // }
  };

  const onchangeDescription = (value) => {
    setEditorState(value);
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,<RiHospitalLine className="anticon" />
  } = useForm(submitForm, defaultValues, workRouteSchema);

  const handleClinic = (e) => {
    handleChange(e, "clinic");
  };

  useEffect(() => {
    if (idWorkRoute) {
      fetchWorkRoute({
        variables: { id: idWorkRoute },
      });
    }
  }, [idWorkRoute]);

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
          Create a new WorkRoute
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
              <Row gutter={[10]}>
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
            </TabPane>
            <TabPane
              tab={
                <span>
                  <FileTextOutlined />
                  Description
                </span>
              }
              key="2"
            >
              <Editor
                editorState={editorState}
                editorStyle={{
                  width: "100%",
                  height: "30vh",
                  overflow: "hidden",
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
                onEditorStateChange={onchangeDescription}
              />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <UsergroupAddOutlined />
                  Employees
                </span>
              }
              key="3"
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
                        // handlepatients(value);
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
            </TabPane>
          </Tabs>
        </Form>
      </Spin>
    </ModalForm>
  );
}
