"use client";

import { useContext } from "react";
import voiceAgentContext from "./voiceAgentContext";

export default function useVoiceAgent() {
  const controller = useContext(voiceAgentContext);
  if (!controller) throw new Error("Voice controls must be inside VoiceAgentProvider");
  return controller;
}
