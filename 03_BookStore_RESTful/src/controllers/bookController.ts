import { Request, Response } from "express";

const getAllBooks = (req: Request, res: Response) => {
    return res.json({ message: `All books` })
}

const getBookById = (req: Request, res: Response) => {
    return res.json({ message: `Book #${req.params.id} Info.` })
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