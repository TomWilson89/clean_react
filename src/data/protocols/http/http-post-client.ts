import { HttpResponse } from '.';

export type HttpPostParams = {
  url: string;
  body?: any;
};

export interface HttpPostClient<R = unknown> {
  post(params: HttpPostParams): Promise<HttpResponse<R>>;
}
