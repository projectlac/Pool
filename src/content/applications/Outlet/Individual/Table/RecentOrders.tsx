import { subDays } from 'date-fns';
import { Outlet } from 'src/models/';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const cryptoOrders: Outlet[] = [
    {
      id: '1',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '2',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '3',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'SBC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '4',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '5',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '6',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '7',
      outletName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    },
    {
      id: '8',
      outletName: 'Paypal Withdraw',
      lastUpdated: '25 Mar, 2020',
      contentPackNameAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      groupAssigned: 'North'
    }
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
