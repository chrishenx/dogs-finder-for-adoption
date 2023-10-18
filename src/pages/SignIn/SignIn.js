import {
  Box,
  Button, TextField, Typography 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "base-shell/lib/providers/Auth";
import { useConfig } from "base-shell/lib/providers/Config";
import Page from "material-ui-shell/lib/containers/Page";
import { useMenu } from "material-ui-shell/lib/providers/Menu";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";

import CustomPaper from "../../components/CustomPaper";

import { request } from "utils";

const SignIn = ({ redirectTo = "/" }) => {
  const { appConfig } = useConfig();
  const intl = useIntl();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toggleThis } = useMenu();
  const { setAuth } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    authenticate({
      name: name,
      email: email,
    });
  }

  const authenticate = async (user) => {
    const response = await request(appConfig.api.signIn, { body: user, method: "POST" });
    if (response.status === 200) {
      setAuth({ isAuthenticated: true, ...user });
      toggleThis("isAuthMenuOpen", false);
  
      let from = new URLSearchParams(location.search).get("from");
  
      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    }
  };

  return (
    <Page pageTitle={intl.formatMessage({ id: "sign_in" })}>
      <CustomPaper elevation={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: "sign_in" })}
          </Typography>
          <form
            style={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
          >
            <TextField
              autoFocus
              fullWidth
              required
              autoComplete="name"
              id="name"
              label={intl.formatMessage({ id: "name" })}
              margin="normal"
              name="name"
              value={name}
              variant="outlined"
              onInput={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              autoComplete="email"
              id="email"
              label={intl.formatMessage({ id: "email" })}
              margin="normal"
              name="email"
              type="email"
              value={email}
              variant="outlined"
              onInput={(e) => setEmail(e.target.value)}
            />
            <Button
              fullWidth
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
              type="submit"
              variant="contained"
            >
              {intl.formatMessage({ id: "sign_in" })}
            </Button>
          </form>
        </Box>
      </CustomPaper>
    </Page>
  );
};

export default SignIn;
