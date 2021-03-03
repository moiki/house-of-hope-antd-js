import React, { useState, useEffect } from "react";
import ClinicCard from "components/clinicCard";
import "assets/css/clinic.css";
import { useLazyQuery } from "@apollo/react-hooks";
import { clinicsReviewGQL } from "graphql/queries/clinicsQueries";
import AlertMessage from "components/MyAlert/Alert";
import { ScaleLoader } from "react-spinners";
import { useHistory } from "react-router-dom";

export default function ClinicsView() {
  const [clinicsState, setClinicsState] = useState([]);
  const hist = useHistory();
  const [refetchClinic, { loading }] = useLazyQuery(clinicsReviewGQL, {
    onCompleted: (e) => {
      setClinicsState(e.result);
    },
    onError: (e) => {
      AlertMessage(
        "Error",
        <div>
          <ul>
            {e.graphQLErrors.length > 0 ? (
              e.graphQLErrors.map((v, i) => <li key={i}>{v.message}</li>)
            ) : (
              <p>{e.message}</p>
            )}
          </ul>
        </div>,
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
              <div
                key={i}
                onClick={() => hist.push("/admin/clinics/details/" + v.id)}
              >
                <ClinicCard
                  key={i}
                  img={v.image}
                  title={v.name}
                  description={""}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
