import { useContext, useEffect, useState } from 'react';
import surveyApi from 'src/api/surveyApi';
import { AuthContext } from 'src/App';
import { Survey } from 'src/models/survey';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const { updated } = useContext(AuthContext);

  const [cryptoOrders, setCryptoOrders] = useState<Survey[]>([]);
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
    surveyApi.getData(page, index).then((res) => {
      if (res.data.success) {
        setCryptoOrders(res.data.data);
        setTotal(res.data.totalCount);
      }
    });
  }, [page, index, updated]);

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
