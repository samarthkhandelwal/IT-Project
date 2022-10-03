import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import WorkoutsPage from "../pages/workouts/index";

describe("The List of buttons displaying Workouts or Exercises", () => {
  it("Updates the selected button when another is clicked in the Radio List", () => {
    render(<WorkoutsPage />);

    let btns = screen.getAllByRole("radio");

    btns.forEach((btn1) => {
      fireEvent.click(btn1);
      expect(btn1.checked).toBeTruthy();

      btns.forEach((btn2) => {
        if (btn1 != btn2) {
          expect(btn2.checked).toBeFalsy();
        }
      });
    });
  });
});
