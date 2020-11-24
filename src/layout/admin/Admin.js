import React, { useState, useContext } from "react";
import { Avatar, Image, Layout, Menu, PageHeader } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import MainPagesList from "../../PagesList";
import { NavLink, Route, Switch } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import dotenv from "dotenv";
import { MainStore } from "App";
import routes from "routes";
import SubMenu from "antd/lib/menu/SubMenu";
import logo from "assets/img/LOGO2.png";
import AuthDropdown from "components/authDropdown";

const { Header, Sider, Content } = Layout;

export default function Admin(props) {
  const { state } = useContext(MainStore);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const URI = process.env.REACT_APP_PUBLIC_URL;
  const toggle = () => setCollapsed(!collapsed);

  const LoadContent = () => {
    return MainPagesList.map((r, i) => {
      if (
        r.layout === "admin" &&
        r.allowedRoles.some((route) => state.user.role.includes(route))
      ) {
        const Comp = r.component;
        return (
          <Route
            key={i}
            path={`/admin/${r.path}`}
            render={(props) => <Comp {...props} />}
            exact
          />
        );
      }
      return null;
    });
  };

  return loading ? (
    <LoadingScreen
      setLoading={() => setLoading(false)}
      uri={URI}
      history={props.history}
    />
  ) : (
    <Layout>
      <Sider
        theme="light"
        className="sidebar"
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          {collapsed ? (
            <Avatar
              style={{ marginLeft: 7 }}
              className="anticon"
              src={<Image src={logo} />}
            />
          ) : (
            <span>
              <Avatar
                className="anticon"
                style={{ marginRight: 5 }}
                src={<Image src={logo} />}
              />{" "}
              House Of Hope
            </span>
          )}
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          {routes.map((v, i) => {
            if (
              v.layout === "admin" &&
              v.allowedRoles.some((route) => state.user.role.includes(route))
            ) {
              return v.children ? (
                <SubMenu icon={v.icon} key={i} title={v.title}>
                  {v.children.map((f, g) => {
                    if (
                      v.layout === "admin" &&
                      v.allowedRoles.some((route) =>
                        state.user.role.includes(route)
                      )
                    ) {
                      return (
                        <Menu.Item key={`_${g}_${v.title}`}>
                          <NavLink to={`/admin/${f.path}`}>{f.title}</NavLink>
                        </Menu.Item>
                      );
                    }
                  })}
                </SubMenu>
              ) : (
                <Menu.Item key={i} icon={v.icon}>
                  <NavLink to={`/admin/${v.path}`}>{v.title}</NavLink>
                </Menu.Item>
              );
            }
            return null;
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <PageHeader
          title={React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          subTitle={
            <b
              style={{ color: "white" }}
            >{`Welcome ${state.user.fullname}!`}</b>
          }
          ghost={true}
          className="header-hoh"
          style={{ padding: 0 }}
        >
          <AuthDropdown email={state.user.email} name={state.user.fullname} />
        </PageHeader>
        <Content
          className="site-layout-background content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>{LoadContent()}</Switch>
        </Content>
        <Footer
          style={{ textAlign: "center", color: "white", background: "#005a69" }}
        >
          Bradley's House Of Hope ©2020 Created by MR
        </Footer>
      </Layout>
    </Layout>
  );
}
