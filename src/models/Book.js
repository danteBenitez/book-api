import {  Schema, model } from 'mongoose';

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
        ref: 'Author'
    }
}, {
    timestamps: true,
    versionKey: false
});

export const BookModel = model('Book', bookSchema);