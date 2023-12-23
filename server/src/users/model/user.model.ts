export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: string; // Assuming role is stored as a string, you can use Role model if available
    // Other user-related properties as needed
  }
  