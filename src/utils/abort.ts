
export function createAbortSignal(
  externalSignal?: AbortSignal,
  timeoutMs = 10000,
) {
  const timeoutController = new AbortController();

  const timer = setTimeout(() => {
    timeoutController.abort();
  }, timeoutMs);

  const signals = [timeoutController.signal, externalSignal].filter(
    (signal): signal is AbortSignal => signal !== undefined,
  );

  function cleanup(){
    clearTimeout(timer);
  }

  return {
    signal: AbortSignal.any(signals),
    signalCleanup: cleanup
  }
}
