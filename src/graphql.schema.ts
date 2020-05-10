
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
    email: string;
    fullname?: string;
}

export class UpdateAdminInput {
    _id: string;
    email: string;
    fullname?: string;
}

export class AdminLoginInput {
    email: string;
    password: string;
}

export class DeleteAdminInput {
    ids?: string[];
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

export class Admin {
    _id?: string;
    email?: string;
    fullname?: string;
}

export abstract class IQuery {
    abstract admins(): Admin[] | Promise<Admin[]>;

    abstract currentAdmin(): Admin | Promise<Admin>;

    abstract permissions(): Permission[] | Promise<Permission[]>;
}

export abstract class IMutation {
    abstract adminLogin(input?: AdminLoginInput): string | Promise<string>;

    abstract createAdmin(input?: CreateAdminInput): Admin | Promise<Admin>;

    abstract updateAdmin(input?: UpdateAdminInput): Admin | Promise<Admin>;

    abstract deleteAdmin(input?: DeleteAdminInput): boolean | Promise<boolean>;

    abstract createPermission(input?: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(input?: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(input?: DeletePermissionInput): boolean | Promise<boolean>;
}

export class Permission {
    _id?: string;
    name?: string;
    description?: string;
}
