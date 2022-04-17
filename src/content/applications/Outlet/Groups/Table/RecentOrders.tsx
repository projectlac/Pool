import { Groups } from 'src/models/';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const cryptoOrders: Groups[] = [
    {
      id: '1',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '2',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '3',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'SBC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '4',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '5',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '6',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '7',
      groupName: 'Fiat Deposit',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    },
    {
      id: '8',
      groupName: 'Paypal Withdraw',
      lastUpdated: '25 Mar, 2020',
      contentPackAssigned: 'ABC Content',
      surveyNameAssigned: 'ABV Survey Form',
      numberOfOutlets: 10
    }
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
