"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, ListMusic } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { AudioTrack } from "@/types/audio";

type AudioPlayerProps = {
  tracks: AudioTrack[];
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ tracks }) => {
  const { resolvedTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<(typeof tracks)[number] | null>(
    tracks[0] ?? null
  );

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();
  const hasMountedTrackRef = useRef(false);
  const visualizerCanvasRef = useRef<HTMLCanvasElement>(null);
  const visualizerFrameRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio || !currentTrack) return;

    const syncMetadata = () => {
      const seconds = Math.floor(audio.duration || 0);
      setDuration(seconds);
      setCurrentTime(audio.currentTime || 0);
      if (progressBar.current) {
        progressBar.current.max = seconds.toString();
        progressBar.current.value = audio.currentTime.toString();
      }
      changePlayerCurrentTime();
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.addEventListener("loadedmetadata", syncMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", syncMetadata);
      audio.removeEventListener("ended", handleEnded);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (visualizerFrameRef.current) {
        cancelAnimationFrame(visualizerFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || (window as typeof window & {
      webkitAudioContext?: typeof AudioContext;
    }).webkitAudioContext;

    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    if (!sourceNodeRef.current) {
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audio);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.82;

      sourceNodeRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const barCount = 18;
    const gap = 4;
    const barWidth = (width - gap * (barCount - 1)) / barCount;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const idlePattern = [10, 16, 13, 20, 14, 24, 12, 18, 15, 22, 11, 17];
    const baseColor = "#248fff";
    const glowColor = resolvedTheme === "dark"
      ? "rgba(36, 143, 255, 0.3)"
      : "rgba(36, 143, 255, 0.2)";
    const topColor = resolvedTheme === "dark" ? "#f8fafc" : "#ffffff";
    const midColor = resolvedTheme === "dark" ? "#7ab8ff" : "#5fa7ff";

    const drawVisualizer = () => {
      context.clearRect(0, 0, width, height);

      if (isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      for (let index = 0; index < barCount; index += 1) {
        const x = index * (barWidth + gap);
        const sampleIndex = Math.min(
          bufferLength - 1,
          Math.floor((index / barCount) * bufferLength * 0.9)
        );
        const sample = dataArray[sampleIndex] ?? 0;
        const idleHeight = idlePattern[index % idlePattern.length];
        const animatedHeight = isPlaying
          ? Math.max(10, (sample / 255) * (height - 6))
          : idleHeight;
        const barHeight = Math.min(height - 4, animatedHeight);
        const y = height - barHeight;
        const radius = Math.min(8, barWidth / 2);

        const gradient = context.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, topColor);
        gradient.addColorStop(0.35, midColor);
        gradient.addColorStop(1, baseColor);

        context.fillStyle = gradient;
        context.shadowColor = glowColor;
        context.shadowBlur = isPlaying ? 18 : 8;
        context.beginPath();
        context.roundRect(x, y, barWidth, barHeight, radius);
        context.fill();
      }

      context.shadowBlur = 0;
      visualizerFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    if (visualizerFrameRef.current) {
      cancelAnimationFrame(visualizerFrameRef.current);
    }

    drawVisualizer();

    return () => {
      if (visualizerFrameRef.current) {
        cancelAnimationFrame(visualizerFrameRef.current);
      }
    };
  }, [currentTrack, isPlaying, resolvedTheme]);

  useEffect(() => {
    const audio = audioPlayer.current;
    if (!audio) return;

    if (!hasMountedTrackRef.current) {
      hasMountedTrackRef.current = true;
      return;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;
    audio.load();

    if (progressBar.current) {
      progressBar.current.value = "0";
      progressBar.current.max = "0";
      progressBar.current.style.setProperty("--seek-before-width", "0%");
    }

    const startSelectedTrack = async () => {
      try {
        await audioContextRef.current?.resume();
        await audio.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } catch {
        setIsPlaying(false);
      }
    };

    void startSelectedTrack();
  }, [currentTrack]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = (): void => {
    if (!currentTrack) return;

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      void audioContextRef.current?.resume();
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const playSelectedTrack = async (trackFile: string): Promise<void> => {
    const nextTrack = tracks.find((track) => track.file === trackFile);
    if (!nextTrack) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setCurrentTime(0);
    setDuration(0);
    setShowPlaylist(false);
    setIsPlaying(true);

    if (nextTrack.file === currentTrack?.file) {
      const audio = audioPlayer.current;
      if (!audio) return;

      audio.currentTime = 0;
      void audioContextRef.current?.resume();
      void audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      setCurrentTrack(nextTrack);
    }
  };

  const whilePlaying = (): void => {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime.toString();
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = (): void => {
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.currentTime = Number(progressBar.current.value);
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = (): void => {
    if (progressBar.current) {
      const percentage = duration > 0
        ? (Number(progressBar.current.value) / duration) * 100
        : 0;
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${percentage}%`
      );
      setCurrentTime(Number(progressBar.current.value));
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioPlayer.current) {
      audioPlayer.current.volume = newVolume;
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <div className="relative z-10 w-full pointer-events-none">
        <div className="absolute z-20 flex w-full -translate-y-1/2 justify-center">
          <div className="relative pointer-events-auto flex w-[min(92vw,34rem)] items-center justify-center">
            <canvas
              ref={visualizerCanvasRef}
              className={cn(
                "absolute bottom-full mb-3 h-[72px] w-1/3 min-w-[140px] max-w-[220px] transition-all duration-300",
                isPlaying ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                "relative flex items-center gap-3 rounded-full border border-sky-100/70 bg-card/95 px-4 py-3 shadow-[0_10px_30px_rgba(14,165,233,0.18)] backdrop-blur-2xl",
                "w-full transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.26)]"
              )}
            >
            <audio
              ref={audioPlayer}
              src={`/audios/${currentTrack.file}`}
              preload="metadata"
            ></audio>
            <div className="relative flex shrink-0 items-center">
              <button
                onClick={() => {
                  setShowPlaylist((prev) => !prev);
                  setShowVolumeSlider(false);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition hover:bg-sky-50 hover:text-primary dark:text-white dark:hover:bg-slate-800"
                aria-label="Open playlist"
              >
                <ListMusic size={22} />
              </button>
              {showPlaylist && (
                <div className="absolute bottom-full left-0 z-50 mb-3 w-52 overflow-hidden rounded-2xl border border-sky-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.24)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(2,6,23,0.55)]">
                  <div className="max-h-64 overflow-y-auto">
                    {tracks.map((track) => {
                      const active = track.file === currentTrack.file;
                      return (
                        <button
                          key={track.file}
                          onClick={() => void playSelectedTrack(track.file)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition",
                            active
                              ? "bg-sky-50 font-semibold text-primary dark:bg-sky-500/15 dark:text-sky-300"
                              : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800/80"
                          )}
                        >
                          <span className="truncate">{track.label}</span>
                          {active && (
                            <Play
                              size={14}
                              className="ml-3 shrink-0 fill-current"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={togglePlayPause}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_18px_rgba(14,165,233,0.35)] transition hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
            </button>
            <div className="relative flex flex-1 items-center">
              <input
                type="range"
                ref={progressBar}
                defaultValue="0"
                onChange={changeRange}
                className="player-slider player-progress my-0 h-10 w-full cursor-pointer appearance-none bg-transparent align-middle"
                style={
                  {
                    "--progress-bar-color": "#0ea5e9",
                    background: duration > 0
                      ? `linear-gradient(to right, var(--progress-bar-color) 0%, var(--progress-bar-color) ${
                          (currentTime / duration) * 100
                        }%, #D7E3F1 ${
                          (currentTime / duration) * 100
                        }%, #D7E3F1 100%)`
                      : "#D7E3F1",
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="relative flex shrink-0 items-center">
              <button
                onClick={() => {
                  setShowVolumeSlider((prev) => !prev);
                  setShowPlaylist(false);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition hover:bg-sky-50 hover:text-primary dark:text-white dark:hover:bg-slate-800"
                aria-label="Toggle volume"
              >
                <Volume2 size={22} />
              </button>
              {showVolumeSlider && (
                <div
                  className="absolute bottom-full right-0 z-50 mb-3 w-40 rounded-2xl border border-sky-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.24)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_18px_45px_rgba(2,6,23,0.55)]"
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <div className="flex items-center gap-3">
                    <Volume2
                      size={18}
                      className="shrink-0 text-primary dark:text-sky-300"
                    />
                    <input
                      type="range"
                      step="0.01"
                      onChange={changeVolume}
                      value={volume}
                      min="0"
                      max="1"
                      className="player-slider h-10 w-full cursor-pointer appearance-none bg-transparent"
                      style={
                        {
                          "--progress-bar-color": "#0ea5e9",
                          background: `linear-gradient(to right, var(--progress-bar-color) 0%, var(--progress-bar-color) ${
                            volume * 100
                          }%, #D7E3F1 ${volume * 100}%, #D7E3F1 100%)`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .player-slider {
          border-radius: 9999px;
          background-repeat: no-repeat;
        }

        .player-slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 9999px;
          background: transparent;
        }

        .player-slider::-moz-range-track {
          height: 8px;
          border-radius: 9999px;
          background: transparent;
        }

        .player-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          margin-top: -7px;
          height: 22px;
          width: 14px;
          border-radius: 9999px;
          border: 3px solid transparent;
          background: transparent;
          box-shadow: none;
          opacity: 0;
        }

        .player-slider::-moz-range-thumb {
          height: 22px;
          width: 14px;
          border-radius: 9999px;
          border: 3px solid transparent;
          background: transparent;
          box-shadow: none;
          opacity: 0;
        }

        .player-progress::-webkit-slider-thumb {
          height: 22px;
          width: 14px;
        }

        .player-progress::-moz-range-thumb {
          height: 22px;
          width: 14px;
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;
