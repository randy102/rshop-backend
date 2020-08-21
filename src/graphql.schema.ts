
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

export enum TransferType {
    IMPORT = "IMPORT",
    EXPORT = "EXPORT",
    TRANSFER = "TRANSFER",
    SELL = "SELL"
}

export class CreateBrandInput {
    name?: string;
    intro?: string;
    img?: string;
}

export class UpdateBrandInput {
    _id?: string;
    name?: string;
    intro?: string;
    img?: string;
}

export class CreateCategoryInput {
    idParent?: string;
    name?: string;
}

export class UpdateCategoryInput {
    _id?: string;
    name?: string;
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

export class CreateProductInput {
    isActive?: boolean;
    name?: string;
    description?: string;
    idCategory?: string;
    idBrand?: string;
}

export class UpdateProductInput {
    _id?: string;
    isActive?: boolean;
    name?: string;
    description?: string;
    idCategory?: string;
    idBrand?: string;
}

export class UpdateProfileInput {
    dob?: number;
    fullName?: string;
    address?: string;
    phone?: string;
    avatar?: string;
}

export class CreateRoleInput {
    idUser?: string;
    idPermissions?: string[];
    name?: string;
    description?: string;
}

export class UpdateRoleInput {
    _id?: string;
    idPermissions?: string[];
    name?: string;
    description?: string;
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

export class CreateStockInput {
    idProduct?: string;
    name?: string;
    salePrice?: number;
    imgs?: string[];
    long?: number;
    width?: number;
    height?: number;
    weight?: number;
}

export class UpdateStockInput {
    _id?: string;
    name?: string;
    salePrice?: number;
    imgs?: string[];
    long?: number;
    width?: number;
    height?: number;
    weight?: number;
}

export class CreateStoreInput {
    name?: string;
    address?: string;
}

export class UpdateStoreInput {
    _id?: string;
    name?: string;
    address?: string;
}

export class TransferStoreInput {
    idSrc?: string;
    idDes?: string;
    type?: TransferType;
    note?: string;
    items: TransferItemInput[];
}

export class TransferItemInput {
    idStock?: string;
    quantity?: number;
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

export class Brand {
    _id?: string;
    name?: string;
    intro?: string;
    img?: string;
    createdAt?: number;
    creator?: User;
    updatedAt?: number;
    updater?: User;
}

export abstract class IQuery {
    abstract brands(idShop?: string): Brand[] | Promise<Brand[]>;

    abstract categories(idShop?: string): Category[] | Promise<Category[]>;

    abstract contracts(): Contract[] | Promise<Contract[]>;

    abstract activeContract(): Contract | Promise<Contract>;

    abstract userContracts(): Contract[] | Promise<Contract[]>;

    abstract permissions(): Permission[] | Promise<Permission[]>;

    abstract plans(): Plan[] | Promise<Plan[]>;

    abstract publishedPlans(): Plan[] | Promise<Plan[]>;

    abstract products(idShop?: string): Product[] | Promise<Product[]>;

    abstract staffs(idShop?: string): Role[] | Promise<Role[]>;

    abstract currentRole(idShop?: string): Role | Promise<Role>;

    abstract shops(): Shop[] | Promise<Shop[]>;

    abstract userShops(): Shop[] | Promise<Shop[]>;

    abstract shopByDomain(domain?: string): Shop | Promise<Shop>;

    abstract stocks(idShop?: string): Stock[] | Promise<Stock[]>;

    abstract stocksByProduct(idShop?: string, idProduct?: string): Stock[] | Promise<Stock[]>;

    abstract stocksByStore(idShop?: string, idStore?: string): Stock[] | Promise<Stock[]>;

    abstract storeTransfers(idShop?: string): StoreTransfer[] | Promise<StoreTransfer[]>;

    abstract stores(idShop?: string): Store[] | Promise<Store[]>;

    abstract templates(): Template[] | Promise<Template[]>;

    abstract activeTemplates(): Template[] | Promise<Template[]>;

    abstract users(): User[] | Promise<User[]>;

