import { useState } from 'react';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import { useRequest } from 'hooks/useRequest';
import { DogMatch } from './DogMatch';

function DogMatcher({ dogIds }) {
  const [open, setOpen] = useState(false);
  const { data: { match: matchedDogId }, loading, performRequest } = useRequest('/dogs/match', { match: null }, {
    method: 'POST',
    body: [...dogIds]
  }, true);

  const generateMatch = () => {
    setOpen(true)
    performRequest();
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button fullWidth variant="outlined" color="primary" onClick={generateMatch}>
        Find my perfecto dog!
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <>
          {loading ? (
            <Box>
              <Typography variant="h6" component="h2">
                Looking for you perfecto dog...
              </Typography>
              <CircularProgress />
            </Box>
          ) :
            matchedDogId && <DogMatch dogId={matchedDogId} />
          }
        </>
      </Modal>
    </>
  );
}

export default DogMatcher;