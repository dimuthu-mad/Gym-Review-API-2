import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import TestGymDashboard from "./TestGymDashboard";

afterEach(() => {
  cleanup();
});

describe("TestGymDashboard", () => {
  it("shows a not logged in message when there is no user", () => {
    render(<TestGymDashboard user={null} gyms={[]} />);

    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });

  it("shows the user's name when logged in", () => {
    render(<TestGymDashboard user={{ name: "Dimuthu" }} gyms={[]} />);

    expect(screen.getByText("Welcome, Dimuthu")).toBeInTheDocument();
  });

  it("hides the protected form when not logged in", () => {
    render(<TestGymDashboard user={null} gyms={[]} />);

    expect(screen.queryByLabelText("Gym Name")).not.toBeInTheDocument();
  });

  it("shows a list of gyms when data is passed in", () => {
    const gyms = [
      { id: 1, name: "FitZone Gym" },
      { id: 2, name: "Power House" },
    ];

    render(<TestGymDashboard user={null} gyms={gyms} />);

    expect(screen.getByText("FitZone Gym")).toBeInTheDocument();
    expect(screen.getByText("Power House")).toBeInTheDocument();
  });

  it("shows an error message when the gym list is empty", () => {
    render(<TestGymDashboard user={null} gyms={[]} />);

    expect(screen.getByText("No gyms available")).toBeInTheDocument();
  });
});
