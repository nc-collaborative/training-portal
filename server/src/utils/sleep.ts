import { logger } from '../logger';

/**
 * Await an arbitrary amount of time
 * @param timeMs time in milliseconds
 */
export default function sleep(timeMs: number): Promise<true> {
  return new Promise(res => {
    setTimeout(res, timeMs, true);
  });
}

export function fireAndForget(fn: () => Promise<any>) {
  fn().catch(err => logger.error(err));
}
