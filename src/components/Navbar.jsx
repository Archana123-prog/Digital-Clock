import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Clock" },
  { to: "/alarm", label: "Alarm" },
  { to: "/timer", label: "Timer" },
  { to: "/timezone", label: "Timezone" },
];

export default function Navbar() {
  return (
    <nav className="nav">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
