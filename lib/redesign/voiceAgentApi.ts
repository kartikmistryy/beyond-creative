type VoiceAgentApi = {
  init: (element: Element) => unknown;
  unmount: (element: Element) => void;
};

declare global {
  interface Window {
    ChatWidgetEmbed?: VoiceAgentApi;
  }
}

export default VoiceAgentApi;
