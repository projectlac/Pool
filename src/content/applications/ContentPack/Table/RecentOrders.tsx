import { useEffect, useState } from 'react';
import contentPackApi from 'src/api/contentPackApi';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const [cryptoOrders, setCryptoOrders] = useState<CryptoOrder[]>([]);
  const [page, setPage] = useState<number>(10);
  const [index, setIndex] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const handleSetPage = (page: number) => {
    setPage(page);
  };
  const handleSetIndex = (index: number) => {
    setIndex(index);
  };
  useEffect(() => {
    contentPackApi.getData(page, index).then((res) => {
      if (res.data.success) {
        setCryptoOrders(res.data.data);
        setTotal(res.data.totalCount);
      }
    });
  }, [page, index]);

  return (
    <RecentOrdersTable
      cryptoOrders={cryptoOrders}
      handleSetPage={handleSetPage}
      handleSetIndex={handleSetIndex}
      total={total}
      page={page}
      index={index}
    />
  );
}

export default RecentOrders;
