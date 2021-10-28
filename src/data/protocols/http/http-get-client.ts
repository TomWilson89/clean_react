import { HttpResponse } from './http-response';

export type HttpGetParams = {
  url: string;
  headers?: any;
};

export interface HttpGetClient<R = unknown> {
  get: (params: HttpGetParams) => Promise<HttpResponse<R>>;
}
