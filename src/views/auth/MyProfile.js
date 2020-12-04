import React from "react";
import { Col, Drawer, Row, Divider } from "antd";
import Avatar from "react-avatar";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default function MyProfile(props) {
  const { currentUser, open, toggle } = props;
  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={toggle}
      visible={open}
    >
      <div
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        <Avatar email={currentUser.email} name={currentUser.fullname} />
        <p>{currentUser.fullname}</p>
      </div>
      <p className="site-description-item-profile-p">Personal</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Full Name" content="Lily" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Account" content={currentUser.email} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Address" content={currentUser.address} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Profession"
            content={currentUser.profession}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DescriptionItem
            title="System Role"
            content={currentUser.role.length > 0 ? currentUser.role[0] : " - "}
          />
        </Col>
      </Row>
      <Divider />
      <p className="site-description-item-profile-p">
        Bradley's House Of Hope Colaboration Role
      </p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Clinic" content="Blufields Main Clinic" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Clinic Role" content={<a>Therapist</a>} />
        </Col>
      </Row>
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <DescriptionItem title="Responsibilities" content="ETC..." />
        </Col>
      </Row>
      {/* <Divider />
      <p className="site-description-item-profile-p">Contacts</p>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Email" content="AntDesign@example.com" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
        </Col>
      </Row> */}
    </Drawer>
  );
}
