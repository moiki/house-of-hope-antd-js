import gql from "graphql-tag";

export const createUserGQL = gql`
  mutation createUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
    $password: String!
    $profession: String!
    $address: String
    $roles: [String!]!
  ) {
    createUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      phone_number: $phone_number
      password: $password
      profession: $profession
      address: $address
      roles: $roles
    ) {
      message
      id
    }
  }
`;

export const editUserGQL = gql`
  mutation editUser(
    $id: String!
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
    $password: String!
    $profession: String!
    $address: String
    $roles: [String!]
  ) {
    editUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      phone_number: $phone_number
      password: $password
      profession: $profession
      address: $address
      roles: $roles
    ) {
      message
      status
    }
  }
`;

export const deleteUserGQL = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      message
      status
    }
  }
`;
