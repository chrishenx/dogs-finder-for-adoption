import { Person as PersonIcon } from "@mui/icons-material";
import {
  Avatar, Paper, Typography 
} from "@mui/material";
import { useAuth } from "base-shell/lib/providers/Auth";
import Page from "material-ui-shell/lib/containers/Page/Page";
import React from "react";
import { useIntl } from "react-intl";

import { extractFirstLetters } from "utils";

const MyAccount = () => {
  const intl = useIntl();

  const { auth } = useAuth();
  const {
    name = "",
    email = "",
  } = auth || {};

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: "my_account",
        defaultMessage: "My Account",
      })}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          style={{
            position: "relative",
            borderRadius: 18,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
            padding: "1em"
          }}
        >
          <Avatar
            alt="User Picture"
            style={{
              width: 120, height: 120, marginTop: -40 
            }}
          >
            {name ? extractFirstLetters(name) : <PersonIcon />}
          </Avatar>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="h6">{email}</Typography>
        </Paper>
      </div>
    </Page>
  );
};

export default MyAccount;
