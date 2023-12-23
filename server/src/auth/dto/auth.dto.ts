export class LoginDTO {
    username: string;
    password: string;
  }
  
  export class RegisterDTO {
    username: string;
    password: string;
    email: string;
    // Other necessary fields for registration
  }
  
  export class PasswordChangeDTO {
    oldPassword: string;
    newPassword: string;
    // Other necessary fields for password change
  }
  
  // Other DTOs as needed for authentication operations
  