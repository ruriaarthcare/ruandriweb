import { Link } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      {/* ── Main footer body ── */}
      <div
        style={{
          background: "#1A2F40",
          padding: "4rem 3rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: "3rem",
        }}
        className="flex-col md:grid"
      >
        {/* Brand column */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "2rem",
              color: "#A9D37D",
              fontWeight: 300,
              marginBottom: "0.5rem",
            }}
          >
            ru &amp; ri
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.85,
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            mindfully crafted, soulfully yours.
            <br />
            Hormonal wellness · Skincare · Haircare
          </div>
          <a
            href="https://www.ruandricare.com"
            style={{ fontSize: "0.95rem", color: "#FFFFFF", display: "block", marginBottom: "0.4rem", textDecoration: "none" }}
          >
            www.ruandricare.com
          </a>
          <a
            href="mailto:support@ruandricare.com"
            style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", display: "block", textDecoration: "none", transition: "color 0.25s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            support@ruandricare.com
          </a>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "1.2rem", marginTop: "1.5rem" }}>
            {[
              { href: "https://www.instagram.com/ruandricare/", icon: <FaInstagram size={18} />, label: "Instagram" },
              { href: "https://wa.me/919082098456",             icon: <FaWhatsapp  size={18} />, label: "WhatsApp" },
              { href: "https://www.facebook.com/profile.php?id=61579795116727", icon: <FaFacebook size={18} />, label: "Facebook" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore column */}
        <div>
          <div
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#A9D37D",
              marginBottom: "1.2rem",
              fontWeight: 400,
            }}
          >
            Explore
          </div>
          {[
            { label: "Home",             to: "/" },
            { label: "About Us",         to: "/about" },
            { label: "FAQ",              to: "/faq" },
            { label: "Terms & Conditions", to: "/terms" },
            { label: "Privacy & Refund Policy", to: "/privacy-policy" },
            { label: "Feedback",         to: "/feedback" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                display: "block",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                marginBottom: "0.65rem",
                lineHeight: 1.6,
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {link.label}
            </Link>
          ))}
          {/* Hidden admin link */}
          <Link
            to="/admin"
            style={{
              display: "block",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.15)",
              textDecoration: "none",
              marginTop: "0.5rem",
            }}
          >
            ·
          </Link>
        </div>

        {/* Get Started column */}
        <div>
          <div
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#A9D37D",
              marginBottom: "1.2rem",
              fontWeight: 400,
            }}
          >
            Get Started
          </div>
          {[
            { label: "Start Consultation",    to: "/consultation" },
            { label: "Monthly Subscription",  to: "/subscription" },
            { label: "Book a Zoom Slot",      to: "/booking" },
            { label: "Contact Our Team",      to: "mailto:support@ruandricare.com", external: true },
          ].map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  marginBottom: "0.65rem",
                  lineHeight: 1.6,
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  marginBottom: "0.65rem",
                  lineHeight: 1.6,
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#A9D37D")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div
        style={{
          background: "#015089",
          padding: "1.2rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(169,211,125,0.15)",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          © {new Date().getFullYear()} <span style={{ color: "#A9D37D" }}>ru &amp; ri</span>. All rights reserved. Mindfully crafted, soulfully yours.
        </span>
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span style={{ color: "#A9D37D" }}>www.ruandricare.com</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
