export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type HttpRequest = {
  url: string;
  headers?: any;
  method: HttpMethod;
  body?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export enum HttpStatusCode {
  noContent = 204,
  unauthorized = 401,
  badRequest = 400,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
  ok = 200,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};
