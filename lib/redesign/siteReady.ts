const EVENT = "site-ready";

export function isSiteReady() {
  return document.documentElement.dataset.siteReady === "true";
}

export function markSiteReady() {
  document.documentElement.dataset.siteReady = "true";
  window.dispatchEvent(new Event(EVENT));
}

export function onSiteReady(callback: () => void) {
  if (isSiteReady()) {
    callback();
    return () => {};
  }
  window.addEventListener(EVENT, callback, { once: true });
  return () => window.removeEventListener(EVENT, callback);
}
