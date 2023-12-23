export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: Role; // Assuming a user has a role associated with it
    // Other user-related properties
  }
  