"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type VoiceAgentApi from "./voiceAgentApi";

export default function useVoiceAgentController(host: RefObject<HTMLDivElement | null>) {
  const initialized = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  function fail() {
    setStatus("error");
  }
  function initialize() {
    if (!host.current || initialized.current) return;
    const api: VoiceAgentApi | undefined = window.ChatWidgetEmbed;
    if (!api) {
      fail();
      return;
    }
    initialized.current = true;
    try {
      api.init(host.current);
    } catch {
      fail();
    }
  }

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    function sync() {
      const launcher = element?.querySelector<HTMLElement>('[aria-label="Open chat"]');
      const close = element?.querySelector<HTMLElement>('[aria-label="Close chat"]');
      if (launcher || close) setStatus("ready");
    }
    const observer = new MutationObserver(sync);
    observer.observe(element, { childList: true, subtree: true, attributes: true });
    const timeout = setTimeout(
      () => setStatus((current) => (current === "loading" ? "error" : current)),
      15000,
    );
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      element.querySelector<HTMLElement>('[aria-label="Close chat"]')?.click();
      queueMicrotask(() => window.ChatWidgetEmbed?.unmount(element));
    };
  }, [host]);

  function open() {
    host.current?.querySelector<HTMLElement>('[aria-label="Open chat"]')?.click();
  }
  return { status, open, initialize, fail };
}
