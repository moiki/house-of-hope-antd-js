import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import randomIdForRow from "utils/TableKeygen";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import PatientCU from "./patientCU";

export default function PacientsManager() {
  const [loaded, setLoaded] = useState(false);
  const [idPatient, setIdPatient] = useState(null);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);
  const [modalPatientState, setModalPatientState] = useState(false);
  const handleModalPatient = () => setModalPatientState(!modalPatientState);
  const handleClickClose = () => {
    handleModalPatient();
    if (idPatient) {
      setIdPatient(null);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Registration Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => <span>{moment(text).format("MMM Do, YYYY")}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Clinic",
      dataIndex: "clinic",
      key: "clinic",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button
            type="ghost"
            shape="round"
            className="ant-btn-info"
            onClick={() => handleEdit(text)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Patient?"}
            // onConfirm={() => handleDelete(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              shape="round"
              className="ant-btn-danger"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (e) => {
    setIdPatient(e);
    handleModalPatient();
  };
  return (
    <div>
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
        // loading={loadingInvitation || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {modalPatientState && (
        <PatientCU
          idPatient={idPatient}
          // refetchPatients={refetchPatients}
          handleCloseModal={handleClickClose}
          openModal={modalPatientState}
        />
      )}
    </div>
  );
}
