import { gql } from "graphql-tag";

export const workRouteReviewGQL = gql`
  query workRouteReview {
    result: workrouteReview {
      id
      name
      clinic
    }
  }
`;

export const workRoutesListGQL = gql`
  query workRoutesList {
    result: workRoutesList {
      id
      route_name
      description
      featured_image
      clinic
      employees
      patients
      destinations
    }
  }
`;

export const getWorkRouteGQL = gql`
  query getWorkRoute {
    result: getWorkRoute {
      id
      route_name
      description
      featured_image
      clinic
      employees
      patients
      destinations
    }
  }
`;
