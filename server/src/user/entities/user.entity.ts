type Password = {
    password: string;
    title: string;
}

export class User {
    _id?: string;
    userName: string;
    password: string;
    storedPasswords?: Password[]
}