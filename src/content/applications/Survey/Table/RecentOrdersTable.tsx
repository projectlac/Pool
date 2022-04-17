import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
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
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BulkActions from 'src/components/Common/BulkAction/BulkActions';
import Pagination from 'src/components/Common/Pagination/Pagination';
import { Survey, SurveyStatus } from 'src/models/survey';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Survey[];
}

const getStatusLabel = (cryptoOrderStatus: SurveyStatus): JSX.Element => {
  const map = {
    draft: {
      text: 'Draft',
      color: '#FF1943'
    },
    publish: {
      text: 'Published',
      color: '#44D600'
    }
  };

  const { text, color }: any = map[cryptoOrderStatus];

  return <Typography color={color}>{text}</Typography>;
};

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
                <TableCell width={'40%'}>Survey Name</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
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
                          {cryptoOrder.surveyName}{' '}
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
                        {cryptoOrder.duration}
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
                        {format(cryptoOrder.lastUpdate, ' dd MMMM, yyyy')}
                      </Typography>
                    </TableCell>

                    <TableCell>{getStatusLabel(cryptoOrder.status)}</TableCell>
                    <TableCell sx={{ display: 'flex' }}>
                      <Box>
                        <ExitToAppOutlinedIcon color="primary" />
                      </Box>
                      <Box ml={1}>
                        <CloseOutlinedIcon color="error" />
                      </Box>
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
