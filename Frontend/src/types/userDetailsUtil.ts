import { ErrorFields } from "./types";

export function updateFormErrors(
    currentFormErrors: ErrorFields,
    key: keyof ErrorFields,
    errorMessage: string = ""
  ): ErrorFields {
    const newFormErrors: ErrorFields = { ...currentFormErrors };
    newFormErrors[key] = errorMessage;
    return newFormErrors;
  };