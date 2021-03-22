import gql from "graphql-tag";

// here will also go mutations for employees

export const createClinicGQL = gql`
  mutation createClinic(
    $name: String!
    $description: String!
    $phone_number: String!
    $address: String!
    $city: String!
  ) {
    createClinic(
      name: $name
      description: $description
      phone_number: $phone_number
      address: $address
      city: $city
    ) {
      message
      status
    }
  }
`;

export const updateClinicGQL = gql`
  mutation updateClinic(
    $id: String!
    $name: String!
    $description: String!
    $state: String!
    $phone_number: String!
    $address: String!
    $city: String!
  ) {
    updateClinic(
      id: $id
      name: $name
      description: $description
      state: $state
      phone_number: $phone_number
      address: $address
      city: $city
    ) {
      message
      status
    }
  }
`;

export const deleteClinicGQL = gql`
  mutation deleteClinic($id: String!) {
    deleteClinic(id: $id) {
      message
      status
    }
  }
`;

// Employees mutations

export const createUpdateEmployeeGQL = gql`
  mutation createUpdateEmployee(
    $id: String
    $first_name: String!
    $last_name: String!
    $address: String!
    $email: String!
    $country: String!
    $state: String
    $city: String
    $phone_number: String!
    $positions: [String!]!
    $clinic: String!
  ) {
    result: createUpdateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      address: $address
      email: $email
      country: $country
      state: $state
      city: $city
      phone_number: $phone_number
      positions: $positions
      clinic: $clinic
    ) {
      status
      message
    }
  }
`;

export const createUpdatePositionGQL = gql`
  mutation createUpdatePosition(
    $id: String
    $name: String!
    $description: String!
  ) {
    createUpdatePosition(id: $id, name: $name, description: $description) {
      status
      message
    }
  }
`;

export const deleteEmployeeGQL = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      message
      status
    }
  }
`;

export const deletePositionGQL = gql`
  mutation deletePosition($id: String!) {
    deletePosition(id: $id) {
      message
      status
    }
  }
`;
