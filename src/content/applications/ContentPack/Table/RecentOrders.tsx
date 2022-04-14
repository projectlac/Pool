import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: '1',
      contentPackName: 'Fiat Deposit',
      lastUpdate: new Date().getTime(),
      status: 'publish',

      numberOfContent: 34.4565
    },
    {
      id: '2',
      contentPackName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 1).getTime(),
      status: 'publish',

      numberOfContent: 6.58454334
    },
    {
      id: '3',
      contentPackName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 5).getTime(),
      status: 'draft',
      numberOfContent: 6.58454334
    },
    {
      id: '4',
      contentPackName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 55).getTime(),
      status: 'publish',

      numberOfContent: 6.58454334
    },
    {
      id: '5',
      contentPackName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 56).getTime(),
      status: 'publish',

      numberOfContent: 6.58454334
    },
    {
      id: '6',
      contentPackName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 33).getTime(),
      status: 'publish',

      numberOfContent: 6.58454334
    },
    {
      id: '7',
      contentPackName: 'Fiat Deposit',
      lastUpdate: new Date().getTime(),
      status: 'publish',

      numberOfContent: 2.346546
    },
    {
      id: '8',
      contentPackName: 'Paypal Withdraw',
      lastUpdate: subDays(new Date(), 22).getTime(),
      status: 'publish',

      numberOfContent: 3.345456
    }
  ];

  const column = [
    'Content Pack Name',
    '# of Content(s)',
    'Last Update',
    'Status'
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
