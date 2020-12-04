import React, { useContext, useState } from "react";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "react-avatar";
import { logout } from "utils/LoginUtil";
import { useHistory } from "react-router-dom";
import MyProfile from "views/auth/MyProfile";
import { MainStore } from "App";

export default function AuthDropdown(props) {
  const history = useHistory();
  const { state } = useContext(MainStore);
  const [openProf, setOpenProf] = useState(false);
  const toggleOpen = () => setOpenProf(!openProf);
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => toggleOpen()}>
        <span>
          <UserOutlined /> My Profile
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={() => logout(history)}>
        <span>
          <LogoutOutlined /> Log Out
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          className="ant-dropdown-link"
          style={{ marginRight: 15 }}
          onClick={(e) => e.preventDefault()}
        >
          <Avatar email={props.email} name={props.name} round size={40} />
        </a>
      </Dropdown>
      <MyProfile open={openProf} toggle={toggleOpen} currentUser={state.user} />
    </React.Fragment>
  );
}
