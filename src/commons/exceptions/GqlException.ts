import { GraphQLError } from "graphql";

export class NotFoundError extends GraphQLError{
  constructor(sub: string){
    super(`${sub} không tồn tại`)
  }
}

export class DuplicateError extends GraphQLError{
  constructor(sub: string){
    super(`${sub} đã tồn tại`)
  }
}


export class FieldError extends GraphQLError{
  constructor(sub: string, msg?: string){
    super(`${sub} không đúng. ${msg || ''}`)
  }
}

export class NoPermissionError extends GraphQLError{
  constructor(){
    super(`Không có quyền truy cập`)
  }
}

export class LoginError extends GraphQLError{
  constructor(){
    super(`Email hoặc mật khẩu không đúng`)
  }
}

export class AuthError extends GraphQLError{
  constructor(){
    super(`Lỗi xác thực tài khoản. Vui lòng đăng nhập lại!`)
  }
}

export class CredentialError extends GraphQLError{
  constructor(){
    super(`Tài khoản đã bị thay đổi. Vui lòng đăng nhập lại!`)
  }
}

export class SendMailError extends GraphQLError{
  constructor(){
    super(`Gửi thư thất bại. Vui lòng thử lại sau!`)
  }
}

export class SelfUpdateRoleError extends GraphQLError{
  constructor(){
    super(`Không thể thay đổi quyền của bạn!`)
  }
}