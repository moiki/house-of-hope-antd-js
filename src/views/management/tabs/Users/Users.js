import React, { useState, useEffect, useContext } from "react";
import { Table, Tag, Space } from "antd";
import moment from "moment";
import { useLazyQuery } from "@apollo/react-hooks";
import { userListGQL } from "graphql/queries/userQueries";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import Alert from "components/MyAlert/Alert";

export default function Users(props) {
  const [openModalRole, setOpenModalRole] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);

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
          <a>Edit</a>
          <a>Delete</a>
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
      <Table columns={columns} loading={loadingUser} dataSource={localData} />
    </div>
  );
}
