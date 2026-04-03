import { render, screen } from "@testing-library/react";
import Home from "./index";

const translations: Record<string, string> = {
  "home.welcome": "Welcome!",
  "home.sidenote": "Sidenote text",
  "home.issues.listIssue1.title": "Issue 1",
  "home.issues.listIssue1.description": "Issue 1 description",
  "home.issues.listIssue2.title": "Issue 2",
  "home.issues.listIssue2.description": "Issue 2 description",
  "home.issues.listIssue3.title": "Issue 3",
  "home.issues.listIssue3.description": "Issue 3 description",
  "home.issues.listIssue4.title": "Issue 4",
  "home.issues.listIssue4.description": "Issue 4 description",
  "home.issues.listIssue5.title": "Issue 5",
  "home.issues.listIssue5.description": "Issue 5 description"
};

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => translations[key] || key
  }),
  Trans: ({ components }: { components: { b: any } }) => (
    <span>
      Intro with <b>known</b> issues
    </span>
  )
}));

describe("Home", () => {
  it("does not trigger React key warning for list items", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(<Home />);

    expect(
      errorSpy.mock.calls.some((args) =>
        String(args[0]).includes('Each child in a list should have a unique "key" prop')
      )
    ).toBe(false);
    errorSpy.mockRestore();
  });

  it("renders welcome text and translated issue list", () => {
    render(<Home />);

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByText("Issue 1")).toBeInTheDocument();
    expect(screen.getByText("Issue 5")).toBeInTheDocument();
    expect(screen.getByText("Issue 3 description")).toBeInTheDocument();
  });

  it("renders five issue entries", () => {
    render(<Home />);

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("renders intro text with a bold segment", () => {
    render(<Home />);

    expect(screen.getByText("known", { selector: "b" })).toBeInTheDocument();
  });
});
