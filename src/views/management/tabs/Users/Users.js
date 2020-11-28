import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space, Button, Popconfirm } from "antd";
import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { userListGQL } from "graphql/queries/userQueries";
import { deleteUserGQL } from "graphql/mutations/userMutation";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import Alert from "components/MyAlert/Alert";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserCU from "./UserCU";
import randomIdForRow from "utils/TableKeygen";

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
      title: "Registration Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => <span>{moment(text).format("MMM Do, YYYY")}</span>,
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
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button
            type="ghost"
            onClick={() => handleUpdate(text)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Account?"}
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
  const [refetchUser, { loading: loadingUser }] = useLazyQuery(userListGQL, {
    onCompleted: (e) => {
      const res = e.userList;
      setLocalData(res);
    },
    onError: (e) => {
      Alert(
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

  const [executeDelete, { loadingDelete }] = useMutation(deleteUserGQL, {
    onCompleted: () => {
      refetchUser();
      Alert("Completed!", <span>Account Deleted!</span>, "success");
    },
    onError: (e) => {
      console.log(e);
      Alert("Error", <span>Error During Process!</span>, "error");
    },
  });
  const handleClickOpen = () => {
    setOpenModalRole(true);
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

  const handleClickClose = () => {
    handleModalUser();
    if (idUser) {
      setIdUser(null);
    }
  };

  const handleUpdate = (e) => {
    setIdUser(e);
    setOpenModalUser(true);
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
          idUser={idUser}
          refetchUser={refetchUser}
          handleCloseModal={handleClickClose}
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
        loading={loadingUser || loadingDelete}
        dataSource={localData}
        rowKey={() => randomIdForRow()}
      />
    </div>
  );
}
