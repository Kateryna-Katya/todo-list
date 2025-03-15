import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { vi } from "vitest";
import App from "../App";
import issueReducer from '../redux/slice/issueSlice';
import repoReducer from '../redux/slice/repoSlice';


const mockStore = configureStore({
  reducer: {
    issues: issueReducer,
    repo: repoReducer,
  },
});

describe("App Component", () => {
  it("renders input and load button", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Enter repo URL")).toBeInTheDocument();
    expect(screen.getByText("Load")).toBeInTheDocument();
  });

  it("handles repo URL input", () => {
    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repo URL");
    fireEvent.change(input, { target: { value: "https://github.com/user/repo" } });
    expect(input).toHaveValue("https://github.com/user/repo");
  });

  it("dispatches actions when Load button is clicked", () => {
    const store = {
      ...mockStore,
      dispatch: vi.fn(),
    };

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repo URL");
    fireEvent.change(input, { target: { value: "https://github.com/user/repo" } });

    const button = screen.getByText("Load");
    fireEvent.click(button);


    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
