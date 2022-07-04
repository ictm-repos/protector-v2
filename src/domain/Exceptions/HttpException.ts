export class HttpException extends Error {
    private data: null
    private success: false
    constructor(
        public error: string,
        public status: number
    ) {
        super(error);
    }
}