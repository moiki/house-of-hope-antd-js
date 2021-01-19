import gql from "graphql-tag";

export const createUserGQL = gql`
  mutation createUser(
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
    $password: String!
    $profession: String!
    $address: String!
    $country: String!
    $state: String!
    $city: String
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
      country: $country
      state: $state
      city: $city
      roles: $roles
    ) {
      message
      id
    }
  }
`;

export const signUpGQL = gql`
  mutation signUp(
    $first_name: String!
    $last_name: String!
    $email: String!
    $phone_number: String!
    $password: String!
    $profession: String!
    $address: String!
    $country: String!
    $state: String!
    $city: String
    $roles: [String!]!
    $invitation: String!
  ) {
    signUp(
      first_name: $first_name
      last_name: $last_name
      email: $email
      phone_number: $phone_number
      password: $password
      profession: $profession
      address: $address
      country: $country
      state: $state
      city: $city
      roles: $roles
      invitation: $invitation
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
    $profession: String!
    $country: String!
    $state: String!
    $city: String
    $address: String
    $roles: [String!]!
  ) {
    editUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
      phone_number: $phone_number
      profession: $profession
      address: $address
      country: $country
      state: $state
      city: $city
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

export const createInvitationGQL = gql`
  mutation createInvitation($email: String!, $roleId: String!) {
    createInvitation(email: $email, roleId: $roleId) {
      status
      message
    }
  }
`;

export const deleteInvitationGQL = gql`
  mutation deleteInvitation($id: String!) {
    deleteInvitation(id: $id) {
      message
      status
    }
  }
`;

export const resendInvitationGQL = gql`
  mutation resendInvitation($id: String!) {
    resendInvitation(id: $id) {
      message
      status
    }
  }
`;
