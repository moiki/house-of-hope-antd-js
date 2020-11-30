import { Modal } from "antd";
import React from "react";

export default function ModalForm({
  title,
  handleClose,
  handleSubmit,
  loading,
  children,
  openModal,
  okText,
}) {
  return (
    <Modal
      maskClosable={false}
      mask={false}
      visible={openModal}
      confirmLoading={loading}
      title={title}
      okText={okText}
      cancelText="Cancel"
      style={{ top: 20 }}
      onCancel={handleClose}
      onOk={handleSubmit}
    >
      {children}
    </Modal>
  );
}
