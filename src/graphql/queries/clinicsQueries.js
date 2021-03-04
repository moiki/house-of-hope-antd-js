import gql from "graphql-tag";

// Here wi will include employees queries

export const clinicsReviewGQL = gql`
  query clinicsReview {
    result: clinicsReview {
      id
      name
      description
      image
    }
  }
`;

export const clinicListGQL = gql`
  query clinicList {
    result: clinicList {
      id
      name
      description
      address
      city
      phone
      employees
      pacients
      workRoutes
    }
  }
`;

export const getClinicGQL = gql`
  query getClinic($id: String!) {
    result: getClinic(id: $id) {
      id
      name
      description
      address
      city
      state
      phone
      employees
      pacients
      workRoutes
    }
  }
`;
