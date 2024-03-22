'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/card/Card';
import { columns, dataSource } from '@/data/home_table_data';
import { UserService } from '@/services/user.service';
import { Button, Modal, Table } from 'antd';
import Search from 'antd/es/input/Search';

type Props = {
  params: { locale: string };
};

const userService = new UserService();

const Home = ({ params: { locale } }: Props) => {
  const [apiData, setApiData] = useState<UserResponse | null>(null);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUser();
        setApiData(res);
      } catch (error: any) {
        console.log(error);
      }
    };

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
        <h1 className="pb-4">{apiData?.email}</h1>
        <Search
          placeholder="input search text"
          onSearch={() => {}}
          className="max-w-xs"
          onChange={(event) => {
            setSearchKey(event.target.value);
          }}
          value={searchKey}
        />
        <div className="inline-block ml-3">
          <Button
            type="primary"
            onClick={showModal}
            style={{ backgroundColor: '#1D267D' }}
          >
            Open Modal
          </Button>
        </div>
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
          dataSource={dataSource}
          columns={columns}
          className="pt-6"
          size="small"
        />
      </Card>
    </main>
  );
};

export default Home;
