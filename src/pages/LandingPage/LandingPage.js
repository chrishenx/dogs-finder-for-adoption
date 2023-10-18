import {
  Box,
  Button, Grid, Stack, Typography 
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <Box sx={{height: "100vh", background: "rgba(101,4,181, 0.1)"}}>
      <Grid container justifyContent="center" paddingTop={10}>
        <Grid item sx={{textAlign: "center"}} xs={10}>
          <Stack spacing={2}>
            <header>
              <Typography fontSize="4.5em" variant="h2">Amazing dog finder</Typography>
            </header>
            <Box>
              <img alt="dog"
                src="/logo512.jpg"
                style={{width: "100%", maxWidth: 500}} />
            </Box>
            <Typography  variant="h4">Find the dog of your dreams!</Typography>
            <Typography variant="h5">It only takes 60 seconds.</Typography>
            <Link to="/signin">
              <Button color="primary"
                size="large"
                sx={{ fontSize: "1.3em"}}
                variant="contained">
              GET STARTED
              </Button>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
