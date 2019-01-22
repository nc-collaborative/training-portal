/**
 * Await an arbitrary amount of time
 * @param timeMs time in milliseconds
 */
export default function sleep(timeMs: number): Promise<true> {
  return new Promise(res => {
    setTimeout(res, timeMs, true);
  });
}
