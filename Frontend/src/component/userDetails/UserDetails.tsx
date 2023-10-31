import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DateTimePicker from "../helperComponents/DateTimePicker";
import RadioButtons from "../helperComponents/buttons/RadioButtons";
import {
  ActionName,
  ErrorFields,
  CreateErrorFieldsTemplate,
  User,
  ValidationResult,
  Gender,
  UsersKeys,
  Errors,
  UsersTitles,
} from "../../types/types";
import { Dayjs } from "dayjs";
import { addUser, updateUser } from "../../api/usersApi";
import TextFieldComponent from "../helperComponents/TextFieldComponent";
import { containsOnlyLetters, containsOnlyNumbers } from "../../types/util";
import { validateUser } from "../../types/userUtil";
import { updateFormErrors } from "../../types/userDetailsUtil";

type ParamsType = {
  user: User;
  shouldOpenModal: boolean;
  setOpenModal: (shouldOpenModal: boolean) => void;
  updateTableFunc: () => Promise<void>;
};

const UserDetails = ({
  user,
  shouldOpenModal = false,
  setOpenModal,
  updateTableFunc,
}: ParamsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const [updatedUser, setUpdatedUser] = useState<User>(user);
  const isNewUserRef = useRef<boolean>(false);
  const [formErrors, setFormErrors] = useState<ErrorFields>(
    CreateErrorFieldsTemplate
  );

  useEffect(() => {
    setOpen(shouldOpenModal);
  }, [shouldOpenModal]);

  useEffect(() => {
    if (user.id === 0) {
      isNewUserRef.current = true;
    }
  }, [user.id]);

  const handleClose = (): void => {
    setFormErrors(CreateErrorFieldsTemplate);
    setOpenModal(false);
    setOpen(false);
  };

  const updateUserState = (key: keyof User, value: number | string | Dayjs) => {
    setUpdatedUser((currentUpdatedUser: User) => {
      const newUpdatedUser: User = {
        ...currentUpdatedUser,
        [key]: value,
      };
      return newUpdatedUser;
    });
  };

  const handleUpdate = async (): Promise<void> => {
    const validationResult: ValidationResult = validateUser(updatedUser);
    if (!validationResult.isValid) {
      setFormErrors((currentFormErrors): ErrorFields => {
        const newFormErrors = { ...currentFormErrors };
        newFormErrors.email = validationResult.errorFields.email;
        newFormErrors.phone = validationResult.errorFields.phone;
        newFormErrors.birthday = validationResult.errorFields.birthday;
        newFormErrors.id = validationResult.errorFields.id;
        newFormErrors.name = validationResult.errorFields.name;
        return newFormErrors;
      });

      return;
    }

    if (!isNewUserRef.current) {
      await updateUser(updatedUser);
    } else {
      await addUser(updatedUser);
    }
    handleClose();
    updateTableFunc();
  };

  const onDateTimePickerChange = (birthdayDate: Dayjs): void => {
    updateUserState(UsersKeys.Birthday, birthdayDate);

    setFormErrors((currentFormErrors): ErrorFields => {
      return updateFormErrors(currentFormErrors, UsersKeys.Birthday);
    });
  };

  const handleChangeId = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!isNewUserRef.current) {
      return;
    }

    if (!containsOnlyNumbers(e.target.value)) {
      setFormErrors((currentFormErrors): ErrorFields => {
        return updateFormErrors(
          currentFormErrors,
          UsersKeys.ID,
          Errors.DigitOnly
        );
      });
      return;
    }

    setFormErrors((currentFormErrors): ErrorFields => {
      return updateFormErrors(currentFormErrors, UsersKeys.ID);
    });

    updateUserState(UsersKeys.ID, Number(e.target.value));
  };

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!containsOnlyLetters(e.target.value)) {
      setFormErrors((currentFormErrors): ErrorFields => {
        return updateFormErrors(
          currentFormErrors,
          UsersKeys.Name,
          Errors.LettersOnly
        );
      });
      return;
    }

    setFormErrors((currentFormErrors): ErrorFields => {
      return updateFormErrors(currentFormErrors, UsersKeys.Name);
    });

    updateUserState(UsersKeys.Name, e.target.value);
  };

  const handleChangeEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormErrors((currentFormErrors): ErrorFields => {
      return updateFormErrors(currentFormErrors, UsersKeys.Email);
    });

    updateUserState(UsersKeys.Email, e.target.value);
  };

  const handleChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormErrors((currentFormErrors): ErrorFields => {
      return updateFormErrors(currentFormErrors, UsersKeys.Phone);
    });

    updateUserState(UsersKeys.Phone, e.target.value);
  };

  const handleChangeRadioButtons = (gender: Gender): void => {
    if (gender === updatedUser.gender) {
      return;
    }

    updateUserState(UsersKeys.Gender, gender);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{UsersTitles.UserDetails}</DialogTitle>
        <DialogContent>
          <TextFieldComponent
            id={UsersKeys.ID}
            label="Id"
            type="string"
            value={updatedUser?.id}
            isReadonly={!isNewUserRef.current}
            error={formErrors?.id !== ""}
            onChange={(e) => handleChangeId(e)}
            helperText={formErrors?.id}
          ></TextFieldComponent>
          <TextFieldComponent
            id={UsersKeys.Name}
            label="Name"
            type="text"
            value={updatedUser.name}
            error={formErrors?.name !== ""}
            onChange={(e) => handleChangeName(e)}
            helperText={formErrors?.name}
          ></TextFieldComponent>
          <TextFieldComponent
            id={UsersKeys.Email}
            label="Email Address"
            type="email"
            value={updatedUser.email}
            error={formErrors?.email !== ""}
            onChange={(e) => handleChangeEmail(e)}
            helperText={formErrors?.email}
          ></TextFieldComponent>
          <TextFieldComponent
            id={UsersKeys.Phone}
            label="Phone Number"
            type="text"
            value={updatedUser?.phone}
            error={formErrors?.phone !== ""}
            helperText={formErrors?.phone}
            onChange={(e) => handleChangePhoneNumber(e)}
          ></TextFieldComponent>
          <DateTimePicker
            currentBirthday={updatedUser.birthday}
            onChange={onDateTimePickerChange}
            error={formErrors?.birthday}
          />
          <RadioButtons
            currentGender={updatedUser.gender}
            handleChangeGender={handleChangeRadioButtons}
          ></RadioButtons>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>{ActionName.Cancel}</Button>
          <Button onClick={handleUpdate}>
            {isNewUserRef.current ? ActionName.Create : ActionName.Update}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDetails;
