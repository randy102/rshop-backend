
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

export class CreateUserInput {
    email?: string;
    fullName?: string;
    isAdmin?: boolean;
}

export class DeleteUserInput {
    ids?: string[];
}

export class UpdateAdminInput {
    _id?: string;
    isAdmin?: boolean;
}

export class Credential {
    email?: string;
}

export class Permission {
    _id?: string;
    name?: string;
    description?: string;
}

export abstract class IQuery {
    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract currentUser(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createPermission(input?: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(input?: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(input?: DeletePermissionInput): boolean | Promise<boolean>;

    abstract updateUserProfile(input?: UpdateProfileInput): Profile | Promise<Profile>;

    abstract loginUser(input?: LoginInput): string | Promise<string>;

    abstract changeUserPassword(input?: ChangePasswordInput): string | Promise<string>;

    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateAdmin(input?: UpdateAdminInput): User | Promise<User>;

    abstract deleteUser(input?: DeleteUserInput): boolean | Promise<boolean>;
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
    isAdmin?: boolean;
    profile?: Profile;
    credential?: Credential;
}
