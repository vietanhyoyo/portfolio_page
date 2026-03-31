import "server-only";

import { readdir } from "fs/promises";
import path from "path";

import type { AudioTrack } from "@/types/audio";

const AUDIO_DIRECTORY = path.join(process.cwd(), "public", "audios");

const formatTrackLabel = (fileName: string): string =>
  fileName
    .replace(/\.[^/.]+$/, "")
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const getAudioTracks = async (): Promise<AudioTrack[]> => {
  const files = await readdir(AUDIO_DIRECTORY);

  return files
    .filter((file) => file.toLowerCase().endsWith(".mp3"))
    .sort((left, right) => left.localeCompare(right))
    .map((file) => ({
      file,
      label: formatTrackLabel(file),
    }));
};
