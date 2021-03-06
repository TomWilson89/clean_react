import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        data: data.body,
        headers: data.headers,
        method: data.method,
      });
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
