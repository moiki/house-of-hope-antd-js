import React, { useEffect, useState, useContext } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

import { logout } from "utils/LoginUtil";
import _ from "lodash";
import { SET_USER, SET_HISTORY, SET_INITIAL_STATE } from "store/actions";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Col, Row } from "antd";
import { MainStore } from "App";
// import './styles.css'
const meGQL = gql`
  {
    me {
      id
      full_name
      email
      phone
      profession
      roles {
        role_name
      }
    }
  }
`;

const LoadingScreen = (props) => {
  const { state, dispatch } = useContext(MainStore);
  const [verifyLogin, setVerifyLogin] = useState(false);
  const { loading, error, data } = useQuery(meGQL, { fetchPolicy: "no-cache" });

  useEffect(() => {
    if (data && !loading) {
      if (data.me) {
        setVerifyLogin(true);
        const cuser = {
          fullname: `${data.me.full_name}`,
          email: data.me.email,
          role: data.me.roles.map((r) => r.role_name),
          profession: data.me.profession,
          phoneNumber: data.me.phone,
        };
        dispatch({ type: SET_USER, payload: cuser });
        dispatch({ type: SET_HISTORY, payload: props.history });
        props.setLoading();
      } else {
        logoutAndClear();
      }
    } else if (error) {
      logoutAndClear();
    }
  }, [data, error]);

  useEffect(() => {
    // hay algo de un verifyToken que no me acuerdo
    if (!state.user && verifyLogin) {
      logoutAndClear();
    } else if (props.history.location.pathname) {
      // const userRol = state.user.role.name
    }
  }, [props.location, state]);

  const logoutAndClear = () => {
    dispatch({ type: SET_INITIAL_STATE });
    logout(props.history);
  };

  return (
    <Row
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Col span={24}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ScaleLoader sizeUnit="px" size={70} color="green" loading />
          </div>
          <div>
            <h5
              variant="h1"
              style={{ fontSize: "1.75rem", display: "flex", paddingLeft: 14 }}
            >
              Loading...
            </h5>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoadingScreen;
