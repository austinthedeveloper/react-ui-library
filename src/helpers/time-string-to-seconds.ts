/**
 * Converts a time string (formatted as "mm:ss" or "hh:mm:ss") into total seconds.
 *
 * @param time - A string representing time (e.g., "05:30" or "01:45:20")
 * @returns The total number of seconds as a number.
 *
 * @example
 * timeStringToSeconds("05:30") // returns 330
 * timeStringToSeconds("01:45:20") // returns 6320
 */
export function timeStringToSeconds(time: string): number {
  if (!time) return 0;
  const parts = time.split(":").map(Number);

  // Support mm:ss or hh:mm:ss
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return 0;
}
