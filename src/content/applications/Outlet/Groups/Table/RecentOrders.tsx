import { useContext, useEffect, useState } from 'react';
import groupApi from 'src/api/group';

import { AuthContext } from 'src/App';
import { Groups } from 'src/models/';
import RecentOrdersTable from './RecentOrdersTable';

export default function RecentOrders() {
  const { updated } = useContext(AuthContext);

  const [cryptoOrders, setCryptoOrders] = useState<Groups[]>([]);
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
    groupApi.getData(page, index).then((res) => {
      if (res.data.success) {
        console.log(res.data.data);
        let temp = res.data.data.map((d, index) => {
          return {
            id: d.id,
            groupName: d.name,
            contentPackAssigned: d.contentPackName,
            surveyNameAssigned: d.surveyName,
            numberOfOutlets: d.numberOfOutlet,
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
