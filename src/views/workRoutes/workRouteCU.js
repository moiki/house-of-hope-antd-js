import React, { useEffect, useState } from "react";
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

const { Option } = Select;
const { TabPane } = Tabs;

export default function WorkRouteCU(props) {
  const { openModal, handleCloseModal, idWorkRoute, refetchWorkRoutes } = props;
  const countryList = csc.getAllCountries();
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
    if (idWorkRoute) {
      executeUpdate({
        variables: {
          ...sbm,
        },
      });
    } else {
      executeCreate({
        variables: {
          ...sbm,
        },
      });
    }
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
  } = useForm(submitForm, defaultValues, WorkRouteSchema);

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
      loading={loading || LoadingEdit}
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
                  <Form.Item
                    validateStatus={errors.route_name ? "error" : "validating"}
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
                <Col span={12}>
                  <Form.Item
                    validateStatus={
                      errors.phone_number ? "error" : "validating"
                    }
                    help={errors.phone_number}
                    label="Phone Number"
                  >
                    <Input
                      id="phone_number"
                      name="phone_number"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.phone_number}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[10]}>
                <Col span={12}>
                  <Form.Item
                    validateStatus={errors.country ? "error" : "validating"}
                    help={errors.country}
                    label="country"
                  >
                    <Input
                      disabled
                      id="country"
                      name="country"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.country || "Nicaragua"}
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
            ></TabPane>
          </Tabs>
        </Form>
      </Spin>
    </ModalForm>
  );
}
