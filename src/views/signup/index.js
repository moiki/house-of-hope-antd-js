import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { createUserGQL } from "graphql/mutations/userMutation";
import AlertMessage from "components/MyAlert/Alert";
import csc from "country-state-city";
import useForm from "utils/useForm/UseForm";
import { Tooltip, Select, Row, Col, Form, Input, Spin, Image } from "antd";
import { MdSupervisorAccount } from "react-icons/md";
import Icon, { QuestionCircleOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import logo from "assets/img/LOGO2.ico";
import { PasswordRules } from "views/management/tabs/Users/UserCU";
import { RegisterSchema } from "views/management/tabs/Users/UserSchema";
const { Option } = Select;

export default function SignUpView() {
  const countryList = csc.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const handleCountry = (e) => {
    const states = csc.getStatesOfCountry(e);
    const cu = csc.getCountryById(e);
    handleChange(cu.name, "country");
    setStates(states);
  };

  const handleState = (e) => {
    const states = csc.getCitiesOfState(e);
    const st = csc.getStateById(e);
    handleChange(st.name, "state");
    setCities(states);
  };

  const [executeCreate, { loading }] = useMutation(createUserGQL, {
    onCompleted: (e) => {
      AlertMessage(
        "Completed!",
        <span>Account Created Successfully!</span>,
        "success"
      );
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });
  const defaultValues = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    profession: "",
    address: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    role: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: null,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      profession: values.profession,
      address: values.address,
      phone_number: values.phone_number,
      password: values.password,
      roles: [values.role],
    };
    executeCreate({
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
    updateSchema,
  } = useForm(submitForm, defaultValues, RegisterSchema);
  return (
    <div className="signup" style={{ backgroundColor: "#126270" }}>
      <Modal
        closable={false}
        mask={false}
        title={
          <span style={{ display: "flex", alignItems: "center" }}>
            <Image width={50} src={logo} style={{ marginRight: 20 }} /> Welcome!
            Please complete your Sign Up
          </span>
        }
        visible={true}
        onOk={() => {}}
        onCancel={() => {}}
      >
        <Form
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Row gutter={[10]}>
            <Col span={12}>
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
            <Col span={12}>
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
          <Row gutter={[10]}>
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
            <Col span={12}>
              <Form.Item
                validateStatus={errors.profession ? "error" : "validating"}
                help={errors.profession}
                label="Profession"
              >
                <Input
                  id="profession"
                  name="profession"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.profession}
                  onChange={handleChange}
                />
              </Form.Item>
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
                validateStatus={errors.role ? "error" : "validating"}
                help={errors.role}
                label="Role"
              >
                <Input
                  disabled
                  id="role"
                  name="role"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={"Administrator"}
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
                <Select
                  showSearch
                  id="country"
                  name="country"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.country}
                  onChange={(value) => {
                    handleCountry(value);
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countryList &&
                    countryList.map((v) => (
                      <Option key={v.id} value={v.id}>
                        {v.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                validateStatus={errors.state ? "error" : "validating"}
                help={errors.state}
                label="state"
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
                >
                  {states &&
                    states.map((v) => (
                      <Option key={v.id} value={v.id}>
                        {v.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            validateStatus={errors.address ? "error" : "validating"}
            help={errors.address}
            label={<span>Address</span>}
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
          <React.Fragment>
            <Form.Item
              validateStatus={errors.password ? "error" : "validating"}
              help={errors.password}
              label={
                <span>
                  Password&nbsp;
                  <Tooltip color="white" title={<PasswordRules />}>
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Input.Password
                id="password"
                name="password"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              validateStatus={
                errors.password_confirmation ? "error" : "validating"
              }
              help={errors.password_confirmation}
            >
              <Input.Password
                id="password_confirmation"
                name="password_confirmation"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={values.password_confirmation}
                onChange={handleChange}
              />
            </Form.Item>
          </React.Fragment>
        </Form>
      </Modal>
    </div>
  );
}
