import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import randomIdForRow from "utils/TableKeygen";
import PatientCU from "./patientCU";
import { usePatientService } from "./patientService";

export default function PacientsManager() {
  const {
    setRef,
    modalPatientState,
    handleModalPatient,
    loadingPatient,
    idPatient,
    handleClickClose,
    localData,
    columns,
    fetchPatient,
  } = usePatientService();
  return (
    <div ref={setRef}>
      <Button
        type="primary"
        shape="round"
        onClick={handleModalPatient}
        icon={<PlusOutlined />}
      >
        Add New Pacient
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        loading={loadingPatient}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {modalPatientState && (
        <PatientCU
          idPatient={idPatient}
          refetchPatients={fetchPatient}
          handleCloseModal={handleClickClose}
          openModal={modalPatientState}
        />
      )}
    </div>
  );
}
