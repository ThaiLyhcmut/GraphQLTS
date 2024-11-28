import { Article } from "../models/article.model";
import { Category } from "../models/category.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const { sortKey, sortValue, currentPage, limitItems, filterKey, filterValue } = args
      const sort = {}
      const find = {
        deleted: false
      }
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue
      }
      const skip = (currentPage - 1)*limitItems
      if (filterKey && filterValue) {
        find[filterKey] = filterValue
      }
      const articles = await Article.find(find).sort(sort).limit(limitItems).skip(skip)
      return articles
    },
    getArticle: async (_, args) => {
      const { id } = args
      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article
    },
  },

  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args
      const record = new Article(article)
      await record.save()
      return record
    },
    deleteArticle: async (_, args) => {
      const { id } = args
      await Article.updateOne({
        _id: id,
        deleted: false
      }, {
        deleted: true
      })
      return {
        "code": "success",
        "msg": "Xoa thanh cong"
      }
    },
    updateArticle: async (_, args) => {
      const { id, article } = args
      await Article.updateOne({
        _id: id,
        deleted: false
      }, article)
      const record = await Article.findOne({
        _id: id,
        deleted: false
      })
      return record
    },
  },

  Article: {
    category: async (record, _) => {
      const categoryId = record.categoryId
      const category = await Category.findOne({
        _id: categoryId
      })
      return category
    }
  }
};