import {  Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    },
    publicationYear: {
        type: Number,
        required: true
    },
    coverImagePath: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        autopopulate: {
            maxDepth: 1
        }
    }
}, {
    timestamps: true,
    versionKey: false
});

bookSchema.plugin(autopopulate);

export const BookModel = model('Book', bookSchema);