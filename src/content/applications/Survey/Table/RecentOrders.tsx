import { subDays } from 'date-fns';
import { Survey } from 'src/models/survey';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  const cryptoOrders: Survey[] = [
    {
      id: '1',
      surveyName: 'Fiat Deposit',
      lastUpdate: new Date().getTime(),
      status: 'publish',
      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '2',
      surveyName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 1).getTime(),
      status: 'publish',
      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '3',
      surveyName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 5).getTime(),
      status: 'draft',
      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '4',
      surveyName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 55).getTime(),
      status: 'publish',

      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '5',
      surveyName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 56).getTime(),
      status: 'publish',

      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '6',
      surveyName: 'Fiat Deposit',
      lastUpdate: subDays(new Date(), 33).getTime(),
      status: 'publish',

      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '7',
      surveyName: 'Fiat Deposit',
      lastUpdate: new Date().getTime(),
      status: 'publish',

      duration: '25 Mar, 2021 - 26 Mar, 2021'
    },
    {
      id: '8',
      surveyName: 'Paypal Withdraw',
      lastUpdate: subDays(new Date(), 22).getTime(),
      status: 'publish',

      duration: '25 Mar, 2021 - 26 Mar, 2021'
    }
  ];

  return <RecentOrdersTable cryptoOrders={cryptoOrders} />;
}

export default RecentOrders;
