import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
  avatar: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
}, {
  timestamps: true,
})

export const Category = mongoose.model(
  "Category",
  categorySchema,
  "categories"
)