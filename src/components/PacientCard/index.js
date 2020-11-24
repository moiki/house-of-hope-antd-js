import React from "react";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

export default function PatientCard(props) {
  return (
    <div className={props.className}>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://hopecrucitas.com/wp-content/uploads/2019/09/othermother-2.jpg"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta title="Card title" description="This is the description" />
      </Card>
    </div>
  );
}
