import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CoinContainer from "./CoinContainer";

beforeEach(function() {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75);
});

it("renders without crashing", function() {
  render(<CoinContainer />);
});

it("matches snapshot", function() {
  const { container } = render(<CoinContainer />);
  expect(container).toMatchSnapshot();
});

it("doesn't show a coin on page load", function() {
  const { container } = render(<CoinContainer />);

  expect(container.querySelector(".Coin")).toBeNull();
});

it("counts correctly when heads appears", function() {
  const { container } = render(<CoinContainer />);

  const button = container.querySelector("button");
  fireEvent.click(button);

  expect(container.querySelector("img[alt='head']")).toBeInTheDocument();
  expect(container.querySelector("img[alt='tail']")).not.toBeInTheDocument();
  expect(container.querySelector("p"))
    .toHaveTextContent("Out of 1 flips, there have been 1 heads and 0 tails.");
});

it("counts correctly when tails appears", function() {
  const { container } = render(<CoinContainer />);

  const button = container.querySelector("button");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(container.querySelector("img[alt='head']")).not.toBeInTheDocument();
  expect(container.querySelector("img[alt='tail']")).toBeInTheDocument();
  expect(container.querySelector("p"))
    .toHaveTextContent("Out of 2 flips, there have been 1 heads and 1 tails.");
});

afterEach(function() {
  Math.random.mockRestore();
});
