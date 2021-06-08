import React, { useState, useEffect, useContext } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Popconfirm, Space } from "antd";
import AlertMessage from "components/MyAlert/Alert";
import { GraphError } from "components/MyAlert/GraphQlError";
import { PatientListGQL } from "graphql/queries/patientsQueries";
import { departments } from "utils/NationalCitiesHandler";
import { comunities } from "utils/NationalCitiesHandler";
import moment from "moment";
import { useScreenObserverHook } from "utils/ScreenObserverHook";
import useForm from "utils/useForm/UseForm";
import patientSchema from "../patientSchema";
import { CreateUpdatePatientGQL } from "graphql/mutations/patientMutation";
import { getPatientGQL } from "graphql/queries/patientsQueries";
import { MainStore } from "App";

export const usePatientService = () => {
  const [loaded, setLoaded] = useState(false);
  const [idPatient, setIdPatient] = useState(null);
  const { setRef, visible } = useScreenObserverHook();
  const [localData, setLocalData] = useState([]);
  const [modalPatientState, setModalPatientState] = useState(false);
  const handleModalPatient = () => setModalPatientState(!modalPatientState);
  const handleClickClose = () => {
    handleModalPatient();
    if (idPatient) {
      setIdPatient(null);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Registration Date",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => <span>{moment(text).format("MMM Do, YYYY")}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Clinic",
      dataIndex: "clinic",
      key: "clinic",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Space size="middle">
          <Button
            type="ghost"
            shape="round"
            className="ant-btn-info"
            onClick={() => handleEdit(text)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            placement="top"
            title={"Are you sure to delete this Patient?"}
            // onConfirm={() => handleDelete(text)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              shape="round"
              className="ant-btn-danger"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [fetchPatient, { loading: loadingPatient }] = useLazyQuery(
    PatientListGQL,
    {
      onCompleted: (e) => {
        setLocalData(e.result);
      },
      onError: (e) => {
        GraphError(e);
      },
    }
  );
  const handleEdit = (e) => {
    setIdPatient(e);
    handleModalPatient();
  };

  useEffect(() => {
    if (visible) {
      fetchPatient();
    }
  }, [visible]);

  return {
    setRef,
    visible,
    fetchPatient,
    modalPatientState,
    handleModalPatient,
    loadingPatient,
    idPatient,
    handleClickClose,
    localData,
    columns,
  };
};

export const useCrudPatientService = (
  handleCloseModal,
  idPatient,
  refetchPatients
) => {
  const { state } = useContext(MainStore);
  const { clinics } = state;

  const states = departments();
  const [cities, setCities] = useState([]);
  const [imageEmployee, setImageEmployee] = useState(null);
  const handleState = (e) => {
    const states = comunities(e);
    handleChange(e, "state");
    setCities(states);
  };

  const handleclinic = (e) => {
    handleChange(e, "clinic");
  };

  const [fetchPatient, { loading: loadingFetch }] = useLazyQuery(
    getPatientGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        updateValues({
          first_name: res.first_name,
          last_name: res.last_name,
          clinic: res.clinic,
          profile: res.profile,
          address: res.address,
          country: res.country,
          state: res.state,
          city: res.city,
          gender: res.gender,
        });
      },
      onError: (e) => {
        handleCloseModal();
        GraphError(e);
      },
    }
  );
  const [executeCreateUpdate, { loading }] = useMutation(
    CreateUpdatePatientGQL,
    {
      onCompleted: (e) => {
        refetchPatients();
        AlertMessage(
          "Completed!",
          <span>Employee Created Successfully!</span>,
          "success"
        );
        handleCloseModal();
      },
      onError: (e) => {
        GraphError(e);
      },
    }
  );

  const defaultValues = {
    first_name: "",
    last_name: "",
    clinic: "",
    birth_date: "",
    gender: "",
    address: "",
    country: "Nicaragua",
    state: "",
    city: "",
  };
  const submitForm = async () => {
    const sbm = {
      id: idPatient,
      profile: null,
      first_name: values.first_name,
      last_name: values.last_name,
      clinic: values.clinic,
      birth_date: values.birth_date,
      gender: values.gender,
      address: values.address,
      country: "Nicaragua",
      state: values.state,
      city: values.city,
    };
    executeCreateUpdate({
      variables: {
        ...sbm,
      },
    });
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,<RiHospitalLine className="anticon" />
  } = useForm(submitForm, defaultValues, patientSchema);

  useEffect(() => {
    if (idPatient) {
      fetchPatient({
        variables: { id: idPatient },
      });
    }
  }, [idPatient]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    loading,
    handleBlur,
    states,
    cities,
    loadingFetch,
    clinics,
    handleclinic,
    setImageEmployee,
    handleState,
    imageEmployee,
  };
};
