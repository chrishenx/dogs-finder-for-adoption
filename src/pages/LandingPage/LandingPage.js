import {
  Box,
  Button, Grid, Typography 
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <Box sx={{height: "100vh", background: "rgba(101,4,181, 0.1)"}}>
      <Grid container justifyContent="center" paddingTop={16}>
        <Grid item sx={{textAlign: "center"}} xs={10}>
          <header>
            <Typography fontSize="4.5em" variant="h2">Amazing dog finder</Typography>
          </header>
          <Typography sx={{marginTop: 4}} variant="h4">Find the dog of your dreams!</Typography>
          <Typography variant="h5">It only takes 60 seconds.</Typography>
          <Link to="/signin">
            <Button color="primary"
              size="large"
              sx={{marginTop: 4, fontSize: "1.3em"}}
              variant="contained">
              GET STARTED
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
