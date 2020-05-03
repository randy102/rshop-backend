import AuthDirective from "./auth.directive";
import PermissionDirective from "./permission.directive";
import AccountTypeDirective from "./accountType.directive";

export default {
  isAuth: AuthDirective,
  hasPermission: PermissionDirective,
  hasType: AccountTypeDirective
}