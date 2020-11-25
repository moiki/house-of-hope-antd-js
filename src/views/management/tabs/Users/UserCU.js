import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { createUserGQL } from "graphql/mutations/userMutation";
import { editUserGQL } from "graphql/mutations/userMutation";
import Alert from "components/MyAlert/Alert";
import useForm from "utils/useForm/UseForm";
import { RegisterSchema } from "./UserSchema";
import {
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  AutoComplete,
} from "antd";
import { MdSupervisorAccount } from "react-icons/md";
import { AccountStore } from "views/management";
const { Option } = Select;

export default function UserCU(props) {
  const { roleList } = useContext(AccountStore);

  const { openModal, handleCloseModal, idUser, refetchUser, mySchema } = props;

  const [executeCreate, { loading }] = useMutation(createUserGQL, {
    onCompleted: (e) => {
      handleCloseModal();
      refetchUser();
    },
    onError: (e) => {
      console.log(e);
      Alert.fire("Error", <span>Error During Process!</span>, "error");
    },
  });

  const [executeUpdate, { loading: LoadingEdit }] = useMutation(editUserGQL, {
    onCompleted: (e) => {
      handleCloseModal();
      refetchUser();
    },
    onError: (e) => {
      console.log(e);
      Alert.fire("Error", <span>Error During Process!</span>, "error");
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
      id: idUser || null,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      profession: values.profession,
      address: values.address,
      phone_number: values.phone_number,
      password: values.password,
      roles: [values.role],
    };
    if (idUser) {
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
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
  } = useForm(submitForm, defaultValues, RegisterSchema);
  return (
    <Modal
      visible={openModal}
      confirmLoading={loading || LoadingEdit}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <MdSupervisorAccount
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new account
        </span>
      }
      okText="Create"
      cancelText="Cancel"
      style={{ top: 20 }}
      onCancel={handleCloseModal}
      onOk={handleSubmit}
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
              {/* <Input
                id="role"
                name="role"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={values.role}
                onChange={handleChange}
              /> */}
              <Select
                id="role"
                name="role"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={values.role}
                onChange={(value) => handleChange(value, "role")}
              >
                {roleList &&
                  roleList.map((v) => (
                    <Option key={v.id} value={v.role_name}>
                      {v.role_name}
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
        <Form.Item
          validateStatus={errors.password ? "error" : "validating"}
          help={errors.password}
          label="Password"
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
          validateStatus={errors.password_confirmation ? "error" : "validating"}
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
      </Form>
    </Modal>
  );
}
