export declare class StudentDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly age: number;
    readonly address?: string;
    constructor(data: {
        firstName: string;
        lastName: string;
        age: number;
        address?: string;
    });
}
