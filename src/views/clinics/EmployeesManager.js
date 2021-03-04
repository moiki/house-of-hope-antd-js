import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import randomIdForRow from "utils/TableKeygen";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import { clinicListGQL } from "graphql/queries/clinicsQueries";
import { deleteClinicGQL } from "graphql/mutations/clinicsMutation";
import ClinicCU from "./ClinicCU";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";

export default function EmployeesManager() {
  const [loaded, setLoaded] = useState(false);
  const [idClinic, setIdClinic] = useState(null);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);
  const [modalClinicState, setModalClinicState] = useState(false);
  const handleModalClinic = () => setModalClinicState(!modalClinicState);

  const handleClickClose = () => {
    handleModalClinic();
    if (idClinic) {
      setIdClinic(null);
    }
  };

  const [refetchClinic, { loadingFetch }] = useLazyQuery(clinicListGQL, {
    onCompleted: (e) => {
      setLocalData(e.result);
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

  const [executeDelete, { loadingDelete }] = useMutation(deleteClinicGQL, {
    onCompleted: () => {
      refetchClinic();
      AlertMessage("Completed!", <span>Account Deleted!</span>, "success");
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });

  const handleEdit = (e) => {
    setIdClinic(e);
    handleModalClinic();
  };
  const handleDelete = (e) => {
    if (e) {
      executeDelete({
        variables: {
          id: e,
        },
      });
    }
  };

  const columns = [
    {
      title: "Employee Name",
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Clinic",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button
            type="ghost"
            onClick={() => handleEdit(text)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Clinic?"}
            onConfirm={() => handleDelete(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (visible && !loaded) {
      refetchClinic();
      setLoaded(true);
    }
  }, [visible]);

  return (
    <div ref={setRef}>
      <Button
        type="primary"
        shape="round"
        onClick={handleModalClinic}
        icon={<PlusOutlined />}
      >
        Add New Employee
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        loading={loadingFetch || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {modalClinicState && (
        <ClinicCU
          idClinic={idClinic}
          refetchClinics={refetchClinic}
          handleCloseModal={handleClickClose}
          openModal={modalClinicState}
        />
      )}
    </div>
  );
}
