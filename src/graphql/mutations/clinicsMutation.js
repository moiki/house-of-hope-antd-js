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
    $birth_date: DateTime!
    $email: String!
    $country: String!
    $state: String
    $city: String
    $phoneNumbers: [String!]!
    $positions: [String!]!
    $clinic: String!
  ) {
    result: createUpdateEmployee(
      id: $id
      first_name: $first_name
      last_name: $last_name
      birth_date: $birth_date
      email: $email
      country: $country
      state: $state
      city: $city
      phoneNumbers: $phoneNumbers
      positions: $positions
      clinic: $clinic
    ) {
      status
      message
    }
  }
`;
