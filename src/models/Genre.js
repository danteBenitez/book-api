import {  Schema, model } from 'mongoose';

const genreSchema = new Schema({
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const GenreModel = model('Genre', genreSchema);