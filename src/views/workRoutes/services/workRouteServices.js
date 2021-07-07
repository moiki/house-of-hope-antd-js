import React, { useEffect, useState, useContext } from "react";
import useForm from "utils/useForm/UseForm";
import csc from "country-state-city";
import { departments } from "utils/NationalCitiesHandler";
import Joi from "@hapi/joi";
import { createUpdateWorkRouteGQL } from "graphql/mutations/workRouteMutation";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import workRouteSchema from "../workRouteSchema";
import { comunities } from "utils/NationalCitiesHandler";
import { GraphError } from "components/MyAlert/GraphQlError";
import { EditorState } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { MainStore } from "App";
import AlertMessage from "components/MyAlert/Alert";
import { getWorkRouteGQL } from "graphql/queries/workRouteQueries";

const schema = {
  destination_name: Joi.string().required().label("First name").messages({
    "string.base": "Destination name is required",
    "any.required": "Destination name is required",
    "string.empty": "Destination name is required",
  }),
  description: Joi.string().required().label("First name").messages({
    "string.base": "Description is required",
    "any.required": "Description is required",
    "string.empty": "Description is required",
  }),
  google_map_url: Joi.string().required().label("First name").messages({
    "string.base": "Google Map Url is required",
    "any.required": "Google Map Url is required",
    "string.empty": "Google Map Url is required",
  }),
};

export function useWorkRouteService(props) {
  const { openModal, handleCloseModal, idWorkRoute, refetchWorkRoutes } = props;
  const { state } = useContext(MainStore);
  const { clinics } = state;
  const [destinations, setDestinations] = useState([]);

  const [editorState, setEditorState] = useState("");
  const [fetchWorkRoute, { loading: loadingFetch }] = useLazyQuery(
    getWorkRouteGQL,
    {
      onCompleted: (e) => {
        const res = e.result;
        setEditorState(res.description);
        // debugger;
        updateValues({
          id: res.id,
          route_name: res.route_name,
          description: res.description,
          featured_image: res.featured_image,
          clinic: res.clinic,
          employees: res.employees,
          patients: res.patients,
          destinations: res.destinations,
        });
      },
      onError: (e) => {
        handleCloseModal();
        GraphError(e);
      },
    }
  );
  const [executeCreate, { loading }] = useMutation(createUpdateWorkRouteGQL, {
    onCompleted: (e) => {
      refetchWorkRoutes();
      AlertMessage(
        "Completed!",
        <span>WorkRoute Created Successfully!</span>,
        "success"
      );
      handleCloseModal();
    },
    onError: (e) => {
      GraphError(e);
    },
  });

  const defaultValues = {
    id: null,
    route_name: null,
    description: null,
    featured_image: null,
    clinic: null,
    employees: [],
    patients: [],
    // destinations: null,
  };
  const submitForm = async () => {
    const sbm = {
      id: idWorkRoute,
      route_name: values.route_name,
      description: values.description,
      featured_image: values.featured_image,
      clinic: values.clinic,
      employees: values.employees,
      patients: values.patients,
      destinations: destinations,
    };
    console.log(sbm);
    // if (idWorkRoute) {
    //   executeUpdate({
    //     variables: {
    //       ...sbm,
    //     },
    //   });
    // } else {
    //   executeCreate({
    //     variables: {
    //       ...sbm,
    //     },
    //   });
    // }
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,<RiHospitalLine className="anticon" />
  } = useForm(submitForm, defaultValues, workRouteSchema);

  const onchangeDescription = (value) => {
    setEditorState(value);
    handleChange(value, "description");
  };
  const handleClinic = (e) => {
    handleChange(e, "clinic");
  };

  useEffect(() => {
    if (idWorkRoute) {
      fetchWorkRoute({
        variables: { id: idWorkRoute },
      });
    }
  }, [idWorkRoute]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    loading,
    onchangeDescription,
    executeCreate,
    loadingFetch,
    handleClinic,
    clinics,
    editorState,
    destinations,
    setDestinations,
  };
}

export function useDestinationCrud({ create = () => {} }) {
  const countryList = csc.getAllCountries();
  const [featuredImage, setFeaturedImage] = useState(null);
  const states = departments();
  const [cities, setCities] = useState([]);
  const defaultValues = {
    destination_name: null,
    description: null,
    google_map_url: null,
  };

  const lcCreate = () => {
    const data = {
      destination_name: values.destination_name,
      description: values.description,
      google_map_url: values.google_map_url,
    };
    create(data);
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    // updateSchema,<RiHospitalLine className="anticon" />
  } = useForm(lcCreate, defaultValues, schema);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    updateValues,
    featuredImage,
    setFeaturedImage,
    states,
  };
}
