"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AUDIO_CONTROL_EVENT,
  AUDIO_STATE_EVENT,
  AUDIO_STATE_REQUEST_EVENT,
  type AudioStateDetail,
} from "@/lib/audioPlayerEvents";

const AudioToggle = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    const handleAudioState = (event: Event) => {
      const { isPlaying } = (event as CustomEvent<AudioStateDetail>).detail;
      setIsAudioPlaying(isPlaying);
    };

    window.addEventListener(AUDIO_STATE_EVENT, handleAudioState);
    window.dispatchEvent(new Event(AUDIO_STATE_REQUEST_EVENT));

    return () => {
      window.removeEventListener(AUDIO_STATE_EVENT, handleAudioState);
    };
  }, []);

  const toggleAudio = () => {
    window.dispatchEvent(
      new CustomEvent(AUDIO_CONTROL_EVENT, {
        detail: { action: "toggle" },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={cn(
        "w-12 h-12 flex justify-center place-items-center backdrop-blur-lg",
        "bg-white/50 dark:bg-slate-100/15 rounded-full",
        "dark:border-gray-600 p-2",
        "uppercase leading-normal dark:text-white text-slate-700",
        "transition duration-150 ease-in-out",
        "hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]",
        "focus:ring-4 dark:focus:ring-primary-600 focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none",
        "active:bg-primary-700",
        "shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      )}
      aria-label={isAudioPlaying ? "Pause music" : "Play music"}
    >
      {isAudioPlaying ? (
        <Volume2 className="stroke-primary h-[24px] w-[24px] transition-all dark:stroke-white" />
      ) : (
        <VolumeX className="stroke-primary h-[24px] w-[24px] transition-all dark:stroke-white" />
      )}
    </button>
  );
};

export default AudioToggle;
