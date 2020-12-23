import React from "react";
import { BeatLoader } from "react-spinners";
import ModalForm from "components/modalForm";
import { Tooltip, Select, Row, Col, Form, Input, Spin } from "antd";
const { Option } = Select;
import { useMutation } from "@apollo/react-hooks";
import AlertMessage from "components/MyAlert/Alert";
import {
  createClinicGQL,
  updateClinicGQL,
} from "graphql/mutations/clinicsMutation";
import { clinicSchema } from "./clinicSchema";
import { getClinicGQL } from "graphql/queries/clinicsQueries";

export default function ClinicCU(props) {
  const { openModal, handleCloseModal, idClinic, refetchClinics } = props;

  const [fetchClinic, { loading: loadingFetch }] = useLazyQuery(getClinicGQL, {
    onCompleted: (e) => {
      const res = e.result;
      updateValues({
        id: res.id,
        name: res.name,
        decription: res.decription,
        city: res.city,
        address: res.address,
        phone_number: res.phone,
        address: res.address,
      });
    },
    onError: (e) => {
      handleCloseModal();
      AlertMessage("Error", <span>Error Fetching Account Data!</span>, "error");
    },
  });
  const [executeCreate, { loading }] = useMutation(createClinicGQL, {
    onCompleted: (e) => {
      refetchClinics();
      AlertMessage(
        "Completed!",
        <span>Clinic Created Successfully!</span>,
        "success"
      );
      handleCloseModal();
    },
    onError: (e) => {
      console.log(e);
      AlertMessage("Error", <span>Error During Process!</span>, "error");
    },
  });

  const [executeUpdate, { loading: LoadingEdit }] = useMutation(
    updateClinicGQL,
    {
      onCompleted: (e) => {
        refetchClinics();
        AlertMessage(
          "Completed!",
          <span>Clinic Updated Successfully!</span>,
          "success"
        );
        handleCloseModal();
      },
      onError: (e) => {
        console.log(e);
        AlertMessage("Error", <span>Error During Process!</span>, "error");
      },
    }
  );

  const defaultValues = {
    id: null,
    name: "",
    description: "",
    address: "",
    phone_number: "",
    city: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: idClinic,
      name: values.name,
      description: values.description,
      city: values.city,
      address: values.address,
      phone_number: values.phone_number,
    };
    if (idClinic) {
      executeUpdate({
        variables: {
          ...sbm,
        },
      });
    } else {
      executeCreate({
        variables: {
          ...sbm,
        },
      });
    }
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,
  } = useForm(submitForm, defaultValues, clinicSchema);

  useEffect(() => {
    if (idClinic) {
      fetchClinic({
        variables: { id: idClinic },
      });
    }
  }, [idClinic]);

  return (
    <ModalForm
      openModal={openModal}
      loading={loading || LoadingEdit}
      title={
        <span style={{ display: "flex", alignItems: "center" }}>
          <MdSupervisorAccount
            size={30}
            className="cl-primary"
            style={{ marginRight: 10 }}
          />{" "}
          Create a new account
        </span>
      }
      style={{ top: 20 }}
      handleClose={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <Spin
        spinning={loadingFetch}
        className="custom-spinner"
        indicator={<BeatLoader size={20} color="#084954" loading />}
      >
        <Form
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.name ? "error" : "validating"}
                help={errors.name}
                label="First Name"
              >
                <Input
                  id="name"
                  name="name"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.phone_number ? "error" : "validating"}
                help={errors.phone_number}
                label="Phone Number"
              >
                <Input
                  id="phone_number"
                  name="phone_number"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.phone_number}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10]}>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.city ? "error" : "validating"}
                help={errors.city}
                label="City"
              >
                <Input
                  id="city"
                  name="city"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.city}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                validateStatus={errors.address ? "error" : "validating"}
                help={errors.address}
                label="Address"
              >
                <Input
                  id="address"
                  name="address"
                  autoComplete={"false"}
                  onBlur={handleBlur}
                  value={values.address}
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            validateStatus={errors.address ? "error" : "validating"}
            help={errors.address}
            label={<span>Address</span>}
          >
            <Input.TextArea
              id="description"
              name="description"
              autoComplete={"false"}
              onBlur={handleBlur}
              value={values.description}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Spin>
    </ModalForm>
  );
}
