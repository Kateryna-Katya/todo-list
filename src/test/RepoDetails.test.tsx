import { render, screen } from "@testing-library/react";
import RepoDetails from "../components/RepoDetails.tsx";

describe("RepoDetails Component", () => {
  const mockRepo = {
    full_name: "user/repo",
    html_url: "https://github.com/user/repo",
    owner: { login: "user", html_url: "https://github.com/user" },
  };

  it("renders repo details correctly", () => {
    render(<RepoDetails repoDetails={mockRepo} />);

    expect(screen.getByText("user/repo")).toBeInTheDocument();
    expect(screen.getByText("Owner:")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
  });
});
