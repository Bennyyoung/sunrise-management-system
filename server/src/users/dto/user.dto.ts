export class CreateUserDTO {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly role: string; // Adjust as needed, you can use Role model if available
    // Other necessary fields for creating a user
  }
  
  export class UpdateUserDTO {
    readonly username?: string;
    readonly password?: string;
    readonly email?: string;
    readonly role?: string; // Adjust as needed, you can use Role model if available
    // Other fields for updating a user
  }
  