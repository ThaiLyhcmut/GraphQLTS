import { generateRandomString } from "../helpers/generate_helper"
import { Account } from "../models/account.model"
import md5 from "md5"
export const resolversAccount = {
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
    }
  }
}