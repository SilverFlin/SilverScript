import { BookReqBody } from "../db/Book";
import { Book, IBook } from "../db/BookSchema";

let lastId = 1;

const getAllBooks = async () => {
    const allBooks = await Book.find({});
    return allBooks;
};

const getBookById = async (rawId: string | number) => {
    let id = +rawId;
    const book = await Book.findOne({ id });
    return book;
};

const postBook = async (body: BookReqBody) => {
    lastId++;
    const book = createBookFromBody(body);
    if (!book) return undefined;
    await book.save();
    return book;
};

const patchBook = async (rawId: number | string, body: BookReqBody) => {
    let id = +rawId;
    if (!getBookById(id)) return undefined;

    const book = createBookFromBody(body);
    Book.findOneAndUpdate({ id }, book)
        .then(() => {
            return book;
        })
        .catch(() => {
            return undefined;
        });
};

const deleteBook = async (rawId: number | string) => {
    const id = +rawId;
    const book = await getBookById(id);
    if (!book) return undefined;
    return await Book.findOneAndDelete({ id })
};

const createBookFromBody = (body: BookReqBody) => {
    const date = new Date(body.pubDate);
    if (date.toString() === "Invalid Date") return undefined;

    const book = new Book({
        id: lastId,
        title: body.title,
        author: body.author,
        isbn: body.isbn,
        noPages: +body.noPages,
        language: body.language,
        date: date,
    });
    return book;
};

export { getAllBooks, getBookById, postBook, patchBook, deleteBook };
