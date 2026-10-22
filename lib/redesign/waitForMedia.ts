const settle = (target: EventTarget, events: string[]) =>
  new Promise<void>((resolve) => {
    events.forEach((event) => target.addEventListener(event, () => resolve(), { once: true }));
  });

/** Resolves once fonts and every eagerly loaded image/video in `root` have finished loading. */
export default function waitForMedia(root: ParentNode, onProgress: (loaded: number, total: number) => void) {
  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img")).filter((img) => img.loading !== "lazy");
  const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("video")).filter((video) => video.preload !== "none");
  const tasks: Promise<unknown>[] = [
    document.fonts.ready,
    ...images.map((img) =>
      (img.complete ? Promise.resolve() : settle(img, ["load", "error"])).then(() => img.decode().catch(() => {})),
    ),
    ...videos.map((video) => (video.readyState >= 3 ? Promise.resolve() : settle(video, ["canplay", "error"]))),
  ];
  let loaded = 0;
  onProgress(loaded, tasks.length);
  return Promise.all(tasks.map((task) => task.then(() => onProgress(++loaded, tasks.length))));
}
