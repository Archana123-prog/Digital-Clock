import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const displayTime = useMemo(
    () => `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`,
    [minutes, remainder]
  );

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [running, seconds]);

  useEffect(() => {
    if (running && seconds === 0) {
      setRunning(false);
    }
  }, [running, seconds]);

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h2>⏳ Timer</h2>

        <div className="timer-display">
          <span>{displayTime}</span>
          <span className="timer-state">
            {seconds === 0 ? "Ready" : running ? "Running" : "Paused"}
          </span>
        </div>

        <div className="timer-inputs">
          <label>
            Minutes
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setSeconds(Math.max(0, Number(e.target.value)) * 60 + remainder)}
            />
          </label>
          <label>
            Seconds
            <input
              type="number"
              min="0"
              max="59"
              value={remainder}
              onChange={(e) => setSeconds(minutes * 60 + Math.min(59, Math.max(0, Number(e.target.value))))}
            />
          </label>
        </div>

        <div className="timer-actions">
          <button onClick={() => setRunning(true)} disabled={seconds === 0 || running}>
            Start
          </button>
          <button onClick={() => setRunning(false)} disabled={!running}>
            Pause
          </button>
          <button
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
