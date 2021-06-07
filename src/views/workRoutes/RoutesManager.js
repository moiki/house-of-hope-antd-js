import React, { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import randomIdForRow from "utils/TableKeygen";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import WorkRouteCU from "./workRouteCU";

export default function RoutesManager() {
  const [loaded, setLoaded] = useState(false);
  const { setRef, visible } = useScreenObserverHook();
  const [modalRoute, setModalRoute] = useState(false);
  const [localData, setLocalData] = useState([]);
  const handleModal = () => setModalRoute(!modalRoute);
  const columns = [
    {
      title: "Route Name",
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
      title: "Start Point",
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
  return (
    <div>
      <Button
        type="primary"
        shape="round"
        onClick={handleModal}
        icon={<PlusOutlined />}
      >
        Add New Route
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        // loading={loadingInvitation || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
      {modalRoute && (
        <WorkRouteCU
          idWorkRoute={null}
          refetchWorkRoutes={() => {}}
          handleCloseModal={handleModal}
          openModal={modalRoute}
        />
      )}
    </div>
  );
}
