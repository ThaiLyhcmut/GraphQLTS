import { Query } from "mongoose"
import { generateRandomString } from "../helpers/generate_helper"
import { Account } from "../models/account.model"
import md5 from "md5"
export const resolversAccount = {
  Query: {
    getAccount: async(_, args) => {
      const { token } = args
      const exitsAccount = await Account.findOne({
        token: token
      })
      if(!exitsAccount){
        return {
          code: "error",
          msg: "Tài khoản không tồn tại"
        }
      }
      if (exitsAccount.deleted) {
        return {
          code: "error",
          msg: "Tài khoản đã bị khóa"
        }
      }
      return {
        code: "success",
        msg: "Lấy tài khoảng thành công",
        id: exitsAccount.id,
        token: exitsAccount.token,
        fullName: exitsAccount.fullName,
        email: exitsAccount.email
      }
    }
  },
  Mutation: {
    registerAccount: async (_, args) => {
      const { account } = args
      const exitsAccount = await Account.findOne({
        email: account.email,
      })
      if (exitsAccount){
        return {
          code: "error",
          msg: "email đã tồn tại trong hệ thống! hoặc tài khoản đã bị khóa"
        }
      }
      const dataAccount = {
        fullName: account.fullName,
        email: account.email,
        password: md5(account.password),
        token: generateRandomString(30)
      }
      const newAccount = new Account(dataAccount)

      await newAccount.save()

      return {
        id: newAccount.id,
        ...dataAccount,
        code: "success",
        msg: "Thanh cong"
      }
    },
    loginAccount: async (_, args) => {
      const { account } = args
      const exitsAccount = await Account.findOne({
        email: account.email
      })
      if (!exitsAccount) {
        return {
          code: "error",
          msg: "Tài khoản không tồn tại"
        }
      }
      if (exitsAccount.deleted) {
        return {
          code: "error",
          msg: "Tài khoản đã bị khóa"
        }
      }
      if (exitsAccount.password != md5(account.password)) {
        return {
          code: "error",
          msg: "Mật khẩu không chính xác"
        }
      }
      return {
        code: "success",
        msg: "Lấy tài khoảng thành công",
        id: exitsAccount.id,
        token: exitsAccount.token,
        fullName: exitsAccount.fullName,
        email: exitsAccount.email
      }
    }
  }
}