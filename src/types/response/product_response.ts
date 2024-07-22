interface ProductResponse {
  product_id: number;
  product_name: string;
  price: number;
  image: string;
  amount: number;
  product_group: {
    product_group_name: string;
  };
  warehouse: {
    warehouse_name: string;
  };
}
