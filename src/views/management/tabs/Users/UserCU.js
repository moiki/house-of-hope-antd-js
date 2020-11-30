import React, { useEffect, useContext } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { createUserGQL } from "graphql/mutations/userMutation";
import { editUserGQL } from "graphql/mutations/userMutation";
import Alert from "components/MyAlert/Alert";
import useForm from "utils/useForm/UseForm";
import { EditUserSchema, RegisterSchema } from "./UserSchema";
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
import { MdSupervisorAccount } from "react-icons/md";
import { AccountStore } from "views/management";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { getUserGQL } from "graphql/queries/userQueries";
import { BeatLoader } from "react-spinners";
const { Option } = Select;

const PasswordRules = () => {
  return (
    <div className="h-tooltip">
      <ul>
        <li>MUST contain at least 8 characters (12+ recommended)</li>
        <li>MUST contain at least one uppercase letter</li>
        <li>MUST contain at least one lowercase letter</li>
        <li>MUST contain at least one number</li>
        <li>{`MUST contain at least one special character (!*+,-./?@[]^_{|})`}</li>
      </ul>
    </div>
  );
};

export default function UserCU(props) {
  const { roleList } = useContext(AccountStore);

  const { openModal, handleCloseModal, idUser, refetchUser, mySchema } = props;

  const [fetchUser, { loading: loadingFetch }] = useLazyQuery(getUserGQL, {
    onCompleted: (e) => {
      const res = e.getUser;
      updateSchema(EditUserSchema);
      updateValues({
        id: res.id,
        first_name: res.first_name,
        last_name: res.last_name,
        email: res.email,
        profession: res.profession,
        address: res.address,
        phone_number: res.phone,
        role: res.roles.length ? res.roles[0].role_name : null,
      });
    },
    onError: (e) => {
      handleCloseModal();
      Alert("Error", <span>Error Fetching Account Data!</span>, "error");
    },
  });

  const [executeCreate, { loading }] = useMutation(createUserGQL, {
    onCompleted: (e) => {
      refetchUser();
      Alert(
        "Completed!",
        <span>Account Created Successfully!</span>,
        "success"
      );
      handleCloseModal();
    },
    onError: (e) => {
      console.log(e);
      Alert("Error", <span>Error During Process!</span>, "error");
    },
  });

  const [executeUpdate, { loading: LoadingEdit }] = useMutation(editUserGQL, {
    onCompleted: (e) => {
      refetchUser();
      Alert(
        "Completed!",
        <span>Account Updated Successfully!</span>,
        "success"
      );
      handleCloseModal();
    },
    onError: (e) => {
      console.log(e);
      Alert("Error", <span>Error During Process!</span>, "error");
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
      id: idUser,
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
    updateSchema,
  } = useForm(submitForm, defaultValues, RegisterSchema);

  useEffect(() => {
    if (idUser) {
      fetchUser({
        variables: { id: idUser },
      });
    }
  }, [idUser]);

  return (
    <Modal
      maskClosable={false}
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
      okText={idUser ? "Update" : "Create"}
      cancelText="Cancel"
      style={{ top: 20 }}
      onCancel={handleCloseModal}
      onOk={handleSubmit}
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
          {!idUser && (
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
          )}
        </Form>
      </Spin>
    </Modal>
  );
}
