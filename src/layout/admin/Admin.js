import React, { useState, useContext } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/lib/layout/layout";
import MainPagesList from "../../PagesList";
import { Route, Switch } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import dotenv from "dotenv";
import { MainStore } from "App";
import routes from "routes";
import SubMenu from "antd/lib/menu/SubMenu";

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
        <div className="logo">House Of Hope</div>
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
                      return <Menu.Item key={`_${g}`}>{f.title}</Menu.Item>;
                    }
                  })}
                </SubMenu>
              ) : (
                <Menu.Item key={i} icon={v.icon}>
                  {v.title}
                </Menu.Item>
              );
            }
            return null;
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header-hoh"
          style={{ padding: 0 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
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
        <Footer style={{ textAlign: "center" }}>
          Bradley's House Of Hope ©2020 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
