import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Trans, useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("app");
  const issues = [
    {
      key: "listIssue1",
      icon: "🐞",
      title: t("home.issues.listIssue1.title"),
      description: t("home.issues.listIssue1.description")
    },
    {
      key: "listIssue2",
      icon: "🐞",
      title: t("home.issues.listIssue2.title"),
      description: t("home.issues.listIssue2.description")
    },
    {
      key: "listIssue3",
      icon: "🐞",
      title: t("home.issues.listIssue3.title"),
      description: t("home.issues.listIssue3.description")
    },
    {
      key: "listIssue4",
      icon: "🐞",
      title: t("home.issues.listIssue4.title"),
      description: t("home.issues.listIssue4.description")
    },
    {
      key: "listIssue5",
      icon: "⭐️",
      title: t("home.issues.listIssue5.title"),
      description: t("home.issues.listIssue5.description")
    }
  ];

  return (
    <Box p={2} maxHeight="calc(100vh - 64px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans i18nKey="home.intro" ns="app" components={{ b: <b /> }} />
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        <List>
          {issues.map((issue) => (
            <ListItem key={issue.key}>
              <Typography variant="h5" sx={{ p: 2 }}>
                {issue.icon}
              </Typography>
              <ListItemText
                primary={issue.title}
                secondary={issue.description}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default observer(Home);
