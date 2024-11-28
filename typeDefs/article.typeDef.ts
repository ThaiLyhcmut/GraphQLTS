//type Query => Truy van du lieu


export const typeDefsArticle = `#graphql
  type Article {
    id: String
    title: String
    avatar: String
    description: String
    categoryId: String
    category: Category
  }

  type ResponseCode {
    code: String
    msg: String
  }

  type Query {
    getListArticle: [Article]
    getArticle(id: String): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String,
    categoryId: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article
    deleteArticle(id: String): ResponseCode
    updateArticle(id: String, article: ArticleInput): Article
  }
`;