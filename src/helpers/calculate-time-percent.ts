import { timeStringToSeconds } from "./time-string-to-seconds";

export function calculateTimePercent(currentTime: string, duration: string) {
  const currentSeconds = timeStringToSeconds(currentTime); // e.g., 3151
  const durationSeconds = timeStringToSeconds(duration); // e.g., 6915

  return (currentSeconds / durationSeconds) * 100;
}
