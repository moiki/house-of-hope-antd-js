import { Modal } from "antd";
import React from "react";

export default function ModalForm({
  title,
  handleClose,
  style,
  handleSubmit,
  loading,
  children,
  openModal,
  okText,
  width,
}) {
  return (
    <Modal
      maskClosable={false}
      mask={false}
      style={style}
      visible={openModal}
      confirmLoading={loading}
      title={title}
      okText={okText}
      width={width ? width : 520}
      cancelText="Cancel"
      style={{ top: 20 }}
      onCancel={handleClose}
      onOk={handleSubmit}
    >
      {children}
    </Modal>
  );
}
