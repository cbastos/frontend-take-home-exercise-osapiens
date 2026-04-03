import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import AppHeader from "./index";
import { osapiens } from "../../themes";

const mockChangeLanguage = jest.fn();
let mockCurrentLanguage = "en";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => (key === "appTitle" ? "Supplier OS Application" : key),
    i18n: {
      language: mockCurrentLanguage,
      changeLanguage: mockChangeLanguage
    }
  })
}));

jest.mock("../AvatarMenu", () => ({
  __esModule: true,
  default: () => <div data-testid="avatar-menu">avatar</div>
}));

describe("AppHeader", () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
    mockCurrentLanguage = "en";
  });

  it("renders countdown and title", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AppHeader user={{ eMail: "user@example.com" }} pageTitle="Bug bounty challenge" />
      </ThemeProvider>
    );

    expect(screen.getByText("60:00")).toBeInTheDocument();
    expect(screen.getByText("SUPPLIER OS APPLICATION")).toBeInTheDocument();
  });

  it("shows avatar menu when user email is present", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AppHeader user={{ eMail: "user@example.com" }} pageTitle="Page title" />
      </ThemeProvider>
    );

    expect(screen.getByTestId("avatar-menu")).toBeInTheDocument();
  });

  it("does not render avatar menu when user email is missing", () => {
    render(
      <ThemeProvider theme={osapiens.light}>
        <AppHeader user={{}} pageTitle="Page title" />
      </ThemeProvider>
    );

    expect(screen.queryByTestId("avatar-menu")).not.toBeInTheDocument();
  });

  it("calls language change when DE button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={osapiens.light}>
        <AppHeader user={{ eMail: "user@example.com" }} pageTitle="Page title" />
      </ThemeProvider>
    );

    await user.click(screen.getByRole("button", { name: "DE" }));

    expect(mockChangeLanguage).toHaveBeenCalledWith("de");
  });

  it("shows 00:00 when countdown reaches zero", () => {
    jest.useFakeTimers();
    render(
      <ThemeProvider theme={osapiens.light}>
        <AppHeader user={{ eMail: "user@example.com" }} pageTitle="Page title" />
      </ThemeProvider>
    );

    act(() => {
      jest.advanceTimersByTime(3601 * 1000);
    });

    expect(
      screen.getByText(
        (_content, node) => node?.textContent === "00:00" && node.children.length === 0
      )
    ).toBeInTheDocument();
    jest.useRealTimers();
  });
});
