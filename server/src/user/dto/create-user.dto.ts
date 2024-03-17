export type Password = {
    title: string;
    password: string;
}
export class CreateUserDto {
    userName: string;
    password: string;
    storedPasswords?: Password[]
}