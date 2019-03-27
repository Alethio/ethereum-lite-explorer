export class LinkedError extends Error {
    constructor(message: string, public cause?: Error) {
        super(message);
        this.name = "LinkedError";
    }
}
