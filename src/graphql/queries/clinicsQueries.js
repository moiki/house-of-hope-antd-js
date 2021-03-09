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

export const employeesListGQL = gql`
  query employeesList {
    result: employeesList {
      id
      first_name
      last_name
      clinic
      address
      email
      birth_date
      workRoutes
    }
  }
`;

export const positionsGQL = gql`
  query positions {
    result: positions {
      id
      name
      description
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

export const getEmployeeGQL = gql`
  query getEmployee($id: String!) {
    result: getEmployee(id: $id) {
      first_name
      last_name
      address
      country
      state
      city
      phoneNumbers
      positions
      clinic
      workRoutes
    }
  }
`;
