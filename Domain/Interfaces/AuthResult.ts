import Permission from "../Entities/Permission";
import Role from "../Entities/Role";

export default interface AuthResult {
    Token: string,
    Id: number,
    FullName: string,
    Roles: Permission[]
}