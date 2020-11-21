import React from "react";
import banner from "assets/img/alcance.jpg";
import { Card, Col, Image, Row, Statistic } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";

export default function Home(props) {
  return (
    <React.Fragment>
      <Row>
        <Col flex span={12}>
          <Image src={banner} />
        </Col>
        <Col flex span={12}>
          <div className="site-statistic-demo-card">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Children Percentage Achieved"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Rated Cases"
                    value={89.3}
                    precision={2}
                    valueStyle={{ color: "#faad14" }}
                    prefix={<StarFilled />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
            <Row gutter={[16]}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Active Pacients"
                    value={181}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<ArrowUpOutlined />}
                    suffix={<TeamOutlined />}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Lost Cases & Declined Families"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: "#cf1322" }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
