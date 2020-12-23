import React, { useState, useEffect } from "react";
import ClinicCard from "components/clinicCard";
import "assets/css/clinic.css";
import { useLazyQuery } from "@apollo/react-hooks";
import { clinicsReviewGQL } from "graphql/queries/clinicsQueries";
import AlertMessage from "components/MyAlert/Alert";
import { ScaleLoader } from "react-spinners";

export default function ClinicsView() {
  const [clinicsState, setClinicsState] = useState([]);
  const [refetchClinic, { loading }] = useLazyQuery(clinicsReviewGQL, {
    onCompleted: (e) => {
      setClinicsState(e.result);
    },
    onError: (e) => {
      AlertMessage(
        "Error",
        <p>
          <ul>
            {e.graphQLErrors.length > 0 ? (
              e.graphQLErrors.map((v, i) => <li key={i}>{v.message}</li>)
            ) : (
              <p>{e.message}</p>
            )}
          </ul>
        </p>,
        "error"
      );
    },
  });

  useEffect(() => {
    refetchClinic();
  }, []);
  return (
    <div className="clinic-card-container">
      {loading ? (
        <div style={{ marginTop: "30%", marginLeft: "30%" }}>
          <ScaleLoader loading color="#084954" />
        </div>
      ) : (
        <>
          {clinicsState.map((v, i) => {
            return (
              <ClinicCard
                key={i}
                img={v.image}
                title={v.name}
                description={v.description}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
