import { RemoteLoadSurveyList } from '@/data/usecases';
import faker from 'faker';
import { HttpGetClientSpy } from '../mocks';

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
