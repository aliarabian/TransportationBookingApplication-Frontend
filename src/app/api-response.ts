import {ApiError} from "./api-error";

export interface ApiResponse<T> {
  data: T,
  error: boolean,
  errorResponse: ApiError
}
