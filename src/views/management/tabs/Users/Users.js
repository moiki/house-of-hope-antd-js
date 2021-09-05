import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space, Popconfirm } from "antd";
import Button from "antd-button-color";
import moment from "moment";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { userListGQL } from "graphql/queries/userQueries";
import { deleteUserGQL } from "graphql/mutations/userMutation";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import AlertMessage from "components/MyAlert/Alert";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserCU from "./UserCU";
import randomIdForRow from "utils/TableKeygen";
import Roles from "../Roles";

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
      render: (text, row) => {
        return (
          <Space size="middle">
            <Button
              className="ant-btn-info"
              shape="round"
              onClick={() => handleUpdate(text)}
              icon={<EditOutlined />}
            >
              Edit
            </Button>
            {row?.roles?.some((val) => val.role_name !== "Root") ? (
              <Popconfirm
                placement="top"
                title={"Are you sure to delete this Account?"}
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
            ) : null}
          </Space>
        );
      },
    },
  ];
  const [refetchUser, { loading: loadingUser }] = useLazyQuery(userListGQL, {
    onCompleted: (e) => {
      const res = e.userList;
      setLocalData(res);
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

  const [executeDelete, { loadingDelete }] = useMutation(deleteUserGQL, {
    onCompleted: () => {
      refetchUser();
      AlertMessage("Completed!", <span>Account Deleted!</span>, "success");
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });
  const handleClickOpenRole = () => {
    setOpenModalRole(!openModalRole);
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
      {openModalRole && (
        <Roles
          handleCloseModal={handleClickOpenRole}
          openModal={openModalRole}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          shape="round"
          style={{ marginRight: "1rem" }}
          icon={<UserAddOutlined />}
          onClick={handleModalUser}
        >
          Create New User
        </Button>
        <Button
          type="info"
          shape="round"
          icon={<UserAddOutlined />}
          onClick={handleClickOpenRole}
        >
          Roles Information
        </Button>
      </div>
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
