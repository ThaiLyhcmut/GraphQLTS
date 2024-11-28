//type Query => Truy van du lieu


export const typeDefsCategory = `#graphql
  type Category {
    id: String
    title: String
    avatar: String
  }

  type Query {
    getListCategory: [Category]
    getCategory(id: String): Category
  }

  input CategoryInput {
    title: String
    avatar: String
  }

  type Mutation {
    createCategory(category: CategoryInput): Category
    deleteCategory(id: String): ResponseCode
    updateCategory(id: String, category: CategoryInput): Category
  }
`;