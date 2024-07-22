import axios from '@/utils/axios';

export class ProductService {
  async getByWarehouse(warehouse_id: number): Promise<[ProductResponse]> {
    try {
      const response = await axios.get(`/product/${warehouse_id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Unknow error');
    }
  }
}
