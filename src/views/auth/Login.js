import React, { useState } from "react";
import gql from "graphql-tag";
import useForm from "utils/useForm/UseForm";
import { useMutation } from "@apollo/react-hooks";
import { login as loginUtil } from "../../utils/LoginUtil";
import validationSchema from "./LoginSchema";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { LockOutlined, UserAddOutlined } from "@ant-design/icons";
import "../../assets/css/auth.css";
import logo from "assets/img/LOGO2.png";
const loginGQL = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export default function Login(props) {
  const [errorState, setErrorState] = useState([]);
  const [fetchLogin, { loading }] = useMutation(loginGQL, {
    onCompleted: (e) => {
      loginUtil(e.login, props.history);
    },
    onError: (e) => {
      if (e.graphQLErrors.length < 1) {
        setErrorState([e]);
      } else {
        setErrorState(e.graphQLErrors);
      }
    },
  });
  const getDefaultValues = () => {
    return {
      email: "",
      password: "",
    };
  };
  const submitForm = () => {
    fetchLogin({
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
    classNames,
  } = useForm(
    submitForm,
    {
      email: "",
      password: "",
    },
    validationSchema
  );
  return (
    <Row className="auth-main">
      <Col className="auth-image" span={12}></Col>
      <Col span={12}>
        <form
          onSubmit={handleSubmit}
          className="ant-form ant-form-horizontal login-form"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ marginBottom: "1em" }} src={logo} />
          </div>
          <Form.Item
            validateStatus={errors.email ? "error" : "validating"}
            help={errors.email}
          >
            <Input
              id="email"
              name="email"
              autoComplete={"false"}
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              prefix={<UserAddOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            validateStatus={errors.password ? "error" : "validating"}
            help={errors.password}
          >
            <Input.Password
              id="password"
              name="password"
              autoComplete={"false"}
              value={values.password}
              onChange={handleChange}
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
            Or <a href="#">register now!</a>
          </Form.Item>
        </form>
      </Col>
    </Row>
  );
}
