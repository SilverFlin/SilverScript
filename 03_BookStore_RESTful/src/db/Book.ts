class Book {
    constructor(
        private title: string,
        private author: string,
        private isbn: string,
        private noPages: number,
        private language: string,
        private pubDate: Date) { }
}
type BookReqBody = {
    title: string,
    author: string,
    isbn: string,
    noPages: number,
    language: string,
    pubDate: Date
}

export { Book, BookReqBody }