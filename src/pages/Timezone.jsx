import { motion } from "framer-motion";

const zones = ["Asia/Kolkata", "America/New_York", "Europe/London"];

export default function Timezone() {
  return (
    <motion.div
      className="page timezone-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="timezone-display">
        <h2>🌍 Timezones</h2>
        <div className="timezone-list">
          {zones.map((zone) => (
            <div key={zone} className="timezone-item">
              <span className="timezone-name">{zone.replace('_', ' ').replace('/', ' - ')}</span>
              <span className="timezone-time">
                {new Date().toLocaleTimeString("en-US", { timeZone: zone })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
