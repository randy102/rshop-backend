
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

export class SignContractInput {
    idPlan?: string;
}

export class CreateContractInput {
    idPlan?: string;
    idUser?: string;
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
    description?: string;
}

export class UpdateDraftPlanInput {
    _id?: string;
    name?: string;
    duration?: number;
    price?: number;
    description?: string;
}

export class UpdateProfileInput {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class CreateShopInput {
    name?: string;
    domain?: string;
    idTemplate?: string;
    brandImg?: string;
}

export class UpdateShopInput {
    _id?: string;
    name?: string;
    domain?: string;
    idTemplate?: string;
    brandImg?: string;
    isActive?: boolean;
}

export class CreateTemplateInput {
    name?: string;
    code?: string;
    isActive?: boolean;
    demoImg?: string;
}

export class UpdateTemplateInput {
    _id?: string;
    name?: string;
    isActive?: boolean;
    demoImg?: string;
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

export class Contract {
    _id?: string;
    user?: User;
    plan?: Plan;
    expDate?: number;
    signDate?: number;
}

export abstract class IQuery {
    abstract contracts(): Contract[] | Promise<Contract[]>;

    abstract activeContract(): Contract | Promise<Contract>;

    abstract userContracts(): Contract[] | Promise<Contract[]>;

    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract plans(): Plan[] | Promise<Plan[]>;

    abstract publishedPlans(): Plan[] | Promise<Plan[]>;

    abstract shops(): Shop[] | Promise<Shop[]>;

    abstract userShop(): Shop[] | Promise<Shop[]>;

    abstract shopByDomain(domain?: string): Shop | Promise<Shop>;

    abstract templates(): Template[] | Promise<Template[]>;

    abstract activeTemplates(): Template[] | Promise<Template[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract currentUser(): User | Promise<User>;
}

export abstract class IMutation {
    abstract signContract(input?: SignContractInput): Contract | Promise<Contract>;

    abstract createContract(input?: CreateContractInput): Contract | Promise<Contract>;

    abstract createPermission(input?: CreatePermissionInput): Permission | Promise<Permission>;

    abstract updatePermission(input?: UpdatePermissionInput): Permission | Promise<Permission>;

    abstract deletePermission(input?: DeletePermissionInput): boolean | Promise<boolean>;

    abstract createDraftPlan(input?: CreateDraftPlanInput): Plan | Promise<Plan>;

    abstract updateDraftPlan(input?: UpdateDraftPlanInput): Plan | Promise<Plan>;

    abstract deleteDraftPlan(ids?: string[]): boolean | Promise<boolean>;

    abstract publishPlan(id?: string): Plan | Promise<Plan>;

    abstract suppressPlan(id?: string): Plan | Promise<Plan>;

    abstract updateUserProfile(input?: UpdateProfileInput): Profile | Promise<Profile>;

    abstract createShop(input?: CreateShopInput): Shop | Promise<Shop>;

    abstract updateShop(input?: UpdateShopInput): Shop | Promise<Shop>;

    abstract createTemplate(input?: CreateTemplateInput): Template | Promise<Template>;

    abstract updateTemplate(input?: UpdateTemplateInput): Template | Promise<Template>;

    abstract loginUser(input?: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract requestEmailConfirm(input?: RequestEmailConfirmInput): string | Promise<string>;

    abstract registerUser(input?: RegisterUserInput): User | Promise<User>;

    abstract changeUserPassword(input?: ChangePasswordInput): string | Promise<string>;

    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateAdmin(input?: UpdateAdminInput): User | Promise<User>;

    abstract deleteUser(input?: DeleteUserInput): boolean | Promise<boolean>;
}

export class Permission {
    _id?: string;
    name?: string;
    description?: string;
}

export class Plan {
    _id?: string;
    name?: string;
    duration?: number;
    price?: number;
    state?: PlanState;
    description?: string;
    createdAt?: number;
}

export class Profile {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class Role {
    _id?: string;
    shop?: Shop;
    permission?: Permission[];
    name?: string;
    isMaster?: boolean;
    description?: string;
}

export class Shop {
    _id?: string;
    name?: string;
    domain?: string;
    isActive?: boolean;
    template?: Template;
}

export class Template {
    _id?: string;
    name?: string;
    code?: string;
    isActive?: boolean;
    demoImg?: string;
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
