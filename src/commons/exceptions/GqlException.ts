import { GraphQLError } from "graphql";

export class NotFoundError extends GraphQLError{
  constructor(sub: string){
    super(`Not found: ${sub}`)
  }
}

export class DuplicateError extends GraphQLError{
  constructor(sub: string){
    super(`Duplicated: ${sub}`)
  }
}


export class FieldError extends GraphQLError{
  constructor(sub: string){
    super(`Incorrect: ${sub}`)
  }
}

export class NoPermissionError extends GraphQLError{
  constructor(){
    super(`No Permission`)
  }
}

export class LoginError extends GraphQLError{
  constructor(){
    super(`Email or Password incorrect`)
  }
}

export class AuthError extends GraphQLError{
  constructor(){
    super(`Authentication failed`)
  }
}

export class CredentialError extends GraphQLError{
  constructor(){
    super(`Account's credential has been changed`)
  }
}

export class SendMailError extends GraphQLError{
  constructor(){
    super(`Mail didn't send successfully. Please try again!`)
  }
}