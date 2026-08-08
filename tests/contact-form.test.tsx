import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "../app/components/ContactForm";

function jsonResponse(body: unknown, ok = true) {
  return {
    json: vi.fn().mockResolvedValue(body),
    ok,
  } as unknown as Response;
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole("textbox", { name: "Full name" }), "Ada Lovelace");
  await user.type(screen.getByRole("textbox", { name: "Work email" }), "ada@example.com");
  await user.type(screen.getByRole("textbox", { name: /Tell us about your workflow/ }), "A local validation workflow.");
}

describe("ContactForm", () => {
  it("uses the requested default interest", () => {
    render(<ContactForm defaultInterest="Access" />);

    expect(screen.getByRole("combobox", { name: "What are you exploring?" })).toHaveValue("Access");
  });

  it("submits the exact JSON payload and shows a pending disabled state", async () => {
    const user = userEvent.setup();
    let resolveRequest!: (response: Response) => void;
    const pendingResponse = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });
    const fetchMock = vi.fn().mockReturnValue(pendingResponse);
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm defaultInterest="General" />);
    await fillRequiredFields(user);
    await user.type(screen.getByRole("textbox", { name: "Company or team" }), "Analytical Engines");
    await user.selectOptions(screen.getByRole("combobox", { name: "What are you exploring?" }), "Pro");

    const submitButton = screen.getByRole("button", { name: "Send request" });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByRole("button", { name: /Saving request/ })).toBeDisabled();
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
      headers: { "content-type": "application/json" },
      method: "POST",
    }));
    const request = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(JSON.parse(String(request.body))).toEqual({
      company: "Analytical Engines",
      email: "ada@example.com",
      interest: "Pro",
      message: "A local validation workflow.",
      name: "Ada Lovelace",
      website: "",
    });

    resolveRequest(jsonResponse({ ok: true }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Your request is in/));
  });

  it("shows success and resets submitted fields", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ ok: true })));
    render(<ContactForm defaultInterest="Premium" />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Your request is in/));
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "Work email" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: /Tell us about your workflow/ })).toHaveValue("");
    expect(screen.getByRole("combobox", { name: "What are you exploring?" })).toHaveValue("Premium");
  });

  it("shows a server error and preserves entered fields for retry", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "Please include a trading context." }, false)));
    render(<ContactForm />);

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: "Send request" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Please include a trading context."));
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveValue("Ada Lovelace");
    expect(screen.getByRole("button", { name: "Send request" })).not.toBeDisabled();
  });

  it("shows a useful message when the request is rejected", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network unavailable")));
    render(<ContactForm />);

    await fillRequiredFields(user);
    fireEvent.submit(screen.getByRole("button", { name: "Send request" }).closest("form")!);

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Network unavailable"));
    expect(screen.getByRole("button", { name: "Send request" })).not.toBeDisabled();
  });
});
