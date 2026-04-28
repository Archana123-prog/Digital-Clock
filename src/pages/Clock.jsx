import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [is12h, setIs12h] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: is12h,
    });
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h1>{formatTime()}</h1>
        <p>{time.toDateString()}</p>
        <button onClick={() => setIs12h(!is12h)}>
          Toggle {is12h ? "24h" : "12h"}
        </button>
      </div>
    </motion.div>
  );
}
