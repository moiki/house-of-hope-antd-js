import React from "react";
import { List, Avatar } from "antd";
import { StarOutlined } from "@ant-design/icons";

export default function Roles(props) {
  const { data } = props;
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                src={<StarOutlined />}
              />
            }
            title={<a href="https://ant.design">{item.role_name}</a>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
