import { Request, Response } from "express";
import { BookReqBody } from "../db/Book";
import * as bookService from "../services/bookService"

const getAllBooks = (req: Request, res: Response) => {
    // TODO add pagination
    const allBooks = bookService.getAllBooks()
    return res.json(allBooks)
}

const getBookById = async (req: Request, res: Response) => {
    let id = req.params.id;
    const book = await bookService.getBookById(id)
    if (book) {
        return res.json(book)
    } else {
        return res.status(404).json({
            status: "FAILED", data: {
                error: "The book was not found by the giving id"
            }
        })
    }
}

const postBook = async (req: Request, res: Response) => {
    const book = await bookService.postBook(req.body as unknown as BookReqBody);
    if (!book) {
        return res.status(400).json({
            status: "FAILED", data: {
                error: "One of the following keys is missing or is empty in the request body: 'title', 'author', 'isbn', 'noPages', 'language', or 'pubDate'"
            }
        })
    }

    return res.json(book)
}

const patchBook = (req: Request, res: Response) => {
    const id = req.params.id
    if (!bookService.getBookById(id)) {
        return res.status(404).json({
            status: "FAILED", data: {
                error: "The book was not found by the giving id"
            }
        })
    }
    const book = bookService.patchBook(id, req.body as unknown as BookReqBody)
    if (!book) {
        return res.status(400).json({
            status: "FAILED", data: {
                error: "One of the following keys is missing or is empty in the request body: 'title', 'author', 'isbn', 'noPages', 'language', or 'pubDate'"
            }
        })
    }

    return res.json(book)
}



const deleteBook = (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedBook = bookService.deleteBook(id);
    if (!deletedBook) {
        return res.status(404).json({
            status: "FAILED", data: {
                error: "The book was not found by the giving id"
            }
        })
    }

    return res.json(deletedBook)
}

export {
    getAllBooks,
    getBookById,
    postBook,
    patchBook,
    deleteBook
}