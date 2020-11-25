import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space, Button } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/react-hooks";
import { userListGQL } from "graphql/queries/userQueries";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import Alert from "components/MyAlert/Alert";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserCU from "./UserCU";

export default function Users(props) {
  const [openModalRole, setOpenModalRole] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);

  const handleModalUser = () => setOpenModalUser(!openModalUser);

  const columns = [
    {
      title: "User Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Of Sign In",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => (
        <span>{moment(props.value).format("MMM Do, YYYY")}</span>
      ),
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      render: (text) => (
        <span>
          {text.length
            ? text.map((v, i) => {
                return (
                  <Tag
                    color={v.role_name === "Root" ? "magenta" : "green"}
                    key={i}
                  >
                    {v.role_name.toUpperCase()}
                  </Tag>
                );
              })
            : null}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="ghost" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [refetchUser, { loading: loadingUser }] = useLazyQuery(userListGQL, {
    onCompleted: (e) => {
      const res = e.userList;
      setLocalData(res);
    },
    onError: (e) => {
      Alert.fire(
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
  const handleClickOpen = () => {
    setOpenModalRole(true);
  };
  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true);
      refetchUser();
    }
  }, [visible]);
  return (
    <div ref={setRef}>
      {openModalUser && (
        <UserCU
          refetchUser={refetchUser}
          handleCloseModal={handleModalUser}
          openModal={openModalUser}
        />
      )}
      <Button
        type="primary"
        shape="round"
        icon={<UserAddOutlined />}
        onClick={handleModalUser}
      >
        Create New User
      </Button>
      <Table
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
        columns={columns}
        loading={loadingUser}
        dataSource={localData}
      />
    </div>
  );
}
