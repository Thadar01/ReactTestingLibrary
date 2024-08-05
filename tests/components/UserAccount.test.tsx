import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

describe("userAccount", () => {
  it("should render user name", () => {
    const user: User = {
      id: 1,
      name: "Thadar",
    };

    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
  it("should show Edit button when user is admin", () => {
    const user: User = {
      id: 1,
      name: "Thadar",
      isAdmin: true,
    };

    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
  it("should not show Edit button when user is not admin", () => {
    const user: User = {
      id: 1,
      name: "Thadar",
    };

    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
