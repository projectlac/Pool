import { useEffect, useState } from 'react';
import userApi from 'src/api/userApi';
import { User } from 'src/models/user';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [cryptoOrders, setCryptoOrders] = useState<User[]>([]);
  useEffect(() => {
    try {
      userApi.getList().then((res) => {
        if (res.data.success) setCryptoOrders(res.data.data);
      });
    } catch (error) {}
  }, []);

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
