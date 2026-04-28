import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Timer() {
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("timer_seconds");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [running, setRunning] = useState(() => {
    const saved = localStorage.getItem("timer_running");
    return saved === "true";
  });
  const [endTime, setEndTime] = useState(() => {
    const saved = localStorage.getItem("timer_endTime");
    return saved ? parseInt(saved, 10) : null;
  });

  const audioRef = useRef(new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"));

  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const displayTime = useMemo(
    () => `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`,
    [minutes, remainder]
  );

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("timer_seconds", seconds.toString());
  }, [seconds]);

  useEffect(() => {
    localStorage.setItem("timer_running", running.toString());
  }, [running]);

  useEffect(() => {
    if (endTime) {
      localStorage.setItem("timer_endTime", endTime.toString());
    } else {
      localStorage.removeItem("timer_endTime");
    }
  }, [endTime]);

  // Timer logic
  useEffect(() => {
    if (!running || !endTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      setSeconds(remaining);

      if (remaining === 0) {
        setRunning(false);
        setEndTime(null);
        // Trigger alarm
        audioRef.current.play();
        const msg = new SpeechSynthesisUtterance("Timer finished!");
        speechSynthesis.speak(msg);
        if (Notification.permission === "granted") {
          new Notification("⏰ Timer!", {
            body: "Time's up!",
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [running, endTime]);

  // Handle page visibility (background timer)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && running && endTime) {
        // Timer is running in background
      } else if (!document.hidden && running) {
        // Page is visible again, recalculate remaining time
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
        setSeconds(remaining);
        if (remaining === 0) {
          setRunning(false);
          setEndTime(null);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [running, endTime]);

  const startTimer = () => {
    if (seconds > 0) {
      setRunning(true);
      setEndTime(Date.now() + seconds * 1000);
    }
  };

  const pauseTimer = () => {
    setRunning(false);
    setEndTime(null);
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(0);
    setEndTime(null);
  };

  const setTimer = (newMinutes, newSeconds) => {
    const totalSeconds = newMinutes * 60 + newSeconds;
    setSeconds(totalSeconds);
    setRunning(false);
    setEndTime(null);
  };

  return (
    <motion.div
      className="page timer-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timer-display-full">
        <h2>⏳ Timer</h2>

        <div className="timer-display">
          <span className="timer-time">{displayTime}</span>
          <span className="timer-state">
            {seconds === 0 ? "Ready" : running ? "Running" : "Paused"}
          </span>
        </div>

        <div className="timer-inputs">
          <div className="input-group">
            <label>Minutes</label>
            <div className="input-controls">
              <button className="adjust-btn" onClick={() => setTimer(Math.max(0, minutes - 1), remainder)}>−</button>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setTimer(Math.max(0, Number(e.target.value)), remainder)}
              />
              <button className="adjust-btn" onClick={() => setTimer(minutes + 1, remainder)}>+</button>
            </div>
          </div>
          <div className="input-group">
            <label>Seconds</label>
            <div className="input-controls">
              <button className="adjust-btn" onClick={() => setTimer(minutes, Math.max(0, remainder - 1))}>−</button>
              <input
                type="number"
                min="0"
                max="59"
                value={remainder}
                onChange={(e) => setTimer(minutes, Math.min(59, Math.max(0, Number(e.target.value))))}
              />
              <button className="adjust-btn" onClick={() => setTimer(minutes, Math.min(59, remainder + 1))}>+</button>
            </div>
          </div>
        </div>

        <div className="timer-actions">
          <button onClick={startTimer} disabled={seconds === 0 || running}>
            Start
          </button>
          <button onClick={pauseTimer} disabled={!running}>
            Pause
          </button>
          <button onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </motion.div>
  );
}
