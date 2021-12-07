import { DbAddAccount } from './db-add-account';

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password ', async () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return await new Promise((resolve) => resolve('hashed_password'));
      }
    }
    const encryptorStub = new EncrypterStub();
    const sut = new DbAddAccount(encryptorStub);
    const encryptSpy = jest.spyOn(encryptorStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
