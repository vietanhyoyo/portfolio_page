"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";

const tracks = [
  { file: "cupid.mp3", label: "Cupid" },
  { file: "odoriko.mp3", label: "Odoriko" },
  { file: "thang_dien.mp3", label: "Thang Dien" },
];

const AudioPlayer: React.FC = () => {
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
    };
  }, []);

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
        await audio.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } catch {
        setIsPlaying(false);
      }
    };

    void startSelectedTrack();
  }, [currentTrack, volume]);

  const togglePlayPause = (): void => {
    if (!currentTrack) return;

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
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
          <div
            className={cn(
              "pointer-events-auto",
              "relative flex items-center gap-3 rounded-full border border-sky-100/70 bg-card/95 px-4 py-3 shadow-[0_10px_30px_rgba(14,165,233,0.18)] backdrop-blur-2xl",
              "w-[min(92vw,34rem)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.26)]"
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
                <div className="absolute bottom-full left-0 z-50 mb-3 w-52 overflow-hidden rounded-2xl border border-sky-200 bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.24)]">
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
                              ? "bg-sky-50 font-semibold text-primary"
                              : "text-slate-700 hover:bg-slate-50"
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
                  className="absolute bottom-full right-0 z-50 mb-3 w-40 rounded-2xl border border-sky-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.24)]"
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <div className="flex items-center gap-3">
                    <Volume2 size={18} className="shrink-0 text-primary" />
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
          border: 3px solid #ffffff;
          background: #0ea5e9;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.35);
        }

        .player-slider::-moz-range-thumb {
          height: 22px;
          width: 14px;
          border-radius: 9999px;
          border: 3px solid #ffffff;
          background: #0ea5e9;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.35);
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
