import ResponseError from "./ResponseError";
export default class Response {
    readonly data?: any;
    readonly error?: ResponseError;
    constructor(data: {
        error_code?: string;
        error_desc?: string;
        data?: any;
    }, action: string);
}
