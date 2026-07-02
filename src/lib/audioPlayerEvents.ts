export const AUDIO_CONTROL_EVENT = "portfolio-audio-control";
export const AUDIO_STATE_EVENT = "portfolio-audio-state";
export const AUDIO_STATE_REQUEST_EVENT = "portfolio-audio-state-request";

export type AudioControlDetail = {
  action: "toggle" | "play" | "pause";
};

export type AudioStateDetail = {
  isPlaying: boolean;
};
