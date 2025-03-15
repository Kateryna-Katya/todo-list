import { render, screen } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";

const mockIssues = [
  { id: 1, title: "Issue 1", state: "open", assignee: null, html_url: "#" },
  { id: 2, title: "Issue 2", state: "closed", assignee: { login: "user" }, html_url: "#" },
];

describe("KanbanBoard Component", () => {
  it("renders columns with correct titles", () => {
    render(<KanbanBoard issues={mockIssues} />);

    expect(screen.getByText("TODO")).toBeInTheDocument();
    expect(screen.getByText("INPROGRESS")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  it("displays issues in correct columns", () => {
    render(<KanbanBoard issues={mockIssues} />);

    expect(screen.getByText("Issue 1")).toBeInTheDocument();
    expect(screen.getByText("Issue 2")).toBeInTheDocument();
  });
});