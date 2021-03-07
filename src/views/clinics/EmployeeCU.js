import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import { Tabs, Select, Row, Col, Form, Input, Spin } from "antd";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";
import {
  createClinicGQL,
  updateClinicGQL,
} from "graphql/mutations/clinicsMutation";
import { clinicSchema } from "./clinicSchema";
import { getClinicGQL } from "graphql/queries/clinicsQueries";
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
import { createUpdateEmployeeGQL } from "graphql/mutations/clinicsMutation";
import { positionsGQL } from "graphql/queries/clinicsQueries";

const { Option } = Select;
const { TabPane } = Tabs;

export default function EmployeeCU(props) {
  const { openModal, handleCloseModal, idEmployee, refetchEmployee } = props;
  const countryList = csc.getAllCountries();
  const states = departments();
  const [cities, setCities] = useState([]);
  const [phones, setPhones] = useState([]);
  const [positions, setPositions] = useState([]);

  const handleState = (e) => {
    const states = comunities(e);
    handleChange(e, "state");
    setCities(states);
  };

  const { loading: positionLoading } = useQuery(positionsGQL, {
    onCompleted: (e) =>
      setPositions(
        e.result.map((v) => {
          return { label: v.name, value: v.id };
        })
      ),
    onError: (e) => GraphError(e),
  });
  const [fetchEmployee, { loading: loadingFetch }] = useLazyQuery(
    getClinicGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        // setPhones(e.result.phoneNumbers);
        // setPositions(e.result.positions);
        // debugger;
        updateValues({
          id: null,
          first_name: null,
          last_name: null,
          birth_date: "",
          email: null,
          address: "",
          country: "Nicaragua",
          state: "",
          city: "",
          clinic: "",
        });
      },
      onError: (e) => {
        handleCloseModal();
        GraphError(e);
      },
    }
  );
  const [executeCreateUpdate, { loading }] = useMutation(
    createUpdateEmployeeGQL,
    {
      onCompleted: (e) => {
        refetchEmployee();
        AlertMessage(
          "Completed!",
          <span>Clinic Created Successfully!</span>,
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
    id: null,
    first_name: null,
    last_name: null,
    birth_date: "",
    email: null,
    address: "",
    country: "Nicaragua",
    state: "",
    city: "",
    clinic: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: idEmployee,
      name: values.name,
      description: "descHtml",
      country: values.country,
      state: values.state,
      city: values.city,
      address: values.address,
      phone_number: values.phone_number,
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
  } = useForm(submitForm, defaultValues, clinicSchema);

  useEffect(() => {
    if (idEmployee) {
      fetchEmployee({
        variables: { id: idEmployee },
      });
    }
  }, [idEmployee]);

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
          Create a new Clinic
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
          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.name ? "error" : "validating"}
                help={errors.name}
                label="Name of Clinic"
              >
                <Input
                  id="name"
                  name="name"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.phone_number ? "error" : "validating"}
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
        </Form>
      </Spin>
    </ModalForm>
  );
}
