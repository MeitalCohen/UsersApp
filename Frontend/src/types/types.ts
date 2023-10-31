import dayjs, { Dayjs } from "dayjs";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export enum ActionName {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  Refresh = "Refresh",
  Cancel = "Cancel",
}

export enum UsersTitles {
  Number = "Number",
  ID = "ID",
  Name = "Name",
  Email = "Email",
  Phone = "Phone",
  Gender = "Gender",
  Birthday = "Birthday",
  Action = "Action",
  UserDetails = "User Details",
}

export enum UsersKeys {
  ID = "id",
  Name = "name",
  Email = "email",
  Phone = "phone",
  Gender = "gender",
  Birthday = "birthday",
}

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: Dayjs;
  gender: Gender;
};

export type ErrorFields = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
};

export type ValidationResult = {
  isValid: boolean;
  errorFields: ErrorFields;
};

export const CreateErrorFieldsTemplate = (): ErrorFields => ({
  id: "",
  name: "",
  email: "",
  phone: "",
  birthday: "",
});

export const userTemplate = () => ({
  id: 0,
  name: "",
  email: "",
  phone: "",
  birthday: dayjs("1.1.2000"),
  gender: Gender.Female,
});

export enum Errors {
  InvalidId = "Invalid Id",
  NameEmpty = "Name cannot be empty",
  NameLength = "Name must be between 2-50 characters",
  FutureBirthday = "Birthday cannot be later than today",
  InvalidPhone = "Invalid phone number",
  InvalidEmail = "Invalid Email format",
  DigitOnly = "Only digits are allowed",
  LettersOnly = "Only letters are allowed",
}
