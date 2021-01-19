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

export const getUserGQL = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      id
      first_name
      last_name
      email
      phone
      profession
      address
      country
      state
      city
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

export const invitationsGQL = gql`
  query invitations {
    invitations {
      id
      email
      answered
      created_date
    }
  }
`;
export const emailInvitationCheckGQL = gql`
  query emailInvitationCheck($hash: String!) {
    emailInvitationCheck(hash: $hash) {
      id
      email
      role_id
      invitation
    }
  }
`;
