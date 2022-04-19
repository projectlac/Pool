import {
  Box,
  Card,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { getTime } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BulkActions from 'src/components/Common/BulkAction/BulkActions';
import Pagination from 'src/components/Common/Pagination/Pagination';
import { User } from 'src/models/user';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: User[];
}

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const getTime = (time: string) => {
    let timer = `${time.split('T')[0]} / ${time.split('T')[1]}`;
    return timer;
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;

  return (
    <>
      <Box flex={1} pb={2}>
        <BulkActions selectedCryptoOrders={selectedCryptoOrders} />
      </Box>
      <Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                background: '#044b7e',

                '& .MuiTableCell-head': {
                  color: '#fff',
                  fontSize: '16px',
                  textTransform: 'none',
                  '& svg': {
                    fill: '#fff'
                  }
                }
              }}
            >
              <TableRow>
                <TableCell width={'5%'}>#</TableCell>
                <TableCell width={'5%'} padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllCryptoOrders}
                    indeterminate={selectedSomeCryptoOrders}
                    onChange={handleSelectAllCryptoOrders}
                  />
                </TableCell>
                <TableCell width={'60%'}>User Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& .MuiTableRow-root > td': {
                  borderBottom: 'none'
                },
                '& .MuiTableRow-root > td .MuiTypography-gutterBottom': {
                  fontSize: '16px',
                  fontWeight: 'normal',
                  color: '#2b7fbb'
                },
                '& .MuiTableRow-root:nth-of-type(2n)': {
                  background: '#ebebeb'
                },
                '& .MuiTableRow-root:nth-of-type(2n + 1)': {
                  background: '#fff'
                }
              }}
            >
              {cryptoOrders.map((cryptoOrder, index) => {
                const isCryptoOrderSelected = selectedCryptoOrders.includes(
                  cryptoOrder.id
                );
                return (
                  <TableRow
                    hover
                    key={cryptoOrder.id}
                    selected={isCryptoOrderSelected}
                  >
                    <TableCell>
                      <Typography color="#2b7fbb">{index + 1}</Typography>
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneCryptoOrder(event, cryptoOrder.id)
                        }
                        value={isCryptoOrderSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`./edit/${cryptoOrder.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          {cryptoOrder.userName}{' '}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.role}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {getTime(cryptoOrder.createdDate)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Box pt={2}>
        <Pagination />
      </Box>
    </>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
