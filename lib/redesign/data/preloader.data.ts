const preloader = {
  label: "Beyond Creative",
  location: "Melbourne, AU",
  status: "Loading",
  /** The counter drifts up to this value on its own; only finished media takes it to 100. */
  rampTo: 90,
  /** Shortest time (ms) the screen stays up, so a fast load still reads as intentional. */
  minDuration: 1800,
  /** Longest time (ms) to wait for media before revealing the page regardless. */
  timeout: 7000,
  /** Seconds between the counter leaving and the curtain lifting. */
  exitDelay: 0.35,
  ease: [0.76, 0, 0.24, 1] as const,
};
export default preloader;
