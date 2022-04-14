import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import UsePagination from 'src/components/Common/Pagination/UsePagination';
import SelectBulkAction from 'src/components/Common/SelectWithoutLabel/SelectBulkAction';

const ButtonApply = styled(Button)(
  ({ theme }) => `
     background: #e9ecef;
     color: ${theme.palette.primary.main};
     border:1px solid #c9c9c9;
     &:hover {
        background: #c1c1c1;
     }
    `
);
interface Props {
  selectedCryptoOrders: string[];
}
function BulkActions({ selectedCryptoOrders }: Props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <SelectBulkAction />
          <ButtonApply
            sx={{ ml: 1 }}
            variant="contained"
            disabled={selectedCryptoOrders.length === 0 ? true : false}
            onClick={() => {
              console.log(selectedCryptoOrders);
            }}
          >
            Apply
          </ButtonApply>
        </Box>
      </Box>
      <UsePagination />
    </Box>
  );
}

export default BulkActions;
