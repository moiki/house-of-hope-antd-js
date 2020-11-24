import React from "react";
import banner from "assets/img/alcance.jpg";
import {
  Card,
  Col,
  Divider,
  Image,
  Row,
  Statistic,
  Timeline,
  Typography,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";
import PatientCard from "components/PacientCard";

export default function Home(props) {
  return (
    <React.Fragment>
      <div className="home-main-container">
        {/* <Image src={banner} /> */}
        <div className="pic-banner-container">
          <div className="pic-banner">
            <h1>FRIENDS OF BRADLEY'S HOUSE OF HOPE TRACKER SYSTEM</h1>
          </div>
        </div>
        <div className="site-statistic-demo-card">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Children Percentage Achieved"
                  value={91.28}
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
                  precision={0}
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
        <Card
          className="timeline-last-activities"
          title="Bradley's House Of Hope Last Activities"
        >
          <Timeline>
            <Timeline.Item color="green">
              Create a services site 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item color="green">
              Technical testing 2015-09-01
            </Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
            >
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
      <Divider
        style={{
          textAlign: "center",
          marginTop: "1.6rem",
          fontWeight: "lighter",
          color: "#545454",
          fontSize: 40,
        }}
        plain
      >
        {" "}
        Top 5 Pacients Cases
      </Divider>
      <div className="top-patients">
        {[1, 1, 1, 1, 1].map((v, i) => {
          return <PatientCard key={i} />;
        })}
      </div>
    </React.Fragment>
  );
}
