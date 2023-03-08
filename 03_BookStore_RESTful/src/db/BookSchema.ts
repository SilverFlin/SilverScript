import { Schema, model } from "mongoose";

interface IBook {
    id: number,
    title: string,
    author: string,
    isbn: string,
    noPages: number,
    language: string,
    pubDate: Date
}

const bookSchema = new Schema<IBook>({
    id: Number,
    title: String,
    author: String,
    isbn: String,
    noPages: Number,
    language: String,
    pubDate: Date
})

const Book = model<IBook>('Book', bookSchema)

export { Book, IBook }