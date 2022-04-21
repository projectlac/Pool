import { useContext, useEffect, useState } from 'react';
import userApi from 'src/api/userApi';
import { AuthContext } from 'src/App';
import { User } from 'src/models/user';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { updated } = useContext(AuthContext);

  const [page, setPage] = useState<number>(10);
  const [index, setIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [cryptoOrders, setCryptoOrders] = useState<User[]>([]);
  useEffect(() => {
    try {
      userApi.getList(page, index).then((res) => {
        if (res.data.success) setCryptoOrders(res.data.data);
      });
    } catch (error) {}
  }, []);

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
