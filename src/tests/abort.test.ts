import { jest } from "@jest/globals";
import { createAbortSignal } from "../utils/abort.js";

beforeEach(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.useRealTimers();
});

test("returns AbortSignal", () => {
  const { signal } = createAbortSignal(undefined, 1000);
  expect(signal).toBeInstanceOf(AbortSignal);
  expect(signal.aborted).toBe(false);
});

test("aborts signal after timeout", () => {
  const { signal } = createAbortSignal(undefined, 1000);
  expect(signal.aborted).toBe(false);

  jest.advanceTimersByTime(1001);
  expect(signal.aborted).toBe(true);
});

test("prevents signal from aborting after timeout cleanup", () => {
    const {signal, timeoutCleanup} = createAbortSignal(undefined, 1000);
    expect(signal.aborted).toBe(false);
    timeoutCleanup();
    expect(signal.aborted).toBe(false);
});
