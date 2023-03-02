import { Book, BookReqBody } from "../db/Book"

const books = new Map();
let lastId = 1;

books.set(
    0,
    new Book(
        "Atomic Habits",
        "James Clear",
        "0735211299",
        200,
        "English",
        new Date(18, 10, 16)
    )
)

books.set(
    1,
    new Book(
        "Mistborn 1",
        "0735211299",
        "Brandon Sanderson",
        200,
        "English",
        new Date(13, 11, 9)
    )
)


const getAllBooks = () => {
    const iterator = books.values();
    const allBooks = []
    for (const book of iterator) {
        allBooks.push(book)
    }
    return allBooks
}

const getBookById = (rawId: string | number) => {
    let id = +rawId;
    const book = books.get(id)
    return book;
}

const postBook = (body: BookReqBody): Book | undefined => {
    const book = createBookFromBody(body)
    if (!book) return undefined;
    lastId++;
    books.set(lastId, book)
    return book
}

const patchBook = (rawId: number | string, body: BookReqBody) => {
    let id = +rawId;
    if (!getBookById(id)) return undefined

    const book = createBookFromBody(body);
    books.set(id, book)

    return book
}

const deleteBook = () => {
    return
}

const createBookFromBody = (body: BookReqBody) => {
    const date = new Date(body.pubDate);
    if (date.toString() === "Invalid Date") {
        return undefined
    }

    const book = new Book(body.title, body.author, body.isbn, +body.noPages, body.language, date)
    return book
}

export {
    getAllBooks,
    getBookById,
    postBook,
    patchBook,
    deleteBook
}