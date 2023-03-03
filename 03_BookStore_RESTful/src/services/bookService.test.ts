import { Book, BookReqBody } from "../db/Book";
import { deleteBook, getAllBooks, getBookById, postBook } from "./bookService";



const book1 = new Book(
    0,
    "Atomic Habits",
    "James Clear",
    "0735211299",
    200,
    "English",
    new Date(18, 10, 16)
)

const book2 = new Book(
    1,
    "Mistborn 1",
    "Brandon Sanderson",
    "0735211299",
    200,
    "English",
    new Date(13, 11, 9)
)

const body1: BookReqBody = {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "1312312321",
    noPages: 400,
    language: "English",
    pubDate: new Date()
}

const book3 = new Book(
    2,
    "Dune",
    "Frank Herbert",
    "1312312321",
    400,
    "English",
    new Date()
)

test('bookService getAllBooks', () => {
    expect(getAllBooks()).toEqual([book1, book2]);
});

test('bookService getBookById', () => {
    expect(getBookById(1)).toEqual(book2);
});

test('bookService postBook', () => {
    expect(postBook(body1)).toEqual(book3);
});

test('bookService deleteBook', () => {
    expect(deleteBook(0)).toEqual(book1);
});




