import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";
import exp from "constants";

describe("ExpendableText", () => {
  const limit = 255;
  const longText = "a".repeat(limit + 1);
  const truncateText = longText.substring(0, limit) + "...";
  it("should render the full test if less than 255 characters", () => {
    const text = "Short Text";
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("should truncate the  test if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);
    expect(screen.getByText(truncateText)).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expend text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const ShowMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(ShowMoreButton);
    const ShowLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(ShowLessButton);

    expect(screen.getByText(truncateText)).toBeInTheDocument();
    expect(ShowMoreButton).toHaveTextContent(/more/i);
  });
});
