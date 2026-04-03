import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import AccessDenied from "./index";
import { osapiens } from "../../themes";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        AccessDenied: "Access denied",
        speakToYourAdmin: "Speak to your admin",
        logout: "Logout"
      }[key] || key)
  })
}));

describe("AccessDenied", () => {
  it("renders the translated denial screen texts", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AccessDenied />
      </ThemeProvider>
    );

    expect(screen.getByText("Access denied")).toBeInTheDocument();
    expect(screen.getByText("Speak to your admin")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("keeps logout action available when logout button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={osapiens.light}>
        <AccessDenied />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: "Logout" }));

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});
