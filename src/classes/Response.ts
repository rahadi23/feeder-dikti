import ResponseError from "./ResponseError";

export default class Response {
  readonly data?: any;
  readonly error?: ResponseError;

  constructor(
    data: { error_code?: string; error_desc?: string; data?: any },
    action: string
  ) {
    const code = Number(data.error_code);

    if (code === 0) {
      this.data = data.data;
    } else {
      this.error = new ResponseError(action, code, data.error_desc);
    }
  }
}
