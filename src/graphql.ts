
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ACCOUNT_TYPE {
    ADMIN = "ADMIN",
    USER = "USER",
    CUSTOMER = "CUSTOMER"
}

export enum PERMISSION {
    STORE = "STORE",
    STAFF = "STAFF"
}

export class CreateAdminInput {
    email?: string;
    fullName?: string;
}

export class DeleteAdminInput {
    ids?: string[];
}

export class ChangePasswordInput {
    old?: string;
    new?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreatePermissionInput {
    name: string;
    description?: string;
}

export class UpdatePermissionInput {
    _id: string;
    name: string;
    description?: string;
}

export class DeletePermissionInput {
    ids?: string[];
}

export class UpdateProfileInput {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class RegisterUserInput {
    token?: string;
    fullname?: string;
    password?: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class UpdateUserInput {
    fullname?: string;
    phone?: string;
    address?: string;
}

export class ChangeUserPasswordInput {
    old?: string;
    new?: string;
}

export class DeleteUserInput {
    ids?: string[];
}

export class ConfirmUserEmailInput {
    email?: string;
}

export class ForgotUserPasswordInput {
    email?: string;
}

export class Admin {
    _id?: string;
    profile?: Profile;
    credential?: Credential;
}

export abstract class IQuery {
    abstract admins(): Admin[] | Promise<Admin[]>;

    abstract currentAdmin(): Admin | Promise<Admin>;

    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract currentUser(): User | Promise<User>;
}

export abstract class IMutation {
    abstract loginAdmin(input?: LoginInput): string | Promise<string>;

    abstract createAdmin(input?: CreateAdminInput): Admin | Promise<Admin>;

    abstract updateAdminProfile(input?: UpdateProfileInput): boolean | Promise<boolean>;

    abstract changeAdminPassword(input?: ChangePasswordInput): boolean | Promise<boolean>;

    abstract deleteAdmin(input?: DeleteAdminInput): boolean | Promise<boolean>;

    abstract createPermission(input?: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(input?: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(input?: DeletePermissionInput): boolean | Promise<boolean>;

    abstract loginUser(input?: LoginUserInput): string | Promise<string>;

    abstract confirmUserEmail(input?: ConfirmUserEmailInput): boolean | Promise<boolean>;

    abstract registerUser(input?: RegisterUserInput): string | Promise<string>;

    abstract forgotUserPassword(input?: ForgotUserPasswordInput): boolean | Promise<boolean>;

    abstract updateUser(input?: UpdateUserInput): User | Promise<User>;

    abstract changeUserPassword(input?: ChangeUserPasswordInput): boolean | Promise<boolean>;

    abstract deleteUser(input?: DeleteUserInput): User | Promise<User>;
}

export class Credential {
    email?: string;
}

export class Permission {
    _id?: string;
    name?: string;
    description?: string;
}

export class Profile {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class User {
    _id?: string;
    email?: string;
    fullname?: string;
    phone?: string;
    address?: string;
    createdAt?: number;
    createdBy?: string;
}
