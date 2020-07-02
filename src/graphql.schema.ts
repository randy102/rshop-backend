
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum PlanState {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    SUPPRESSED = "SUPPRESSED"
}

export enum ACCOUNT_TYPE {
    ADMIN = "ADMIN",
    USER = "USER",
    CUSTOMER = "CUSTOMER"
}

export enum PERMISSION {
    STORE = "STORE",
    STAFF = "STAFF"
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

export class CreateDraftPlanInput {
    name?: string;
    duration?: number;
    price?: number;
    numShop?: number;
    description?: string;
}

export class UpdateDraftPlanInput {
    _id?: string;
    name?: string;
    duration?: number;
    price?: number;
    numShop?: number;
    description?: string;
}

export class UpdateProfileInput {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class CreateUserInput {
    email?: string;
    fullName?: string;
    isAdmin?: boolean;
}

export class ChangePasswordInput {
    old?: string;
    new?: string;
}

export class DeleteUserInput {
    ids?: string[];
}

export class UpdateAdminInput {
    _id?: string;
    isAdmin?: boolean;
}

export class RequestEmailConfirmInput {
    email?: string;
}

export class RegisterUserInput {
    token?: string;
    fullName?: string;
    password?: string;
}

export class Permission {
    _id?: string;
    name?: string;
    description?: string;
}

export abstract class IQuery {
    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract plans(): Plan[] | Promise<Plan[]>;

    abstract publishedPlans(): Plan[] | Promise<Plan[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract currentUser(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createPermission(input?: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(input?: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(input?: DeletePermissionInput): boolean | Promise<boolean>;

    abstract createDraftPlan(input?: CreateDraftPlanInput): Plan | Promise<Plan>;

    abstract updateDraftPlan(input?: UpdateDraftPlanInput): Plan | Promise<Plan>;

    abstract deleteDraftPlan(ids?: string[]): boolean | Promise<boolean>;

    abstract publishPlan(id?: string): Plan | Promise<Plan>;

    abstract suppressPlan(id?: string): Plan | Promise<Plan>;

    abstract updateUserProfile(input?: UpdateProfileInput): Profile | Promise<Profile>;

    abstract loginUser(input?: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract requestEmailConfirm(input?: RequestEmailConfirmInput): string | Promise<string>;

    abstract registerUser(input?: RegisterUserInput): User | Promise<User>;

    abstract changeUserPassword(input?: ChangePasswordInput): string | Promise<string>;

    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateAdmin(input?: UpdateAdminInput): User | Promise<User>;

    abstract deleteUser(input?: DeleteUserInput): boolean | Promise<boolean>;
}

export class Plan {
    _id?: string;
    name?: string;
    duration?: number;
    price?: number;
    numShop?: number;
    state?: PlanState;
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
    isAdmin?: boolean;
    profile?: Profile;
    credential?: Credential;
}

export class Credential {
    email?: string;
}

export class LoginResponse {
    token?: string;
    user?: User;
}
