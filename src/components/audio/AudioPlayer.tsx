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
  const [showPlayButton, setShowPlayButton] = useState<boolean>(true);

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
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${(Number(progressBar.current.value) / duration) * 100}%`
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

  const startPlaying = (): void => {
    setShowPlayButton(false);
    if (!isPlaying) {
      setIsPlaying(true);
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  return (
    <>
      <div
        onClick={startPlaying}
        style={{ display: showPlayButton ? "block" : "none" }}
        className="top-0 fixed left-0 transform bg-primary/0 w-full h-screen"
      ></div>
      <div className="relative w-full">
        <div className="absolute w-full flex justify-center -translate-y-1/2">
          <div
            className={cn(
              "flex items-center bg-card/90 p-2 rounded-full shadow-md gap-4 w-80 md:w-96 backdrop-blur-2xl",
              "border-2 border-slate-200/10",
              "transition-all duration-300 hover:shadow-[0_2px_10px_rgba(14,165,233,0.6)] hover:shadow-sky-500/50"
            )}
          >
            <audio
              ref={audioPlayer}
              src="/audios/cupid.mp3"
              preload="metadata"
            ></audio>
            <button
              onClick={togglePlayPause}
              className="bg-primary text-white p-2 rounded-full hover:bg-primary/90"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="w-full relative">
              <input
                type="range"
                ref={progressBar}
                defaultValue="0"
                onChange={changeRange}
                className="w-full appearance-none bg-gray-300 h-1 mb-3 rounded-full outline-none"
                style={
                  {
                    "--progress-bar-color": "#0ea5e9",
                    background: `linear-gradient(to right, var(--progress-bar-color) 0%, var(--progress-bar-color) ${
                      (currentTime / duration) * 100
                    }%, #CBD5E0 ${
                      (currentTime / duration) * 100
                    }%, #CBD5E0 100%)`,
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="relative flex items-center">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className=" text-slate-800 mr-2 dark:text-white"
              >
                <Volume2 size={20} />
              </button>
              {showVolumeSlider && (
                <div className="absolute bottom-full mb-2 w-6 bg-card p-1 translate-x-1 rounded shadow-lg">
                  <input
                    type="range"
                    step="0.01"
                    onChange={changeVolume}
                    value={volume}
                    min="0"
                    max="1"
                    className="volume-slider-vertical"
                    style={
                      {
                        "--progress-bar-color": "#0ea5e9",
                        writingMode: "vertical-lr",
                        transform: "rotate(180deg)",
                      } as React.CSSProperties
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
