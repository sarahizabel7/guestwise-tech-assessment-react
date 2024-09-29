import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock(
  "./providers/RestaurantsProvider",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <>{children}</>
);
jest.mock("./pages/Home", () => () => <div>Home Component</div>);

describe("App Component", () => {
  test("renders App and Home component correctly", () => {
    render(<App />);

    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });
});
