import { render, screen } from "@testing-library/react";
import IssueCard from "../components/IssueCard";

const mockIssue = { id: 1, title: "Issue 1", state: "open", assignee: null, html_url: "#" };

describe("IssueCard Component", () => {
  it("renders issue card with title", () => {
    render(<IssueCard issue={mockIssue} index={0} />);

    expect(screen.getByText("Issue 1")).toBeInTheDocument();
  });

  it("shows 'Unassigned' if no assignee", () => {
    render(<IssueCard issue={mockIssue} index={0} />);

    expect(screen.getByText("Unassigned")).toBeInTheDocument();
  });
});