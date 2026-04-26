// models/Admin.ts
export interface IAdmin {
  _id?: string;
  username: string;
  password: string; // Will be hashed
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  createdAt?: Date;
  updatedAt?: Date;
}