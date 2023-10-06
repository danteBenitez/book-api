import { Schema, model } from "mongoose";
import autopopulate from 'mongoose-autopopulate';

const authorSchema = new Schema(
  {
    name: {
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
    books: [{
      type: Schema.Types.ObjectId,
      ref: 'Book',
      autopopulate: {
        maxDepth: 1
      }
    }]  
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

authorSchema.plugin(autopopulate);

export const AuthorModel = model("Author", authorSchema);
