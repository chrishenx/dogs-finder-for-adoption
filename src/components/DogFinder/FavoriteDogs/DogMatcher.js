import {
  Box, Button, CircularProgress, Modal, Typography 
} from "@mui/material";
import { useConfig } from "base-shell/lib/providers/Config";
import { useState } from "react";
import { useIntl } from "react-intl";

import { DogMatch } from "./DogMatch";

import { useRequest } from "hooks/useRequest";



function DogMatcher({ dogIds }) {
  const { appConfig } = useConfig();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const {
    data: { match: matchedDogId }, loading, performRequest 
  } = useRequest(appConfig.api.dogMatch, { match: null },
    {
      method: "POST",
      body: [...dogIds]
    },
    true
  );

  const generateMatch = () => {
    setOpen(true);
    performRequest();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth
        color="primary"
        variant="outlined"
        onClick={generateMatch}>
        {intl.formatMessage({ id: "components.dogMatcher.button" })}
      </Button>
      <Modal
        open={open}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClose={handleClose}
      >
        <>
          {loading ? (
            <Box>
              <Typography component="h2" variant="h6">
                {intl.formatMessage({ id: "components.dogMatcher.loading.title" })}
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