export interface IBaseResponse {
}

export interface IBaseFailedResponse extends IBaseResponse {
  status: number;
  error: Error;
}