    abstract currentUser(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createBrand(idShop?: string, input?: CreateBrandInput): Brand | Promise<Brand>;

    abstract updateBrand(idShop?: string, input?: UpdateBrandInput): Brand | Promise<Brand>;

    abstract deleteBrand(idShop?: string, ids?: string[]): boolean | Promise<boolean>;

    abstract createCategory(idShop?: string, input?: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(idShop?: string, input?: UpdateCategoryInput): Category | Promise<Category>;

    abstract deleteCategory(idShop?: string, id?: string): boolean | Promise<boolean>;

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

    abstract createProduct(idShop?: string, input?: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(idShop?: string, input?: UpdateProductInput): Product | Promise<Product>;

    abstract deleteProduct(idShop?: string, ids?: string[]): boolean | Promise<boolean>;

    abstract updateUserProfile(input?: UpdateProfileInput): Profile | Promise<Profile>;

    abstract createRole(idShop?: string, input?: CreateRoleInput): Role | Promise<Role>;

    abstract updateRole(idShop?: string, input?: UpdateRoleInput): Role | Promise<Role>;

    abstract deleteRole(idShop?: string, id?: string): boolean | Promise<boolean>;

    abstract createShop(input?: CreateShopInput): Shop | Promise<Shop>;

    abstract updateShop(input?: UpdateShopInput): Shop | Promise<Shop>;

    abstract createStock(idShop?: string, input?: CreateStockInput): Stock | Promise<Stock>;

    abstract updateStock(idShop?: string, input?: UpdateStockInput): Stock | Promise<Stock>;

    abstract deleteStock(idShop?: string, ids?: string[]): boolean | Promise<boolean>;

    abstract createStore(idShop?: string, input?: CreateStoreInput): Store | Promise<Store>;

    abstract updateStore(idShop?: string, input?: UpdateStoreInput): Store | Promise<Store>;

    abstract deleteStore(idShop?: string, ids?: string[]): boolean | Promise<boolean>;

    abstract transferStore(idShop?: string, input?: TransferStoreInput): StoreTransfer | Promise<StoreTransfer>;

    abstract createTemplate(input?: CreateTemplateInput): Template | Promise<Template>;

    abstract updateTemplate(input?: UpdateTemplateInput): Template | Promise<Template>;

    abstract deleteTemplate(id?: string): boolean | Promise<boolean>;

    abstract loginUser(input?: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract requestEmailConfirm(input?: RequestEmailConfirmInput): string | Promise<string>;

    abstract registerUser(input?: RegisterUserInput): User | Promise<User>;

    abstract changeUserPassword(input?: ChangePasswordInput): string | Promise<string>;

    abstract createUser(input?: CreateUserInput): User | Promise<User>;

    abstract updateAdmin(input?: UpdateAdminInput): User | Promise<User>;

    abstract deleteUser(input?: DeleteUserInput): boolean | Promise<boolean>;
}

export class Category {
    _id?: string;
    name?: string;
    idParent?: string;
    parent?: Category;
}

export class Contract {
    _id?: string;
    user?: User;
    plan?: Plan;
    expDate?: number;
    signDate?: number;
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

export class Product {
    _id?: string;
    category?: Category;
    brand?: Brand;
    name?: string;
    description?: string;
    isActive?: boolean;
    createdAt?: number;
    creator?: User;
    updatedAt?: number;
    updater?: User;
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
    user?: User;
    permissions?: Permission[];
    name?: string;
    isMaster?: boolean;
    description?: string;
}

export class Shop {
    _id?: string;
    name?: string;
    domain?: string;
    isActive?: boolean;
    brandImg?: string;
    createdAt?: number;
    master?: User;
    template?: Template;
}

export class StockInfo {
    long?: number;
    width?: number;
    height?: number;
    weight?: number;
}

export class StockRecord {
    quantity?: number;
    store?: Store;
    creator?: User;
    createdAt?: number;
    updater?: User;
    updatedAt?: number;
}

export class Stock {
    _id?: string;
    name?: string;
    code?: string;
    salePrice?: number;
    imgs?: string[];
    product?: Product;
    info?: StockInfo;
    records?: StockRecord[];
    createdAt?: number;
    creator?: User;
    updatedAt?: number;
    updater?: User;
}

export class TransferItem {
    _id?: string;
    transfer?: StoreTransfer;
    stock?: Stock;
    quantity?: number;
}

export class StoreTransfer {
    _id?: string;
    src?: Store;
    des?: Store;
    type?: TransferType;
    note?: string;
    items?: TransferItem[];
    createdAt?: number;
    creator?: User;
    updatedAt?: number;
    updater?: User;
}

export class Store {
    _id?: string;
    name?: string;
    address?: string;
    creator?: User;
    createdAt?: number;
    updater?: User;
    updatedAt?: number;
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
    createdAt?: number;
    creator?: User;
    updatedAt?: number;
    updater?: User;
}

export class Credential {
    email?: string;
}

export class LoginResponse {
    token?: string;
    user?: User;
}
