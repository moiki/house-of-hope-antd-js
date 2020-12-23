import React from "react";
import { Card } from "antd";
const { Meta } = Card;

export default function ClinicCard({ img, title, description }) {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={img} />}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
