import React, { useEffect, useContext, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import Alert from "components/MyAlert/Alert";
import useForm from "utils/useForm/UseForm";
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
  Spin,
} from "antd";
import { AccountStore } from "views/management";
import { MailFilled, MailOutlined } from "@ant-design/icons";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import { createInvitationGQL } from "graphql/mutations/userMutation";
import Joi from "@hapi/joi";
const { Option } = Select;

export default function InvitationCU(props) {
  const { roleList } = useContext(AccountStore);
  const [roleValue, setRoleValue] = useState("");
  const {
    openModal,
    handleCloseModal,
    idInvitation,
    refetchInvitation,
  } = props;
  const myschema = {
    email: Joi.string()
      .label("Email")
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        "string.email": "Please enter a valid Email address.",
        "any.required": "Email is a required",
        "string.empty": "Email is a required",
      }),
    roleId: Joi.string().required().label("Role").messages({
      "string.base": "Role is required",
      "any.required": "Role is required",
      "string.empty": "Role is required",
    }),
  };

  const [executeCreate, { loading }] = useMutation(createInvitationGQL, {
    onCompleted: (e) => {
      refetchInvitation();
      Alert("Completed!", <span>{e.createInvitation.message}</span>, "success");
      handleCloseModal();
    },
    onError: (e) => {
      console.log(e);
      Alert("Error", <span>Error During Process!</span>, "error");
    },
  });

  const submitForm = () => {
    executeCreate({
      variables: {
        ...values,
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
  } = useForm(submitForm, { email: "", roleId: "" }, myschema);

  return (
    <ModalForm
      openModal={openModal}
      loading={loading}
      okText={idInvitation ? "Update" : "Create"}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <MailFilled
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new Invitation
        </span>
      }
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Form layout="vertical" name="form_in_modal">
        <Row gutter={[10]}>
          <Col span={12}>
            <Form.Item
              validateStatus={errors.email ? "error" : "validating"}
              help={errors.email}
              label="Email"
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
              validateStatus={errors.roleId ? "error" : "validating"}
              help={errors.roleId}
              label="Role"
            >
              <Select
                id="roleId"
                name="roleId"
                autoComplete={"false"}
                onBlur={handleBlur}
                value={roleValue}
                onChange={(value) => {
                  handleChange(value, "roleId");
                  setRoleValue(value);
                }}
              >
                {roleList &&
                  roleList.map((v) => (
                    <Option key={v.id} value={v.id}>
                      {v.role_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalForm>
  );
}
