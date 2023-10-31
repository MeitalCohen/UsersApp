import {
  ErrorFields,
  CreateErrorFieldsTemplate,
  User,
  ValidationResult,
  Errors,
} from "./types";
import {
  isEmailFormat,
  isPhoneFormat,
  isStrLengthValid,
  isStringEmpty,
  isValidBirthday,
  isValidId,
} from "./util";

export const validateUser = (updatedUser: User): ValidationResult => {
  let isValid: boolean = true;
  let currentFormError: ErrorFields = CreateErrorFieldsTemplate();
  if (!isEmailFormat(updatedUser.email)) {
    currentFormError.email = Errors.InvalidEmail;
    isValid = false;
  }

  if (!isPhoneFormat(updatedUser.phone)) {
    currentFormError.phone = Errors.InvalidPhone;
    isValid = false;
  }

  if (!isValidBirthday(updatedUser.birthday)) {
    currentFormError.birthday = Errors.FutureBirthday;
    isValid = false;
  }

  if (!isStrLengthValid(updatedUser.name)) {
    if (isStringEmpty(updatedUser.name)) {
      currentFormError.name = Errors.NameEmpty;
    } else {
      currentFormError.name = Errors.NameLength;
    }
    isValid = false;
  }

  if (!isValidId(updatedUser.id)) {
    currentFormError.id = Errors.InvalidId;
    isValid = false;
  }

  const validationResult: ValidationResult = {
    errorFields: currentFormError,
    isValid: isValid,
  };

  return validationResult;
};
