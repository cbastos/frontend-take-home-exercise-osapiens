import { Grow, Box, Button, Theme, Toolbar, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height
}));

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>((props, ref) => {
  const { user, pageTitle } = props;
  const { t, i18n } = useTranslation("app");
  const theme = useTheme();
  const currentLanguage = (i18n.language || "en").split("-")[0];

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const [count, setCount] = useState(0);
  const hours = 1;
  const minutes = hours * 60;
  const totalSeconds = minutes * 60;
  const countdown = Math.max(totalSeconds - count, 0);
  const countdownMinutes = `${Math.floor(countdown / 60)}`.padStart(2, "0");
  const countdownSeconds = `${countdown % 60}`.padStart(2, "0");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCount((c) => (c < totalSeconds ? c + 1 : c));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
      <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
        <Box sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <Box>
            <Typography variant="h6" component="div" color="primary">
              {countdownMinutes}:{countdownSeconds}
            </Typography>
          </Box>
          <Box sx={{ width: 20, height: 20, flex: 1 }} />
          <Box sx={{ flex: 2 }}>
            <Typography
              sx={{
                ...typoStyle,
                color: theme.palette.primary.main,
                mb: theme.spacing(0.5)
              }}
              variant="h6"
              component="div"
            >
              {t("appTitle").toLocaleUpperCase()}
            </Typography>
            <Typography
              sx={{ ...typoStyle }}
              variant="overline"
              component="div"
              noWrap
            >
              {pageTitle.toLocaleUpperCase()}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Button
                size="small"
                variant={currentLanguage === "en" ? "contained" : "text"}
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </Button>
              <Button
                size="small"
                variant={currentLanguage === "de" ? "contained" : "text"}
                onClick={() => handleLanguageChange("de")}
              >
                DE
              </Button>
            </Box>
            {user && user.eMail && (
              <Grow in={Boolean(user && user.eMail)}>
                <Box>
                  <AvatarMenu user={user} />
                </Box>
              </Grow>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default AppHeader;
