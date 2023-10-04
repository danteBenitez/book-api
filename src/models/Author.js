import { Schema, model } from "mongoose";

const authorSchema = new Schema(
  {
    names: {
        type: String, 
        required: true 
    },
    surname: { 
        type: String, 
        requiered: true 
    },
    bio: { 
        type: String, 
        required: true 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const AuthorModel = model("Author", authorSchema);
