import {
  AccountBox as AccountBoxIcon,
  ChromeReaderMode,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  GetApp,
  InfoOutlined,
  Language as LanguageIcon,
  Lock as LockIcon,
  MenuOpen as MenuOpenIcon,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

import allLocales from "./locales";
import allThemes from "./themes";

import { extractFirstLetters } from "utils";

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props;

  const {
    toggleThis, isDesktop, isAuthMenuOpen, isMiniSwitchVisibility 
  } = menuContext;
  const { themeID, setThemeID } = themeContext;

  const { auth, setAuth } = authData;
  const {
    isAppInstallable, isAppInstalled, deferredPrompt 
  } = a2HSContext;

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale);
      },
      leftIcon: <LanguageIcon />,
    };
  });

  const isAuthorized = auth.isAuthenticated;

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id);
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    };
  });

  if (!isAuthorized) {
    return [
      {primaryText: intl.formatMessage({ id: "knowTheUniverse" }),},
    ];
  }

  if (isAuthMenuOpen) {
    return [
      {
        value: "/my_account",
        primaryText: intl.formatMessage({
          id: "my_account",
          defaultMessage: "My Account",
        }),
        leftIcon: <Avatar
          alt={auth.name}
          style={{ width: 40, height: 40 }}
        >
          {auth.name ? extractFirstLetters(auth.name) : <AccountBoxIcon />}
        </Avatar>
      },
      {
        value: "/signin",
        onClick: isAuthorized
          ? () => {
            setAuth({ isAuthenticated: false });
          }
          : () => { },
        visible: true,
        primaryText: isAuthorized
          ? intl.formatMessage({ id: "sign_out" })
          : intl.formatMessage({ id: "sign_in" }),
        leftIcon: isAuthorized ? <ExitToAppIcon /> : <LockIcon />,
      },
    ];
  }
  return [
    {
      value: "/home",
      visible: isAuthorized,
      primaryText: intl.formatMessage({ id: "home" }),
      leftIcon: <DashboardIcon />,
    },
    {
      value: "/about",
      visible: true,
      primaryText: intl.formatMessage({ id: "about" }),
      leftIcon: <InfoOutlined />,
    },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: "settings" }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: "theme" }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: "language" }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
        {
          visible: isDesktop ? true : false,
          onClick: () => {
            toggleThis("isMiniSwitchVisibility");
          },
          primaryText: intl.formatMessage({id: "menu_mini_mode",}),
          leftIcon: isMiniSwitchVisibility ? (
            <MenuOpenIcon />
          ) : (
            <ChromeReaderMode />
          ),
        },
      ],
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt();
      },
      primaryText: intl.formatMessage({
        id: "install",
        defaultMessage: "Install",
      }),
      leftIcon: <GetApp />,
    },
  ];
};
export default getMenuItems;
