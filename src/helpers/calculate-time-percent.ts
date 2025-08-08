import { timeStringToSeconds } from "./time-string-to-seconds";

/**
 * Calculates the playback progress percentage based on current time and duration.
 *
 * @param currentTime - Current playback time (e.g., "52:31")
 * @param duration - Total duration of the media (e.g., "01:55:15")
 * @returns Progress as a percentage (0–100). Returns NaN if duration is 0.
 *
 * @example
 * calculateTimePercent("52:31", "01:55:15") // returns ~45.56
 */
export function calculateTimePercent(currentTime: string, duration: string) {
  const currentSeconds = timeStringToSeconds(currentTime); // e.g., 3151
  const durationSeconds = timeStringToSeconds(duration); // e.g., 6915

  return (currentSeconds / durationSeconds) * 100;
}
