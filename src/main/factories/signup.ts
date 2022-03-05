import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { DbAddAccount } from '../../data/usecases/add-accont/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import { LogErrorRepository } from '../../data/protocols/log-error-repository';

class LogErrorRepositoryStub implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    return await new Promise((resolve) => resolve());
  }
}
const logError = new LogErrorRepositoryStub();
export const makeSignUpController = (): Controller => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  return new LogControllerDecorator(signUpController, logError);
};
