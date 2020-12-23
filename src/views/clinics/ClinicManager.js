import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import randomIdForRow from "utils/TableKeygen";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import { clinicListGQL } from "graphql/queries/clinicsQueries";

export default function ClinicManager() {
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

  const columns = [
    {
      title: "Clinic Name",
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
      title: "Clinic Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Number of Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button type="ghost" icon={<EditOutlined />}>
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Account?"}
            // onConfirm={() => handleDelete(text)}
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

  const [refetchClinic, { loading }] = useLazyQuery(clinicListGQL, {
    onCompleted: (e) => {
      setLocalData(e.result);
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
        // onClick={handleModalInvitation}
        icon={<PlusOutlined />}
      >
        Add New Clinic
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        // loading={loadingInvitation || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {modalClinicState && (
        <UserCU
          idClinic={idClinic}
          refetchUser={refetchClinic}
          handleCloseModal={handleClickClose}
          openModal={modalClinicState}
        />
      )}
    </div>
  );
}
