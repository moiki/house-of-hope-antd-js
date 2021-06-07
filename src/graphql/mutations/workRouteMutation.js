import gql from "graphql-tag";

export const createUpdateWorkRouteGQL = gql`
  mutation createUpdateWorkRoute(
    $id: String
    $route_name: String!
    $profile: String
    $description: String!
    $employees: String
    $phone_number: String!
    $patients: [String!]!
    $employees: [String!]!
    $destinations: [String!]!
    $clinic: String!
  ) {
    result: createUpdateWorkRoute(
      id: $id
      route_name: $route_name
      last_name: $last_name
      address: $address
      profile: $profile
      description: $description
      employees: $employees
      destinations: $destinations
      patients: $patients
      clinic: $clinic
    ) {
      status
      message
    }
  }
`;

export const deleteWorkRouteGQL = gql`
  mutation deleteWorkRoute($id: String!) {
    deleteWorkRoute(id: $id) {
      message
      status
    }
  }
`;
