import React from "react";
import ClinicCard from "components/clinicCard";
import "assets/css/clinic.css";

export default function RoutesView() {
  return (
    <div className="clinic-card-container">
      {[0, 0, 0, 0, 0, 0].map((_, i) => {
        return (
          <ClinicCard
            img={"https://www.disrepimport.com/assets/images/i4.png"}
          />
        );
      })}
    </div>
  );
}
