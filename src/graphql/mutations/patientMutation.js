import gql from "graphql-tag";

export const CreateUpdatePatientGQL = gql`
  mutation CreateUpdatePatient(
    $id: String
    $first_name: String!
    $last_name: String!
    $address: String!
    $profile: String
    $birth_date: String!
    $country: String!
    $state: String
    $city: String
    $gender: String!
    $clinic: String!
  ) {
    result: CreateUpdatePatient(
      id: $id
      first_name: $first_name
      last_name: $last_name
      address: $address
      profile: $profile
      birth_date: $birth_date
      country: $country
      state: $state
      city: $city
      gender: $gender
      clinic: $clinic
    ) {
      status
      message
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
