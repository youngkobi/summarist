"use client";

import { useEffect, useState } from "react";

export default function AudioDurationRecs({ audioLink }) {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (!audioLink) return;

    const audio = new Audio(audioLink);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    // Cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.src = ""; // Stop loading
    };
  }, [audioLink]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  return <span>{duration ? formatTime(duration) : "Loading..."}</span>;
}
