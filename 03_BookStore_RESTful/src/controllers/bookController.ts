import { Request, Response } from "express";
import * as bookService from "../services/bookService"

const getAllBooks = (req: Request, res: Response) => {
    // TODO add pagination
    const allBooks = bookService.getAllBooks()
    return res.json(allBooks)
}

const getBookById = (req: Request, res: Response) => {
    let id = req.params.id;
    const book = bookService.getBookById(id)
    if (book) {
        return res.json(book)
    } else {
        return res.status(400).json({ error: "Book not found" })
    }
}

const postBook = (req: Request, res: Response) => {
    return res.json({ message: `Post Book` })
}

const patchBook = (req: Request, res: Response) => {
    return res.json({ message: `Patch Book #${req.params.id}` })
}



const deleteBook = (req: Request, res: Response) => {
    return res.json({ message: `Delete Book #${req.params.id}.` })
}

export {
    getAllBooks,
    getBookById,
    postBook,
    patchBook,
    deleteBook
}