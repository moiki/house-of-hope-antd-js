import gql from "graphql-tag";

export const userListGQL = gql`
  query userList {
    userList: users {
      id
      full_name
      email
      phone
      profession
      created_date
      roles {
        role_name
      }
    }
  }
`;

export const roleListGQL = gql`
  query roleList {
    roleList: roles {
      id
      role_name
      description
    }
  }
`;
