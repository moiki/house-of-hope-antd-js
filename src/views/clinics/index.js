import React from "react";
import ClinicCard from "components/clinicCard";
import "assets/css/clinic.css";

export default function ClinicsView() {
  return (
    <div className="clinic-card-container">
      {[0, 0, 0, 0, 0, 0].map((_, i) => {
        return (
          <ClinicCard
            img={
              "https://hopecrucitas.com/wp-content/uploads/2019/09/oficina_bluefield.jpg"
            }
          />
        );
      })}
    </div>
  );
}
