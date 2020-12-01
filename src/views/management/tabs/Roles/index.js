import React, { useContext } from "react";
import { List, Avatar, Modal } from "antd";
import { StarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { AccountStore } from "views/management";
import { MdSupervisorAccount } from "react-icons/md";

export default function Roles(props) {
  const { roleList } = useContext(AccountStore);

  const { handleCloseModal, openModal } = props;
  return (
    <Modal
      maskClosable={false}
      mask={false}
      visible={openModal}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <UnorderedListOutlined
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Roles
        </span>
      }
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <List
        itemLayout="horizontal"
        dataSource={roleList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#126270" }}
                  src={<StarOutlined />}
                />
              }
              title={<a href="https://ant.design">{item.role_name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
}
