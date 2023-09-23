import { CustomError } from "@zsh-common/online-library-common";

export class NoSourceError extends CustomError{
 statusCode = 400;
 constructor(public message: string) { 
  super(message);
  Object.setPrototypeOf(this, NoSourceError.prototype);
 }
 serializeErrors() { 
  return [{ message: this.message }]
 }
}