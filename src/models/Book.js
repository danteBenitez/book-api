import {  Schema, model } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genreId: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        autopopulate: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    coverImagePath: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: false
    },
    language: {
        type: String,
        required: false
    },
    isbn: {
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