import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Clock from "./pages/Clock";
import Alarm from "./pages/Alarm";
import Timer from "./pages/Timer";
import Timezone from "./pages/Timezone";

export default function App() {
  const [alarms, setAlarms] = useState(() => {
    const saved = localStorage.getItem("alarms");
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef(
    new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg")
  );

  // Save alarms
  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  function triggerAlarm() {
    audioRef.current.play();

    const msg = new SpeechSynthesisUtterance("Wake up!");
    speechSynthesis.speak(msg);

    if (Notification.permission === "granted") {
      new Notification("⏰ Alarm!", {
        body: "Wake up!",
      });
    }
  }

  // Alarm checker (runs globally)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5);

      alarms.forEach((alarm) => {
        if (alarm.time === current) {
          triggerAlarm();
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Clock />} />
        <Route
          path="/alarm"
           element={<Alarm alarms={alarms} setAlarms={setAlarms} audioRef={audioRef} />}
        />
        <Route path="/timer" element={<Timer />} />
        <Route path="/timezone" element={<Timezone />} />
      </Routes>
    </BrowserRouter>
  );
}
