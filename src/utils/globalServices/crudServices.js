import { useLazyQuery, useMutation } from "@apollo/client";
import AlertMessage from "components/MyAlert/Alert";
import { GraphError } from "components/MyAlert/GraphQlError";

const CRUD_TYPE = {
  CREATE: () =>
    AlertMessage(
      "Completed!",
      <span>Data Saved Successfully!</span>,
      "success"
    ),
  UPDATE: () =>
    AlertMessage(
      "Completed!",
      <span>Data Updated Successfully!</span>,
      "success"
    ),
  DELETE: () =>
    AlertMessage(
      "Completed!",
      <span>Data Deleted Successfully!</span>,
      "success"
    ),
};

export const useCreateUpdateDelete = ({
  query,
  onSuccess,
  type = "CREATE",
}) => {
  const [executeCreateUpdate, { loading }] = useMutation(query, {
    onCompleted: (e) => {
      CRUD_TYPE[type]();
      onSuccess(e);
    },
    onError: (e) => {
      GraphError(e);
    },
  });

  const submitGql = (body = {}) => executeCreateUpdate({ variables: body });

  return {
    submitGql,
    loading,
  };
};

export const useGet = ({ query, onSuccess, onError }) => {
  const [fetchItem, { loading }] = useLazyQuery(query, {
    onCompleted: (e) => {
      onSuccess(e);
    },
    onError: (e) => {
      GraphError(e);
      onError();
    },
  });
  const fetch = (body = {}) => fetchItem({ variables: body });
  return { fetch, loading };
};
