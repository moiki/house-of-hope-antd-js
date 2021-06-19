import React, { useState } from "react";
import { getClinicGQL } from "graphql/queries/clinicsQueries";
import { useQuery } from "@apollo/react-hooks";
import { GraphError } from "components/MyAlert/GraphQlError";
import { useHistory, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Card, Col, Row } from "antd";
import moment from "moment";
import Title from "antd/lib/typography/Title";
import Button from "antd-button-color";
import { BackwardFilled, UsergroupAddOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

export default function ClinicDetails(props) {
  const [clinic, setClinic] = useState({});
  const hist = useHistory();
  const { state } = hist.location;
  const { loading } = useQuery(getClinicGQL, {
    onCompleted: (e) => {
      const resp = e.result;
      setClinic({
        ...resp,
      });
    },
    onError: (e) => {
      console.log(e.graphQLErrors);
      GraphError(e);
      hist.push("/admin/clinics/review");
    },
    variables: {
      id: state?.id,
    },
  });
  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "inherit",
        height: "inherit",
        margin: "9rem",
      }}
    >
      <Col flex="center">
        <BeatLoader size={70} color="#084954" loading />
      </Col>
    </div>
  ) : (
    <div style={{ color: "black" }}>
      <Button
        type="primary"
        shape="round"
        style={{ float: "right" }}
        onClick={() => hist.goBack()}
        icon={<BackwardFilled />}
      >
        Go Back
      </Button>
      <Title>{clinic.name}</Title>
      <p>Registered on {moment(clinic.created_date).format("MMM Do YYYY")}</p>
      <Row gutter={16}>
        <Col span={8}>
          {" "}
          <Card className="ant-btn-danger" color="#084954">
            <Title style={{ color: "white" }}>
              <UsergroupAddOutlined />
              <CountUp
                className="account-balance"
                start={0}
                end={875.0319}
                duration={3.75}
                useEasing={true}
                useGrouping={true}
                separator=" "
                prefix="Workers "
              />
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          {" "}
          <Card className="ant-btn-success">
            <Title style={{ color: "white" }}>
              <UsergroupAddOutlined />
              <CountUp
                className="account-balance"
                start={0}
                end={875.0319}
                duration={3.75}
                useEasing={true}
                useGrouping={true}
                separator=" "
                prefix="Patients "
              />
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          {" "}
          <Card className="ant-btn-primary">
            <Title style={{ color: "white" }}>
              <UsergroupAddOutlined />
              <CountUp
                className="account-balance"
                start={0}
                end={875.0319}
                duration={3.75}
                useEasing={true}
                useGrouping={true}
                separator=" "
                prefix="Routes "
              />
            </Title>
          </Card>
        </Col>
      </Row>

      <div dangerouslySetInnerHTML={{ __html: clinic.description }}></div>
    </div>
  );
}
