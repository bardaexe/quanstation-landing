import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqAccordion } from "../app/components/FaqAccordion";

const items = [
  ["What is QuantStation?", "A native desktop workstation for systematic trading."],
  ["Can I build in Python and Rust?", "Yes. Research projects can contain both languages."],
  ["Where does private work live?", "Private work begins in a local store."],
] as const;

describe("FaqAccordion", () => {
  it("renders stable disclosure contracts for every item", () => {
    const { container } = render(<FaqAccordion items={items} />);
    const disclosures = container.querySelectorAll("details");

    expect(disclosures).toHaveLength(items.length);
    items.forEach(([question, answer], index) => {
      const disclosure = disclosures[index];
      expect(disclosure).toHaveAttribute("id", `faq-${String(index + 1).padStart(2, "0")}`);
      expect(disclosure).toHaveAttribute("name", "quantstation-faq");
      expect(within(disclosure).getByText(question).closest("summary")).toBeInTheDocument();
      expect(within(disclosure).getByText(answer)).toBeInTheDocument();
      expect(disclosure).not.toHaveAttribute("open");
    });
  });

  it("opens and closes each answer through its accessible summary", async () => {
    const user = userEvent.setup();
    const { container } = render(<FaqAccordion items={items} />);
    const disclosures = [...container.querySelectorAll("details")];

    for (const [index, [question]] of items.entries()) {
      const disclosure = disclosures[index];
      const summary = within(disclosure).getByText(question).closest("summary");
      expect(summary).not.toBeNull();
      await user.click(summary!);
      expect(disclosure).toHaveAttribute("open", "");

      await user.click(summary!);
      expect(disclosure).not.toHaveAttribute("open");
    }
  });
});
