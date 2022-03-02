import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}
const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Gusta'
        }
      };
      return await new Promise((resolve) => resolve(httpResponse));
    }
  }

  return new ControllerStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);
  return { sut, controllerStub };
};

describe('LogControllerDecorator', () => {
  it('Should call controller handle', async () => {
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        name: 'name',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    };
    const { sut, controllerStub } = makeSut();
    await sut.handle(httpRequest);
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
