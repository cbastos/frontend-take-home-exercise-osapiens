import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import AvatarMenu from "./index";
import { osapiens } from "../../themes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "logout" ? "Logout" : key)
  })
}));

describe("AvatarMenu", () => {
  const user = {
    firstName: "Aria",
    lastName: "Test",
    eMail: "aria.test@osapiens.com"
  };

  it("renders user initials in the avatar", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AvatarMenu user={user} />
      </ThemeProvider>
    );

    expect(screen.getByText("AT")).toBeInTheDocument();
  });

  it("opens menu with profile and logout entries when avatar is clicked", async () => {
    const interactions = userEvent.setup();
    render(
      <ThemeProvider theme={osapiens.light}>
        <AvatarMenu user={user} />
      </ThemeProvider>
    );

    await interactions.click(screen.getByText("AT"));

    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("renders without initials when first and last name are missing", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AvatarMenu user={{ eMail: "aria.test@osapiens.com" }} />
      </ThemeProvider>
    );

    expect(screen.queryByText("AT")).not.toBeInTheDocument();
  });
});
