export interface CreateUserDto {
    name: string;
    age: number;
    email: string;
    address: string;
}

export interface UpdateUserDto {
    name: string;
    age: number;
    address: string;
}

export interface FindManyUserFilter {
    age?: number;
    email?: string;
}