import axios from '@/utils/axios';

export class LoginService {
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post('/auth/login', {
        email: username,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unknow error');
    }
  }
}
