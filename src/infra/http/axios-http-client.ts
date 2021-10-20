import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const res = await axios.post(params.url, params.body);

    return {
      statusCode: res.status,
      body: res.data,
    };
  }
}
