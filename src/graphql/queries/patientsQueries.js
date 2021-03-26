import { gql } from "graphql-tag";

export const getPatientGQL = gql`
  query getPatient($id: String!) {
    result: getPatient(id: $id) {
      id
      profile
      first_name
      last_name
      address
      country
      state
      city
      clinic
      gender
    }
  }
`;

export const PatientListGQL = gql`
  query PatientList($id: String!) {
    result: PatientList(id: $id) {
      id
      profile
      first_name
      last_name
      address
      country
      state
      city
      clinic
      gender
    }
  }
`;

export const PatientsReviewGQL = gql`
  query PatientsReview {
    result: PatientsReview {
      id
      name
      clinic
    }
  }
`;
