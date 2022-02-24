export default class ResponseError extends Error {
    readonly action: string;
    readonly code: number;
    constructor(action: string, code: number, message: string);
}
