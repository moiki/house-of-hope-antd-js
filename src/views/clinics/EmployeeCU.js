import React, { useEffect, useState, useContext } from "react";
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
  Tooltip,
  Button,
  Tag,
} from "antd";
import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";
import { getClinicGQL } from "graphql/queries/clinicsQueries";
import useForm from "utils/useForm/UseForm";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import { comunities } from "utils/NationalCitiesHandler";
import { GraphError } from "components/MyAlert/GraphQlError";
import {
  PlusCircleOutlined,
  PlusOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  createUpdateEmployeeGQL,
  createUpdatePositionGQL,
} from "graphql/mutations/clinicsMutation";
import { positionsGQL } from "graphql/queries/clinicsQueries";
import ImageUploader from "components/uploaders/ImageUploader";
import employeeSchema, { positionSchema } from "./employeeSchema";
import { MainStore } from "App";
import { getEmployeeGQL } from "graphql/queries/clinicsQueries";

const { Option } = Select;
const { TabPane } = Tabs;

function TagRender(props) {
  const { label, value, desc, closable, onClose } = props;
  console.log(props);
  return (
    <Tag
      color={value}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      <Tooltip className="primary" title={desc}>
        {label}
      </Tooltip>
    </Tag>
  );
}

const ModalPosition = React.memo((props) => {
  const [createPosition, { loading }] = useMutation(createUpdatePositionGQL, {
    onCompleted: () => {
      if (props.refetch) {
        props.refetch();
      }
      props.handleCloseModal();
    },
  });
  const submit = () => {
    createPosition({
      variables: {
        name: values.name,
        description: values.description,
      },
    });
  };
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    submit,
    { name: "", description: "" },
    positionSchema
  );
  return (
    <ModalForm
      openModal={props.openModal}
      loading={loading}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <SolutionOutlined
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Add a new position
        </span>
      }
      style={{ top: 20 }}
      handleClose={props.handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Form
        layout="vertical"
        name="form_in_modal_position"
        initialValues={{ modifier: "public" }}
      >
        <Row gutter={[10]}>
          <Col span={22}>
            <Form.Item
              validateStatus={errors.name ? "error" : "validating"}
              help={errors.name}
              label="Position Name"
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
        </Row>
        <Row gutter={[10]}>
          <Col span={22}>
            <Form.Item
              validateStatus={errors.description ? "error" : "validating"}
              help={errors.description}
              label="Description"
            >
              <Input.TextArea
                id="description"
                name="description"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={values.description}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalForm>
  );
});

export default function EmployeeCU(props) {
  const { state } = useContext(MainStore);
  const { clinics } = state;
  const { openModal, handleCloseModal, idEmployee, refetchEmployees } = props;
  const countryList = csc.getAllCountries();
  const states = departments();
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);
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

  const handlePositions = (e) => {
    handleChange(e, "positions");
  };
  const { loading: positionLoading, refetch: posRefetch } = useQuery(
    positionsGQL,
    {
      onCompleted: (e) =>
        setPositions(
          e.result.map((v) => {
            return { label: v.name, value: v.id, desc: v.desscription };
          })
        ),
      onError: (e) => GraphError(e),
    }
  );
  const [fetchEmployee, { loading: loadingFetch }] = useLazyQuery(
    getEmployeeGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        updateValues({
          first_name: res.first_name,
          last_name: res.last_name,
          clinic: res.clinic,
          email: res.email,
          positions: res.positions.map((v) => v.value),
          address: res.address,
          country: res.country,
          state: res.state,
          city: res.city,
          phone_number: res.phone_number,
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
        refetchEmployees();
        AlertMessage(
          "Completed!",
          <span>Employee Created Successfully!</span>,
          "success"
        );
        handleCloseModal();
      },
      onError: (e) => {
        console.log(e);
        // GraphError(e);
      },
    }
  );

  const defaultValues = {
    first_name: "",
    last_name: "",
    clinic: "",
    email: "",
    positions: [],
    address: "",
    country: "Nicaragua",
    state: "",
    city: "",
    phone_number: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: idEmployee,
      first_name: values.first_name,
      last_name: values.last_name,
      clinic: values.clinic,
      email: values.email,
      positions: values.positions,
      address: values.address,
      country: "Nicaragua",
      state: values.state,
      city: values.city,
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
  } = useForm(submitForm, defaultValues, employeeSchema);

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
          <UserOutlined
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new Employee
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
              <Row gutter={[2]}>
                <Col span={18}>
                  <Form.Item
                    validateStatus={errors.positions ? "error" : "validating"}
                    help={errors.positions}
                    label="Positions"
                  >
                    <Select
                      showSearch
                      showArrow
                      mode="multiple"
                      id="positions"
                      name="positions"
                      autoComplete={"false"}
                      onBlur={handleBlur}
                      value={values.positions}
                      onChange={(value) => {
                        handlePositions(value);
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {positions &&
                        positions.map((v, i) => (
                          <Option key={i} value={v.value}>
                            <div className="demo-option-label-item">
                              {v.label}
                            </div>
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label=" ">
                    <Tooltip title="Agregate a new position">
                      <Button
                        type="primary"
                        onClick={togglePosition}
                        shape="circle"
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <ImageUploader />
            </Col>
          </Row>
          <Row gutter={[10]}>
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
            <Col span={12}>
              <Form.Item
                validateStatus={errors.email ? "error" : "validating"}
                help={errors.email}
                label="E-mail"
              >
                <Input
                  id="email"
                  name="email"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.email}
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
      <ModalPosition
        refetch={posRefetch}
        openModal={openPositionModal}
        handleCloseModal={togglePosition}
      />
    </ModalForm>
  );
}
