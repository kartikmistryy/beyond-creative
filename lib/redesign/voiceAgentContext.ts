"use client";

import { createContext } from "react";
import type useVoiceAgentController from "./useVoiceAgentController";

type VoiceControls = Pick<
  ReturnType<typeof useVoiceAgentController>,
  "status" | "open"
>;
const voiceAgentContext = createContext<VoiceControls | null>(null);
export default voiceAgentContext;
