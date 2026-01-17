export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User' },
];
