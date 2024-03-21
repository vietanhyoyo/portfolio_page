import axios from '@/utils/axios';

export class UserService {
  async getUser(): Promise<UserResponse> {
    try {
      const response = await axios.get('/user');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unknow error');
    }
  }
}
