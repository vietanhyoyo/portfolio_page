"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current?.duration || 0);
    setDuration(seconds);
    if (progressBar.current) {
      progressBar.current.max = seconds.toString();
    }

    // Thêm sự kiện để lắng nghe khi nhạc phát hết
    const audio = audioPlayer.current;
    const handleEnded = () => {
      setIsPlaying(false); // Đặt lại trạng thái về không phát
    };
    if (audio) {
      audio.addEventListener("ended", handleEnded);
    }

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = (): void => {
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

  return (
    <>
      <div className="relative z-50 w-full pointer-events-none">
        <div className="absolute z-50 flex w-full -translate-y-1/2 justify-center">
          <div
            className={cn(
              "pointer-events-auto",
              "flex items-center gap-3 rounded-full border border-sky-100/70 bg-card/95 px-4 py-3 shadow-[0_10px_30px_rgba(14,165,233,0.18)] backdrop-blur-2xl",
              "w-[min(92vw,34rem)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,165,233,0.26)]"
            )}
          >
            <audio
              ref={audioPlayer}
              src="/audios/odoriko.mp3"
              preload="metadata"
            ></audio>
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
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
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
