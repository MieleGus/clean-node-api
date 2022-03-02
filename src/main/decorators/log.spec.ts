import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

describe('LogControllerDecorator', () => {
  it('Should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'Rodrigo'
          }
        };
        return await new Promise((resolve) => resolve(httpResponse));
      }
    }

    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        name: 'name',
        password: 'pass',
        passwordConfirmation: 'pass'
      }
    };
    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
