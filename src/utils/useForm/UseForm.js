import { useState, useEffect } from "react";
import Joi from "@hapi/joi";

const validationForm = (values, schemaValidation, onBlurState) => {
  const errors = {};
  const classNames = {};
  try {
    const result = schemaValidation.validate(values, { abortEarly: false });
    result.error.details.map((inputError) => {
      if (onBlurState[inputError.path[0]]) {
        errors[inputError.path[0]] = inputError.message;
        classNames[inputError.path[0]] = "has-danger";
      }
    });
    for (const property in onBlurState) {
      if (onBlurState[property] && !errors[property]) {
        classNames[property] = ""; // 'has-success'
      } else if (!errors[property]) {
        classNames[property] = "";
      }
    }
    return {
      errors,
      classNames,
    };
  } catch (e) {
    return {
      errors,
      classNames,
    };
  }
};

const useForm = (submitForm, defaultValues, schema) => {
  const [values, setValues] = useState(defaultValues);
  const [schemaValidation, setSchemaValidation] = useState(Joi.object(schema));
  const [onBlurState, setOnBlurState] = useState({});
  const [errors, setErrors] = useState({});
  const [classNames, setClassNames] = useState({});

  const updateValues = (body) => {
    if (body) {
      setValues(body);
    }
  };

  const updateSchema = (body) => {
    if (body) {
      setSchemaValidation(Joi.object(body));
    }
  };
  useEffect(() => {
    const defaultClassNames = {};
    for (const property in defaultValues) {
      defaultClassNames[property] = "";
    }
    setClassNames(defaultClassNames);
  }, []);

  const handleSubmit = (event) => {
    const newBlurState = {};
    for (const property in defaultValues) {
      newBlurState[property] = true;
    }
    const { errors, classNames } = validationForm(
      values,
      schemaValidation,
      newBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setOnBlurState(newBlurState);
    // console.log("errors ", errors);
    if (Object.keys(errors).length === 0) {
      if (event) event.preventDefault();
      submitForm();
    }
    if (event) event.preventDefault();
  };

  const setEspecificValue = (value, inputName) => {
    const newValue = value;
    const { errors, classNames } = validationForm(
      {
        ...values,
        [inputName]: newValue,
      },
      schemaValidation,
      onBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setValues((values) => ({ ...values, [inputName]: newValue }));
  };

  const handleChangeDatePicker = (value, inputName) => {
    let newDate = null;
    if (value) {
      newDate = value.format("YYYY-MM-DD");
    }
    const { errors, classNames } = validationForm(
      {
        ...values,
        [inputName]: newDate,
      },
      schemaValidation,
      onBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setValues((values) => ({ ...values, [inputName]: newDate }));
  };

  const handleChangeReactSelect = (value, inputName) => {
    let newValue = null;
    if (value) {
      if (Array.isArray(value)) {
        newValue = value.map((multiValue) => multiValue.value);
      } else {
        newValue = value.value;
      }
    }

    const { errors, classNames } = validationForm(
      {
        ...values,
        [inputName]: newValue,
      },
      schemaValidation,
      onBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setValues((values) => ({ ...values, [inputName]: newValue }));
  };

  const handleChange = (event, name) => {
    if (event.persist) event.persist();
    const { errors, classNames } = validationForm(
      {
        ...values,
        [name ? name : event.target.name]: name ? event : event.target.value,
      },
      schemaValidation,
      onBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setValues((values) => ({
      ...values,
      [name ? name : event.target.name]: name ? event : event.target.value,
    }));
  };

  const handleChangePhone = (event, targetName) => {
    // if (event.persist()) event.persist();
    const { errors, classNames } = validationForm(
      {
        ...values,
        [targetName]: event,
      },
      schemaValidation,
      onBlurState
    );
    setErrors(errors);
    setClassNames(classNames);
    setValues((values) => ({ ...values, [targetName]: event }));
  };

  const handleBlurReactSelect = (event, targetName) => {
    event.persist();
    const newBlurState = {
      ...onBlurState,
      [targetName]: true,
    };
    const { errors, classNames } = validationForm(
      values,
      schemaValidation,
      newBlurState
    );
    setNewStates(errors, classNames, newBlurState);
  };

  const handleBlurReactDate = (date, name) => {
    const newBlurState = {
      ...onBlurState,
      [name]: true,
    };
    const { errors, classNames } = validationForm(
      values,
      schemaValidation,
      newBlurState
    );
    setNewStates(errors, classNames, newBlurState);
  };

  const handleBlur = (event) => {
    event.persist();
    const newBlurState = {
      ...onBlurState,
      [event.target.name]: true,
    };
    const { errors, classNames } = validationForm(
      values,
      schemaValidation,
      newBlurState
    );
    setNewStates(errors, classNames, newBlurState);
  };

  const handleBlurPhone = (targetName) => {
    const newBlurState = {
      ...onBlurState,
      [targetName]: true,
    };
    const { errors, classNames } = validationForm(
      values,
      schemaValidation,
      newBlurState
    );
    setNewStates(errors, classNames, newBlurState);
  };

  const setNewStates = (errors, classNames, newBlurState) => {
    setErrors(errors);
    setClassNames(classNames);
    setOnBlurState(newBlurState);
  };

  return {
    setEspecificValue,
    handleChange,
    handleChangeReactSelect,
    handleChangeDatePicker,
    handleSubmit,
    handleBlur,
    handleBlurReactDate,
    handleBlurReactSelect,
    handleChangePhone,
    handleBlurPhone,
    onBlurState,
    values,
    errors,
    classNames,
    updateValues,
    updateSchema,
  };
};

export default useForm;
