import { motion } from "framer-motion";

const zones = ["Asia/Kolkata", "America/New_York", "Europe/London"];

export default function Timezone() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h2>🌍 Timezones</h2>
        {zones.map((zone) => (
          <p key={zone}>
            {zone}: {new Date().toLocaleTimeString("en-US", { timeZone: zone })}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
