import ResponseError from "../errors/FeederDiktiResponseError";
export default class FeederAPIResponse {
    readonly data?: any;
    readonly error?: ResponseError;
    constructor(data: {
        error_code?: string;
        error_desc?: string;
        data?: any;
    });
}
