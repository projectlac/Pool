import { useContext, useEffect, useState } from 'react';
import outletApi from 'src/api/outletApi';
import { AuthContext } from 'src/App';
import { Outlet } from 'src/models/';
import RecentOrdersTable from './RecentOrdersTable';

export default function RecentOrders() {
  const { updated } = useContext(AuthContext);

  const [cryptoOrders, setCryptoOrders] = useState<Outlet[]>([]);
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
    outletApi.getData(page, index).then((res) => {
      if (res.data.success) {
        console.log(res.data.data);
        let temp = res.data.data.map((d, index) => {
          return {
            id: d.id,
            outletName: d.name,
            contentPackNameAssigned: d.contentPack.name,
            surveyNameAssigned: d.survey.name,
            groupAssigned: 'north',
            lastUpdated: d.updatedDate
          };
        });
        setCryptoOrders(temp);
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
