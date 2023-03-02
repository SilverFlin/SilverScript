class Book {
    constructor(
        private title: string,
        private author: string,
        private isbn: string,
        private noPages: number,
        private language: string,
        private pubDate: Date) {
    }
}

export { Book }