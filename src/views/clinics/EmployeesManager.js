import React, { useState, useEffect, useContext } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import moment from "moment";
import randomIdForRow from "utils/TableKeygen";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import { clinicListGQL } from "graphql/queries/clinicsQueries";
import { deleteClinicGQL } from "graphql/mutations/clinicsMutation";
import ClinicCU from "./ClinicCU";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";
import EmployeeCU from "./EmployeeCU";
import { employeesListGQL } from "graphql/queries/clinicsQueries";
import { deleteEmployeeGQL } from "graphql/mutations/clinicsMutation";
import { MainStore } from "App";

export default function EmployeesManager() {
  const { state } = useContext(MainStore);
  const [loaded, setLoaded] = useState(false);
  const [idEmployee, setIdEmployee] = useState(null);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);
  const [modalEmployeeState, setModalEmployeeState] = useState(false);
  const handleModalEmployee = () => setModalEmployeeState(!modalEmployeeState);

  const handleClickClose = () => {
    handleModalEmployee();
    if (idEmployee) {
      setIdEmployee(null);
    }
  };

  const [refetchEmployees, { loadingFetch }] = useLazyQuery(employeesListGQL, {
    onCompleted: (e) => {
      const resp = e.result.map((v) => {
        return {
          ...v,
          name: `${v.first_name} ${v.last_name}`,
          phone: v.phone_number,
          clinic: v.clinic,
        };
      });
      // console.log(resp);
      setLocalData(resp);
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

  const [executeDelete, { loadingDelete }] = useMutation(deleteEmployeeGQL, {
    onCompleted: () => {
      refetchEmployees();
      AlertMessage("Completed!", <span>Employee Deleted!</span>, "success");
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });

  const handleEdit = (e) => {
    setIdEmployee(e);
    handleModalEmployee();
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position Role",
      dataIndex: "positions",
      key: "positions",
      render: (text) => (
        <span>
          {text.length
            ? text.map((v, i) => {
                return (
                  <Tag color="green" key={i}>
                    {v.label.toUpperCase()}
                  </Tag>
                );
              })
            : null}
        </span>
      ),
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
            title={"Are you sure to delete this Clinic?"}
            onConfirm={() => handleDelete(text)}
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

  useEffect(() => {
    if (visible && !loaded) {
      refetchEmployees();
      setLoaded(true);
    }
  }, [visible]);

  return (
    <div ref={setRef}>
      <Button
        type="primary"
        shape="round"
        onClick={handleModalEmployee}
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
      {modalEmployeeState && (
        <EmployeeCU
          idEmployee={idEmployee}
          refetchEmployees={refetchEmployees}
          handleCloseModal={handleClickClose}
          openModal={modalEmployeeState}
        />
      )}
    </div>
  );
}
