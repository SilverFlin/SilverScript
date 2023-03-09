import { Db, MongoClient } from "mongodb";
import mongoose from "mongoose";
import { BookReqBody } from "../db/Book";
import { Book } from "../db/BookSchema";
import { deleteBook, getAllBooks, getBookById, postBook } from "./bookService";
// import dotenv from "dotenv";
// dotenv.config()


const book1 = new Book({
    id: 0,
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "0735211299",
    noPages: 200,
    language: "English",
    pubDate: new Date(18, 10, 16)
})

const book2 = new Book({
    id: 1,
    title: "Mistborn 1",
    author: "Brandon Sanderson",
    isbn: "0735211299",
    noPages: 200,
    language: "English",
    pubDate: new Date(13, 11, 9)
})

const book3 = new Book({
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    isbn: "1312312321",
    noPages: 400,
    language: "English",
    pubDate: new Date()
})

const body1: BookReqBody = {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "1312312321",
    noPages: 400,
    language: "English",
    pubDate: new Date()
}


describe('bookService functions', () => {
    let connection: MongoClient;
    let db: Db;


    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI as string)
            .then(() => console.log('Database connection established'))
            .catch(console.error)
    })


    afterAll(async () => {
        mongoose.disconnect()
    });

})

// test('bookService getAllBooks', () => {
//     expect(getAllBooks()).toEqual([book1, book2]);
// });

// test('bookService getBookById', () => {
//     expect(getBookById(1)).toEqual(book2);
// });

// test('bookService postBook', () => {
//     expect(postBook(body1)).toEqual(book3);
// });

// test('bookService deleteBook', () => {
//     expect(deleteBook(0)).toEqual(book1);
// });




