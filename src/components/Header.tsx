import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(1,80,137,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(169,211,125,0.2)",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 3rem",
      }}
    >
      {/* Brand / Logo */}
      <img
        src={logo}
        alt="Ru & Ri Logo"
        style={{ height: "44px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      />

      {/* Desktop Nav Links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          listStyle: "none",
        }}
        className="hidden md:flex"
      >
        {[
          { label: "Home",         to: "/" },
          { label: "About Us",     to: "/about" },
          { label: "FAQ",          to: "/faq" },
          { label: "Terms",        to: "/terms" },
          { label: "Privacy",      to: "/privacy-policy" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
          >
            {link.label}
          </Link>
        ))}

        {/* CTA */}
        <Link
          to="/consultation"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            background: "#A9D37D",
            color: "#015089",
            padding: "0.5rem 1.2rem",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            textDecoration: "none",
            transition: "background 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#7AAD50")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#A9D37D")}
        >
          Consultation
        </Link>
      </nav>

      {/* Hamburger (mobile) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "0.25rem",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: "24px",
              height: "1.5px",
              background: "#FFFFFF",
              display: "block",
              transition: "transform 0.3s, opacity 0.3s",
              transform:
                menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(1,80,137,0.98)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            borderBottom: "1px solid rgba(169,211,125,0.2)",
          }}
        >
          {[
            { label: "Home",         to: "/" },
            { label: "About Us",     to: "/about" },
            { label: "FAQ",          to: "/faq" },
            { label: "Terms",        to: "/terms" },
            { label: "Privacy",      to: "/privacy-policy" },
            { label: "Consultation", to: "/consultation", cta: true },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: link.cta ? "#015089" : "rgba(255,255,255,0.85)",
                background: link.cta ? "#A9D37D" : "transparent",
                textDecoration: "none",
                fontFamily: "'Jost', sans-serif",
                fontWeight: link.cta ? 500 : 300,
                padding: link.cta ? "0.6rem 1rem" : "0",
                display: "block",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
