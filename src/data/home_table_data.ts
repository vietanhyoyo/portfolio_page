import { Image } from 'antd';

export const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

export const columns = [
  {
    title: 'Mã hàng hoá',
    dataIndex: 'product_id',
    key: 'product_id',
  },
  // {
  //   title: 'Hình ảnh',
  //   dataIndex: 'image',
  //   key: 'image',
  // },
  {
    title: 'Hàng hoá',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Loại hàng hoá',
    dataIndex: 'product_group_name',
    key: 'product_group_name',
  },
  {
    title: 'Kho',
    dataIndex: 'warehouse_name',
    key: 'warehouse_name',
  },
];
