"use client";

import { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ audioLink, title, author, image }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Update duration when metadata loads
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    // Update current time and progress during playback
    const onTimeUpdate = () => {
      setElapsed(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    // When audio ends
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(100);
      setElapsed(duration);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [duration]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const rewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10
    );
  };

  const forward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      audioRef.current.duration,
      audioRef.current.currentTime + 10
    );
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percentage = clickX / width;
    const seekTime = duration * percentage;

    audioRef.current.currentTime = seekTime;
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${m}:${s}`;
  };

 const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: "50px", height: "50px" }}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ width: "50px", height: "50px" }}
  >
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

const RewindIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    style={{ width: "32px", height: "32px" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
    />
  </svg>
);

const ForwardIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    style={{ width: "32px", height: "32px" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
    />
  </svg>
);


  return (
    <div className="audio-player">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioLink} preload="metadata" />

      {/* Left Section: Image + Info */}
      <div className="audio-left">
        <img src={image} alt="cover" className="audio-cover" />
        <div>
          <div className="audio-title">{title}</div>
          <div className="audio-author">{author}</div>
        </div>
      </div>

      {/* Middle Section: Controls */}
      <div className="audio-center">
        <button onClick={rewind} className="control-btn" aria-label="Rewind">
        <RewindIcon />
        </button>

        <button
          onClick={togglePlay}
          className="control-btn"
          aria-label="Play/Pause"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button onClick={forward} className="control-btn" aria-label="Forward">
          <ForwardIcon />
        </button>
      </div>

      {/* Right Section: Time + Progress */}
      <div className="audio-right">
        <div className="audio-timestamp-row">
          <span className="audio-time">{formatTime(elapsed)}</span>
          <div
            className="audio-progress-bar"
            onClick={handleSeek}
            ref={progressBarRef}
          >
            <div className="audio-progress" style={{ width: `${progress}%` }} />
          </div>
          <span className="audio-time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
