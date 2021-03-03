import React, { useState } from "react";
import { getClinicGQL } from "graphql/queries/clinicsQueries";
import { useQuery } from "@apollo/react-hooks";
import { GraphError } from "components/MyAlert/GraphQlError";
import { useHistory, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Col, Row } from "antd";
import moment from "moment";
import Title from "antd/lib/typography/Title";

export default function ClinicDetails(props) {
  const [clinic, setClinic] = useState({});
  const hist = useHistory();
  const { id } = useParams();
  const { loading, error } = useQuery(getClinicGQL, {
    onCompleted: (e) => {
      const resp = e.result;
      setClinic({
        ...resp,
      });
    },
    onError: (e) => {
      GraphError(e);
      hist.push("/admin/clinics/review");
    },
    variables: {
      id: id,
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
      <Title>{clinic.name}</Title>
      <p>Registered on {moment(clinic.created_date).format("MMM Do YYYY")}</p>
      <div dangerouslySetInnerHTML={{ __html: clinic.description }}></div>
    </div>
  );
}
