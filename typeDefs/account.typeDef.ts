//type Query => Truy van du lieu


export const typeDefsAccount = `#graphql
  type Account {
    id: String
    fullName: String
    email: String
    token: String
    code: String
    msg: String
  }

  type Query {
    getAccount(token: String!): Account
  }

  input RegisterAccountInput {
    fullName: String!
    email: String!
    password: String!
  }
  input LoginAccountInput {
    email: String!
    password: String!
  }

  type Mutation {
    registerAccount(account: RegisterAccountInput): Account
    loginAccount(account: LoginAccountInput): Account
  }
`;