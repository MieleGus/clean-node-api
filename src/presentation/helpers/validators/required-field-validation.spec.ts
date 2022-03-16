import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return if validdation succeeds', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
