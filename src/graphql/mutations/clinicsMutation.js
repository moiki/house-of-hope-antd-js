import gql from "graphql-tag";

export const createClinicGQL = gql`
  mutation createClinic(
    $name: String!
    $description: String!
    $phone_number: String!
    $address: String!
    $city: [String!]!
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
    $phone_number: String!
    $address: String!
    $city: [String!]!
  ) {
    updateClinic(
      id: $id
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

export const deleteClinicGQL = gql`
  mutation deleteClinic($id: String!) {
    deleteClinic(id: $id) {
      message
      status
    }
  }
`;
