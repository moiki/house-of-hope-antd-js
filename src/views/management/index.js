import React, { useState, useEffect, createContext, useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { roleListGQL } from "graphql/queries/userQueries";
import Alert from "components/MyAlert/Alert";
import { Tabs } from "antd";
import { BarsOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { MainStore } from "App";
import Users from "./tabs/Users/Users";
import Roles from "./tabs/Roles";
import InvitationList from "./tabs/invitation";
const { TabPane } = Tabs;
export const AccountStore = createContext();

export default function ManagementView() {
  const { state } = useContext(MainStore);
  const [roleState, setRoleState] = useState([]);
  const [fetchRoles, { loading }] = useLazyQuery(roleListGQL, {
    onCompleted: (e) => {
      setRoleState(e.roleList);
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
  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <AccountStore.Provider
      value={{
        roleList: roleState,
        loadUsers: null,
      }}
    >
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={
            <h1>
              <UserOutlined />
              Users
            </h1>
          }
          key="1"
        >
          <Users />
        </TabPane>
        <TabPane
          tab={
            <h1>
              <MailOutlined />
              Invitations
            </h1>
          }
          key="2"
        >
          <InvitationList />
        </TabPane>
      </Tabs>
    </AccountStore.Provider>
  );
}
