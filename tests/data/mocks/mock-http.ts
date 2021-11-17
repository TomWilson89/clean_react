import faker from 'faker';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  method: faker.random.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;

  method?: string;

  body?: any;

  headers?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.body = data.body;
    this.method = data.method;
    this.headers = data.headers;
    return Promise.resolve(this.response);
  }
}
