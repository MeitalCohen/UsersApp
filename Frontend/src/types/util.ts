import dayjs, { Dayjs } from "dayjs";

export const isEmailFormat = (str: string): boolean =>{
    const email: string = str.trim();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  export const isPhoneFormat = (str: string): boolean =>{
    const phone: string = str.trim();
    const phoneRegex =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  }
  export const containsOnlyNumbers = (str: string): boolean =>{
    const number: string = str.trim();
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(number);
  }

  export const containsOnlyLetters = (str: string): boolean =>{
    const lettersRegex = /^[a-zA-Z\s]*$/; 
    return lettersRegex.test(str);
  }

  export const isValidBirthday = (birthday: Dayjs): boolean =>{
    const today = dayjs();
    return today.isAfter(birthday, 'day');
  }

  export const isStringEmpty = (str: string): boolean =>{
    const strVal = str.trim();
    return strVal === '';
  } 

  export const isStrLengthValid = (str: string): boolean =>{
    const strVal = str.trim();
    return strVal.length > 2 && strVal.length < 50
  }
  export const isValidId = (num: number): boolean =>{
    return num > 1;
  }