import React, { useState, useEffect } from "react";
import { Col, Input, Row, Form } from "antd";
import ModalForm from "components/modalForm";
import useForm from "utils/useForm/UseForm";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import { RiHospitalLine } from "react-icons/ri";
import { useDestinationCrud } from "./services/workRouteServices";

export default function NewDestinationCU({
  openModal,
  handleCloseModal,
  idWorkRoute,
  refetchDestination,
  addDestination,
}) {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    featuredImage,
    setFeaturedImage,
    states,
  } = useDestinationCrud({ create: () => addDestination(values) });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <ModalForm
      openModal={openModal}
      width={600}
      loading={false}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <RiHospitalLine
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new Destination
        </span>
      }
      style={{ top: 20 }}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Row gutter={[10]}>
        <Col span={20}>
          <Form.Item
            validateStatus={errors.destination_name ? "error" : "validating"}
            help={errors.destination_name}
            label="Destination Name"
          >
            <Input
              id="destination_name"
              name="destination_name"
              autoComplete={"false"}
              onBlur={handleBlur}
              value={values.destination_name}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={20}>
          <Form.Item
            validateStatus={errors.description ? "error" : "validating"}
            help={errors.description}
            label="Short Description"
          >
            <Input
              id="description"
              name="description"
              autoComplete={"false"}
              onBlur={handleBlur}
              value={values.description}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10]}>
        <Col span={20}>
          <Form.Item
            validateStatus={errors.google_map_url ? "error" : "validating"}
            help={errors.google_map_url}
            label="Google Map Url"
          >
            <Input
              id="google_map_url"
              name="google_map_url"
              autoComplete={"false"}
              onBlur={handleBlur}
              value={values.google_map_url}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </ModalForm>
  );
}
