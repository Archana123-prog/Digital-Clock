import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/">Return to Clock</Link>
      </div>
    </motion.div>
  );
}
