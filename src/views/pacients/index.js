import React from "react";
import ClinicCard from "components/clinicCard";
import "assets/css/clinic.css";

export default function PacientsView() {
  return (
    <div className="clinic-card-container">
      {[0, 0, 0, 0, 0, 0].map((_, i) => {
        return (
          <ClinicCard
            img={
              "https://png.pngtree.com/png-vector/20190802/ourlarge/pngtree-patient-user-injured-hospital-flat-color-icon-vector-icon-png-image_1645907.jpg"
            }
          />
        );
      })}
    </div>
  );
}
