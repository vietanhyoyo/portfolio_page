'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/card/Card';
import { columns, dataSource } from '@/data/home_table_data';
import { UserService } from '@/services/user.service';
import { Button, Modal, Select, Table } from 'antd';
import Search from 'antd/es/input/Search';
import { WarehouseService } from '@/services/warehouse.service';
import { ProductService } from '@/services/product.service';

type Props = {
  params: { locale: string };
};

const userService = new UserService();
const warehouseService = new WarehouseService();
const productService = new ProductService();

const Home = ({ params: { locale } }: Props) => {
  const [apiData, setApiData] = useState<UserResponse | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warehouse, setWarehouse] = useState<[WarehouseResponse] | null>(null);
  const [products, setProducts] = useState<[ProductResponse] | null>(null);
  const [selectWarehouse, setSelectWarehouse] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const res = await userService.getUser();
      setApiData(res);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getWarehouse = async (): Promise<number> => {
    try {
      const res = await warehouseService.getAll();
      setWarehouse(res);
      setSelectWarehouse(res[0].warehouse_id);
      return res[0].warehouse_id;
    } catch (error: any) {
      console.log(error);
      return 0;
    }
  };

  const getProducts = async () => {
    try {
      const selectWarehouse = await getWarehouse();
      await getAPIProduct(selectWarehouse);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAPIProduct = async (warehouseId: number) => {
    const res = await productService.getByWarehouse(warehouseId);
    setProducts(res);
  };

  useEffect(() => {
    getProducts();
    fetchData();

    return () => {
      // Cleanup logic here if necessary
    };
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="h-screen p-3 text-slate-800 bg-slate-100">
      <Card>
        {/* <h1 className="pb-4">{apiData?.email}</h1> */}
        <Select
          className="w-56"
          value={selectWarehouse}
          placeholder="Chọn kho"
          // options={[{ value: 'sample', label: <span>sample</span> }]}
          options={warehouse?.map((item, index) => {
            return {
              value: item.warehouse_id,
              label: <span key={index}>{item.warehouse_name}</span>,
            };
          })}
          onChange={(value) => {
            setSelectWarehouse(value);
            getAPIProduct(value);
          }}
        />
        {/* <div className="inline-block ml-3">
          <Button
            type="primary"
            onClick={showModal}
            style={{ backgroundColor: '#1D267D' }}
          >
            Open Modal
          </Button>
        </div> */}
        <div className="bg-primary">
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
                style={{ backgroundColor: '#1D267D' }}
              >
                Submit
              </Button>,
            ]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
        <Table
          dataSource={
            products?.map((item, index) => {
              return {
                key: index,
                product_id: item.product_id,
                // image: item.image,
                product_name: item.product_name,
                price: item.price,
                amount: item.amount,
                product_group_name: item.product_group.product_group_name,
                warehouse_name: item.warehouse.warehouse_name,
              };
            }) || []
          }
          columns={columns}
          className="pt-6"
          size="small"
        />
      </Card>
    </main>
  );
};

export default Home;
