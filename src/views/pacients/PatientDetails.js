import React, { useState } from "react";
import { getClinicGQL } from "graphql/queries/clinicsQueries";
import { useQuery } from "@apollo/react-hooks";
import { GraphError } from "components/MyAlert/GraphQlError";
import { useHistory, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Col, Row, Space, Timeline } from "antd";
import moment from "moment";
import Title from "antd/lib/typography/Title";
import gql from "graphql-tag";

const getPatientGQL = gql`
  query getPatient($id: String!) {
    result: getPatient(id: $id) {
      id
      profile
      first_name
      last_name
      address
      country
      state
      city
      clinic
      gender
      birth_date
    }
  }
`;
export default function PatientDetails(props) {
  const [clinic, setClinic] = useState({});
  const hist = useHistory();
  const { state: patientParam } = hist.location;
  const { id } = useParams();
  const { loading, error } = useQuery(getPatientGQL, {
    onCompleted: (e) => {
      const resp = e.result;
      setClinic({
        ...resp,
      });
    },
    onError: (e) => {
      GraphError(e);
      // hist.push("/admin/clinics/review");
    },
    variables: {
      id: patientParam?.id,
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
      <Title>
        {clinic.first_name} {clinic.last_name}
      </Title>
      <p>Registered on {moment().format("MMM Do YYYY")}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: clinic.description }}></div> */}
      <Space />
      <div>
        <h3>Activity Timeline</h3>
        <Timeline>
          <Timeline.Item color="green">
            Create a services site 2015-09-01
          </Timeline.Item>
          <Timeline.Item color="green">
            Create a services site 2015-09-01
          </Timeline.Item>
          <Timeline.Item color="red">
            <p>Solve initial network problems 1</p>
            <p>Solve initial network problems 2</p>
            <p>Solve initial network problems 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item>
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
          <Timeline.Item color="gray">
            <p>Technical testing 1</p>
            <p>Technical testing 2</p>
            <p>Technical testing 3 2015-09-01</p>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}
