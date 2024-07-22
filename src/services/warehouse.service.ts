import axios from '@/utils/axios';

export class WarehouseService {
  async getAll(): Promise<[WarehouseResponse]> {
    try {
      const response = await axios.get('/warehouse');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unknow error');
    }
  }
}
