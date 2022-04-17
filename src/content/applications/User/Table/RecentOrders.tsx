import { User } from 'src/models/user';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const cryptoOrders: User[] = [
    {
      id: '1',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '2',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '3',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'user'
    },
    {
      id: '4',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '5',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '6',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '7',
      userName: 'Fiat Deposit',
      createOn: '14 April, 2022',
      role: 'admin'
    },
    {
      id: '8',
      userName: 'Paypal Withdraw',
      createOn: '14 April, 2022',
      role: 'admin'
    }
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
