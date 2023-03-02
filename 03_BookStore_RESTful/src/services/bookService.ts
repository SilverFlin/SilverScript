import { Book } from "../db/Book"

const books = new Map();

books.set(
    "0",
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
    "1",
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

const getBookById = (id: string) => {
    const book = books.get(id)
    return book;
}

const postBook = () => {
    return
}

const patchBook = () => {
    return
}

const deleteBook = () => {
    return
}

export {
    getAllBooks,
    getBookById,
    postBook,
    patchBook,
    deleteBook
}