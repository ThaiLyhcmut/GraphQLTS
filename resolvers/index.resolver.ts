import { resolversAccount } from "./account.resolver";
import { resolversArticle } from "./article.resolver";
import { resolversCategory } from "./category.resolver";

export const resolvers = [
  resolversArticle, resolversCategory, resolversAccount
]