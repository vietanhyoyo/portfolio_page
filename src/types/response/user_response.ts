interface UserResponse {
  user_id: number;
  user_name: string;
  password: string;
  email: string;
  status: 'ENABLE' | 'DISABLE';
  role: 'ADMIN_USER' | 'NORMAL_USER';
  createdAt: string;
  updatedAt: string;
}
