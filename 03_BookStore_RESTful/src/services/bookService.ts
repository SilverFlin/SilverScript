import { BookReqBody } from "../db/Book";
import { Book, IBook } from "../db/BookSchema";

let lastId = 1;

// TODO Delete me
resetTestDatabase();


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


function resetTestDatabase() {
    const fakeBook = new Book({
        id: 0,
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "0735211299",
        noPages: 200,
        language: "English",
        pubDate: new Date(18, 10, 16),
    });

    const fakeBook1 = new Book({
        id: 1,
        title: "Mistborn 1",
        author: "Brandon Sanderson",
        isbn: "0735211299",
        noPages: 200,
        language: "English",
        pubDate: new Date(13, 11, 9),
    });

    Book.deleteMany({})
        .then(() => console.log('Database cleared'))
        .catch((e) => console.log(`Error at deleting the database: ${e}`))

    Book.insertMany([fakeBook, fakeBook1])
        .then(() => {
            console.log('Fake books inserted')
        })
        .catch((e) => console.log(`Error at inserting the fake books: ${e}`))
}