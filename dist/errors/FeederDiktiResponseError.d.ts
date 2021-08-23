export default class ResponseError extends Error {
    readonly code: number;
    constructor(code: number, message: string);
}
