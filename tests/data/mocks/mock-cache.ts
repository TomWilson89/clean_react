import faker from 'faker';
import { GetStorage } from '@/data/protocols/cache';

export class GetStorageSpy implements GetStorage {
  public key: string;

  public value: any = faker.random.objectElement();

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
