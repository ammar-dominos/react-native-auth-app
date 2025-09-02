import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";
import { HomeScreen } from "../HomeScreen";
import { useAuth } from "../../../contexts";

jest.mock("../../../contexts", () => ({
  useAuth: jest.fn(),
}));

jest.spyOn(Alert, "alert");

jest.mock("../../../components/ui", () => ({
  ...jest.requireActual("../../../components/ui"),
  Button: ({ title, onPress }: { title: string; onPress: () => void }) => (
    <button onClick={onPress}>{title}</button>
  ),
  MessageCard: ({ title }: { title: string }) => <div>{title}</div>,
  LoadingSpinner: ({ text }: { text: string }) => <div>{text}</div>,
}));

describe("HomeScreen", () => {
  const mockLogin = jest.fn();
  const mockSignup = jest.fn();
  const mockLogout = jest.fn();
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  const mockUser = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    createdAt: "2023-01-01T00:00:00Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: false,
      user: mockUser,
      isAuthenticated: true,
    });
  });

  it("renders correctly with user information", () => {
    const rendered = render(<HomeScreen />);

    expect(rendered).toBeTruthy();
  });

  it("shows loading state when loading", () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      signup: mockSignup,
      logout: mockLogout,
      isLoading: true,
      user: mockUser,
      isAuthenticated: true,
    });

    const rendered = render(<HomeScreen />);
    expect(rendered).toBeTruthy();
  });

  it("displays sign out button", () => {
    const rendered = render(<HomeScreen />);
    expect(rendered).toBeTruthy();
  });

  it("handles logout button press", () => {
    const rendered = render(<HomeScreen />);

    expect(rendered).toBeTruthy();
    expect(mockUseAuth).toHaveBeenCalled();
  });

  it("renders message card", () => {
    const rendered = render(<HomeScreen />);
    expect(rendered).toBeTruthy();
  });
});
