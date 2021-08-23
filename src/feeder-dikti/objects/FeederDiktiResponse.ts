import ResponseError from "../errors/FeederDiktiResponseError";

export default class FeederAPIResponse {
  readonly data?: any;
  readonly error?: ResponseError;

  constructor(data: { error_code?: string; error_desc?: string; data?: any }) {
    const code = Number(data.error_code);

    if (code === 0) {
      this.data = data.data;
    } else {
      this.error = new ResponseError(code, data.error_desc);
    }
  }
}
