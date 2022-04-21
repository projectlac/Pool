import { Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import contentPackApi from 'src/api/contentPackApi';
import { AuthContext } from 'src/App';
import { useNavigate } from 'react-router';
import de from 'date-fns/esm/locale/de/index.js';
import surveyApi from 'src/api/surveyApi';
const BoxNav = styled(Box)({
  height: '65px',
  position: 'fixed',
  width: ' calc(100% - 280px)',
  marginLeft: '-24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: ' #f4f4f4',
  bottom: 0,
  padding: '0px 50px'
});
interface PropsSubmit {
  onSubmit: (status: string) => void;
  editMode: boolean;
  isShowDraftBtn?: boolean;

  idContentPack?: string;
  page: string;
}
function SubmitNav({
  onSubmit,
  idContentPack,
  page,
  editMode,
  isShowDraftBtn = false
}: PropsSubmit) {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);
  const nav = useNavigate();
  const deleleAction = () => {
    switch (page) {
      case 'content-pack':
        deleteContentPack();
        break;
      case 'survey':
        deleteSurvey();
        break;
    }
  };

  const deleteContentPack = () => {
    contentPackApi.delete(idContentPack).then((res) => {
      handleOpenToast();
      handleChangeMessageToast(res.data.message);
      if (res.data.success) {
        nav(`${process.env.REACT_APP_BASE_NAME}/${page}`);
      }
    });
  };
  const deleteSurvey = () => {
    surveyApi.delete(idContentPack).then((res) => {
      handleOpenToast();
      handleChangeMessageToast(res.data.message);
      if (res.data.success) {
        nav(`${process.env.REACT_APP_BASE_NAME}/${page}`);
      }
    });
  };

  return (
    <BoxNav>
      <Box>
        {editMode && (
          <Button color="error" onClick={deleleAction}>
            Delete
          </Button>
        )}
      </Box>

      <Box>
        {isShowDraftBtn && (
          <Button
            type="submit"
            onClick={() => {
              onSubmit('1');
            }}
          >
            Save as draft
          </Button>
        )}
        <Button
          variant="contained"
          type="submit"
          onClick={() => {
            onSubmit('2');
          }}
        >
          Save
        </Button>
      </Box>
    </BoxNav>
  );
}

export default SubmitNav;
