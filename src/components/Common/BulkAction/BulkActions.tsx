import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
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
  total?: number;
  handleSetIndex?: (index: number) => void;
  page?: number;
  index?: number;
  url?: string;
}
function BulkActions({
  selectedCryptoOrders,
  total,
  handleSetIndex,
  page,
  url,
  index
}: Props) {
  const [action, setAction] = useState<string>('Bulk Action');
  const handlesetAciton = (value: string) => {
    setAction(value);
  };
  const actionAllSeleted = () => {
    switch (url) {
      case 'content-pack':
        deleteContentPack();
    }
  };
  const deleteContentPack = () => {
    console.log(selectedCryptoOrders);
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <SelectBulkAction handlesetAciton={handlesetAciton} action={action} />
          <ButtonApply
            sx={{ ml: 1 }}
            variant="contained"
            disabled={
              selectedCryptoOrders.length === 0 || action === 'Bulk Action'
                ? true
                : false
            }
            onClick={actionAllSeleted}
          >
            Apply
          </ButtonApply>
        </Box>
      </Box>

      {total > page && (
        <UsePagination
          total={total}
          handleSetIndex={handleSetIndex}
          page={page}
          indexPage={index}
        />
      )}
    </Box>
  );
}

export default BulkActions;
