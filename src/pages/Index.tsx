import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoText from "@/assets/logo.png";
import "./homepage.css";

const Index = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  // ── Secret admin access: click "ru & ri" in footer 5× within 3s ──
  const secretClickCount = useRef(0);
  const secretTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSecretClick = () => {
    secretClickCount.current += 1;
    if (secretTimer.current) clearTimeout(secretTimer.current);
    if (secretClickCount.current >= 5) {
      secretClickCount.current = 0;
      navigate("/admin");
      return;
    }
    secretTimer.current = setTimeout(() => {
      secretClickCount.current = 0;
    }, 3000);
  };

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hp-visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".hp-reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToConsultation = (type: "skin" | "hair") => {
    navigate("/consultation", { state: { type } });
  };

  return (
    <div className="hp-root">
      {/* ── NAV ── */}
      <nav className="hp-nav">
        <a href="#hp-home" className="hp-nav-brand" onClick={(e) => { e.preventDefault(); scrollTo("hp-home"); }}
          style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}
        >
          <img
            src={logoText}
            alt="ru & ri logo"
            style={{ height: "36px", width: "auto", objectFit: "contain" }}
          />
          ru <span>&amp;</span> ri
        </a>
        <ul className="hp-nav-links">
          <li><a href="#hp-home"     onClick={(e) => { e.preventDefault(); scrollTo("hp-home"); }}>Home</a></li>
          <li><a href="#hp-how"      onClick={(e) => { e.preventDefault(); scrollTo("hp-how"); }}>About Us</a></li>
          <li><a href="#hp-questionnaire" onClick={(e) => { e.preventDefault(); scrollTo("hp-questionnaire"); }}>Skincare &amp; Haircare</a></li>
          <li><a href="#hp-brands"   onClick={(e) => { e.preventDefault(); scrollTo("hp-brands"); }}>Our Brands</a></li>
          <li><a href="#hp-why"      onClick={(e) => { e.preventDefault(); scrollTo("hp-why"); }}>Why Us</a></li>
          <li><a href="#hp-consultation" className="hp-nav-cta" onClick={(e) => { e.preventDefault(); scrollTo("hp-consultation"); }}>Consultation</a></li>
          <li><a href="#hp-contact"  onClick={(e) => { e.preventDefault(); scrollTo("hp-contact"); }}>Contact</a></li>
        </ul>
        <button className="hp-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>

        {menuOpen && (
          <div className="hp-mobile-menu">
            <a href="#hp-home"          onClick={(e) => { e.preventDefault(); scrollTo("hp-home"); }}>Home</a>
            <a href="#hp-how"           onClick={(e) => { e.preventDefault(); scrollTo("hp-how"); }}>About Us</a>
            <a href="#hp-questionnaire" onClick={(e) => { e.preventDefault(); scrollTo("hp-questionnaire"); }}>Skincare &amp; Haircare</a>
            <a href="#hp-brands"        onClick={(e) => { e.preventDefault(); scrollTo("hp-brands"); }}>Our Brands</a>
            <a href="#hp-why"           onClick={(e) => { e.preventDefault(); scrollTo("hp-why"); }}>Why Us</a>
            <a href="#hp-consultation"  className="hp-nav-cta" onClick={(e) => { e.preventDefault(); scrollTo("hp-consultation"); }}>Consultation</a>
            <a href="#hp-contact"       onClick={(e) => { e.preventDefault(); scrollTo("hp-contact"); }}>Contact</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hp-home" className="hp-hero">
        <div className="hp-hero-circle" />
        <div className="hp-hero-circle" />
        <div className="hp-hero-circle" />
        <div className="hp-hero-content">
          <div className="hp-hero-eyebrow">
            <div className="hp-hero-dot" />
            <span className="hp-hero-eyebrow-text">Hormonal Wellness · Skincare · Haircare · Nutrition</span>
          </div>
          <h1 className="hp-hero-headline">
            Your skin &amp; hair begin<br />with <em>hormonal balance.</em>
          </h1>
          <p className="hp-hero-body">
            Most skin and hair concerns start from within. At ru and ri, we identify the root cause through expert consultation, curate the right products from trusted brands, and deliver them to your door — every month.
          </p>
          <div className="hp-hero-actions">
            <a href="#hp-questionnaire" className="hp-btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("hp-questionnaire"); }}>
              Start Your Questionnaire
            </a>
            <a href="#hp-how" className="hp-btn-outline" onClick={(e) => { e.preventDefault(); scrollTo("hp-how"); }}>
              How It Works
            </a>
          </div>
          <div className="hp-hero-stats">
            <div>
              <div className="hp-hero-stat-num">100%</div>
              <div className="hp-hero-stat-label">Personalised boxes</div>
            </div>
            <div>
              <div className="hp-hero-stat-num">Expert</div>
              <div className="hp-hero-stat-label">Zoom consultations</div>
            </div>
            <div>
              <div className="hp-hero-stat-num">Monthly</div>
              <div className="hp-hero-stat-label">Doorstep delivery</div>
            </div>
            <div>
              <div className="hp-hero-stat-num">Free</div>
              <div className="hp-hero-stat-label">Follow-ups included</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="hp-how" className="hp-how">
        <div className="hp-reveal">
          <div className="hp-section-label">How It Works</div>
          <h2 className="hp-section-title">Five steps to <em>balanced</em> skin &amp; hair</h2>
          <p className="hp-section-sub">We go beyond products. Our process starts with understanding your hormonal health — then curates the right subscription box, just for you.</p>
        </div>

        <div className="hp-how-grid hp-reveal">
          <div className="hp-how-step">
            <div className="hp-how-step-num">01</div>
            <div className="hp-how-step-icon">
              <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            </div>
            <div className="hp-how-step-title">Fill the Questionnaire</div>
            <div className="hp-how-step-body">Choose your concern — skin or hair — and fill a short questionnaire on our website. It helps us understand your needs in detail before your consultation.</div>
            <span className="hp-how-step-tag">On the website</span>
          </div>

          <div className="hp-how-step">
            <div className="hp-how-step-num">02</div>
            <div className="hp-how-step-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div className="hp-how-step-title">Book Your Zoom Call</div>
            <div className="hp-how-step-body">After submitting, book your preferred Zoom consultation slot directly on the website. Our expert team reviews your questionnaire before the call.</div>
            <span className="hp-how-step-tag">Free to book</span>
          </div>

          <div className="hp-how-step">
            <div className="hp-how-step-num">03</div>
            <div className="hp-how-step-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div className="hp-how-step-title">Expert Consultation</div>
            <div className="hp-how-step-body">A 1-on-1 Zoom session with our expert team. We assess your hormonal health, lifestyle, and concerns in depth to build the right plan for you.</div>
            <span className="hp-how-step-tag">1-on-1 Zoom</span>
          </div>

          <div className="hp-how-step">
            <div className="hp-how-step-num">04</div>
            <div className="hp-how-step-icon">
              <svg viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8v4h8V3z"/></svg>
            </div>
            <div className="hp-how-step-title">Curated Subscription Box</div>
            <div className="hp-how-step-body">Based on your consultation, we handpick products from trusted brands — Cosderma, VRH Health Science, Elume.in, Cosmo Safe &amp; more — and pack your monthly box.</div>
            <span className="hp-how-step-tag">Multi-brand curation</span>
          </div>

          <div className="hp-how-step">
            <div className="hp-how-step-num">05</div>
            <div className="hp-how-step-icon">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <div className="hp-how-step-title">Delivered &amp; Followed Up</div>
            <div className="hp-how-step-body">Your box arrives at your door monthly. We regularly follow up to track your progress, answer questions, and refine your package as your skin and hair evolve.</div>
            <span className="hp-how-step-tag">Monthly + follow-ups</span>
          </div>
        </div>
      </section>

      {/* ── QUESTIONNAIRE ── */}
      <section id="hp-questionnaire" className="hp-questionnaire">
        <div className="hp-q-intro hp-reveal">
          <div>
            <div className="hp-section-label">Get Started</div>
            <h2 className="hp-section-title">Tell us your concern.<br /><em>We'll do the rest.</em></h2>
          </div>
          <div>
            <p className="hp-q-intro-body">Not sure where to start? Simply choose whether your primary concern is skin or hair. Fill the questionnaire, book your Zoom slot, and let our expert team take it from there — curating the right products from trusted brands, matched entirely to your answers.</p>
            <div className="hp-q-intro-note">
              <strong>Every subscription box is different.</strong> No two customers receive the same package — because no two people have the same concerns, hormonal profile, or skin and hair type.
            </div>
          </div>
        </div>

        <div className="hp-q-paths hp-reveal">
          {/* SKINCARE PATH */}
          <div className="hp-q-path">
            <div className="hp-q-path-label">Path 01 — Skincare</div>
            <div className="hp-q-path-title">Skin<br />Questionnaire</div>
            <div className="hp-q-path-body">Fill our skin-focused questionnaire to help us understand your skin type, concerns, hormonal history, and current routine. Our team will use this to curate your personalised skincare subscription box.</div>
            <div className="hp-q-fields">
              <div className="hp-q-field">Skin type &amp; texture concerns</div>
              <div className="hp-q-field">Acne, pigmentation &amp; sensitivity</div>
              <div className="hp-q-field">Hormonal &amp; lifestyle history</div>
              <div className="hp-q-field">Current skincare routine</div>
              <div className="hp-q-field">Goals &amp; product preferences</div>
            </div>
            <button className="hp-q-btn" onClick={() => goToConsultation("skin")}>
              Start Skin Questionnaire →
            </button>
          </div>

          {/* HAIRCARE PATH */}
          <div className="hp-q-path hair">
            <div className="hp-q-path-label">Path 02 — Haircare</div>
            <div className="hp-q-path-title">Hair<br />Questionnaire</div>
            <div className="hp-q-path-body">Fill our hair-focused questionnaire to help us understand your hair type, scalp health, concerns, and hormonal background. We'll curate the right haircare subscription box for your needs.</div>
            <div className="hp-q-fields">
              <div className="hp-q-field">Hair type, texture &amp; scalp health</div>
              <div className="hp-q-field">Hair fall, thinning &amp; density</div>
              <div className="hp-q-field">Hormonal &amp; nutritional history</div>
              <div className="hp-q-field">Current haircare routine</div>
              <div className="hp-q-field">Goals &amp; concerns</div>
            </div>
            <button className="hp-q-btn" onClick={() => goToConsultation("hair")}>
              Start Hair Questionnaire →
            </button>
          </div>
        </div>
      </section>

      {/* ── OUR BRANDS ── */}
      <section id="hp-brands" className="hp-brands">
        <div className="hp-reveal">
          <div className="hp-section-label">Trusted Brands</div>
          <h2 className="hp-section-title">Products from brands <em>we trust</em></h2>
          <p className="hp-section-sub">We are brand-agnostic. We handpick products from established, trusted brands based solely on what's right for your concern — nothing more, nothing less.</p>
        </div>

        <div className="hp-brands-grid hp-reveal">
          <div className="hp-brand-card">
            <div className="hp-brand-card-tag">Skincare · Haircare</div>
            <div className="hp-brand-card-name">Cosderma</div>
            <div className="hp-brand-card-body">A trusted name in dermatology-grade skincare and haircare, offering clinically-backed formulations for a range of skin and scalp concerns.</div>
          </div>
          <div className="hp-brand-card">
            <div className="hp-brand-card-tag">Health Science</div>
            <div className="hp-brand-card-name">VRH Health Science</div>
            <div className="hp-brand-card-body">Science-led formulations combining modern research with wellness principles — supporting skin, hair, and hormonal health from within.</div>
          </div>
          <div className="hp-brand-card">
            <div className="hp-brand-card-tag">Skincare</div>
            <div className="hp-brand-card-name">Elume.in</div>
            <div className="hp-brand-card-body">Thoughtfully crafted skincare products designed to illuminate and restore — rooted in clean ingredients and effective actives.</div>
          </div>
          <div className="hp-brand-card">
            <div className="hp-brand-card-tag">Safe · Tested</div>
            <div className="hp-brand-card-name">Cosmo Safe</div>
            <div className="hp-brand-card-body">Rigorously tested, safety-first cosmetic formulations that deliver results without compromise — suitable for sensitive and hormonal skin.</div>
          </div>
        </div>

        <div className="hp-brands-note hp-reveal">
          <div style={{ fontSize: "1.8rem" }}>🌿</div>
          <div className="hp-brands-note-body">
            <strong>And more trusted brands, added as we grow.</strong> Our curation is always evolving — we continuously assess new brands and products to ensure your subscription box always contains the very best for your specific concern.
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section id="hp-included" className="hp-included">
        <div className="hp-reveal">
          <div className="hp-section-label">What's Included</div>
          <h2 className="hp-section-title">Everything in your <em>subscription box</em></h2>
          <p className="hp-section-sub">Every ru and ri box is more than just products — it's a complete care package built around your hormonal health, your concerns, and your lifestyle.</p>
        </div>

        <div className="hp-included-grid">
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </div>
            <div className="hp-included-card-title">Hormonal Consultation</div>
            <div className="hp-included-card-body">A dedicated 1-on-1 Zoom session with our expert team to assess the hormonal root causes behind your skin and hair concerns — before any products are recommended.</div>
          </div>
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8v4h8V3z"/></svg>
            </div>
            <div className="hp-included-card-title">Curated Product Box</div>
            <div className="hp-included-card-body">Products handpicked from brands like Cosderma, VRH Health Science, Elume.in, Cosmo Safe and more — selected based on your questionnaire and consultation, delivered monthly.</div>
          </div>
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="hp-included-card-title">Basic Nutrition Guidance</div>
            <div className="hp-included-card-body">Skin and hair health begins from within. We include simple, actionable nutrition tips tailored to your hormonal profile to support your treatment from the inside out.</div>
          </div>
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <div className="hp-included-card-title">Regular Follow-Ups</div>
            <div className="hp-included-card-body">We check in consistently to track your progress, answer questions, and adjust your subscription box — so results improve with every delivery.</div>
          </div>
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div className="hp-included-card-title">Monthly Doorstep Delivery</div>
            <div className="hp-included-card-body">Your curated box arrives at your door every month — no hunting for products, no guesswork. Just the right routine, consistently delivered.</div>
          </div>
          <div className="hp-included-card hp-reveal">
            <div className="hp-included-card-icon">
              <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
            </div>
            <div className="hp-included-card-title">Personalised Every Time</div>
            <div className="hp-included-card-body">As your skin and hair evolve, so does your box. We reassess regularly to ensure every delivery is relevant, effective, and tailored to where you are in your journey.</div>
          </div>
        </div>
      </section>

      {/* ── CONCERNS ── */}
      <section id="hp-concerns" className="hp-concerns">
        <div className="hp-reveal">
          <div className="hp-section-label">We Address</div>
          <h2 className="hp-section-title">Concerns we <em>specialise in</em></h2>
          <p className="hp-section-sub">From hormonal acne to hair fall — our expert team is trained to address a wide range of skin and hair concerns rooted in hormonal imbalance.</p>
        </div>
        <div className="hp-concerns-grid">
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">🌿</div>
            <div className="hp-concern-title">Hormonal Acne &amp; Breakouts</div>
            <div className="hp-concern-body">Persistent breakouts linked to hormonal fluctuations, PCOS, or stress — addressed at the root with targeted products and guidance.</div>
          </div>
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">💧</div>
            <div className="hp-concern-title">Oily or Dry Skin</div>
            <div className="hp-concern-body">Hormones directly affect sebum production. We balance your skin's oil levels with products that restore natural harmony without stripping.</div>
          </div>
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">✨</div>
            <div className="hp-concern-title">Pigmentation &amp; Dull Skin</div>
            <div className="hp-concern-body">Hormonal changes cause uneven tone and dark patches. We curate brightening, corrective products to restore your skin's natural radiance.</div>
          </div>
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">🌱</div>
            <div className="hp-concern-title">Hair Fall &amp; Thinning</div>
            <div className="hp-concern-body">One of the most common signs of hormonal imbalance. We identify the cause and build a targeted haircare plan to restore thickness and strength.</div>
          </div>
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">💫</div>
            <div className="hp-concern-title">PCOS-Related Concerns</div>
            <div className="hp-concern-body">From acne to hair fall to skin texture — PCOS affects skin and hair in multiple ways. We address each concern holistically with the right support.</div>
          </div>
          <div className="hp-concern-card hp-reveal">
            <div className="hp-concern-icon">🍃</div>
            <div className="hp-concern-title">Scalp Health &amp; Dandruff</div>
            <div className="hp-concern-body">Hormonal shifts affect scalp balance. We recommend targeted scalp treatments alongside nutrition support for lasting, visible relief.</div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="hp-why" className="hp-why">
        <div className="hp-reveal">
          <div className="hp-section-label">Why ru &amp; ri</div>
          <h2 className="hp-section-title">Not your <em>usual</em> subscription box</h2>
          <p className="hp-section-sub">We don't randomly fill a box. Every product is chosen after understanding your hormonal health — with expert consultation, trusted brands, and ongoing support.</p>
        </div>

        <div className="hp-why-wrap">
          <div className="hp-why-comparison hp-reveal">
            <div className="hp-why-comparison-header">
              <div className="hp-why-col">Generic Brands</div>
              <div />
              <div className="hp-why-col right">ru &amp; ri</div>
            </div>
            {[
              { generic: "Random products, no root cause analysis", brandLabel: "Hormones first", brandBody: "we address the root cause before recommending anything" },
              { generic: "Same box for everyone", brandLabel: "Uniquely yours", brandBody: "curated from your skin or hair questionnaire & Zoom consultation" },
              { generic: "Locked into one brand's products", brandLabel: "Multi-brand curation", brandBody: "best products from Cosderma, VRH, Elume.in, Cosmo Safe & more" },
              { generic: "No expert guidance or follow-up", brandLabel: "Always supported", brandBody: "expert Zoom consultation + regular follow-ups included" },
              { generic: "No nutrition or lifestyle advice", brandLabel: "Inside-out care", brandBody: "basic nutrition guidance included with every package" },
              { generic: "Panic-buy when you run out", brandLabel: "Monthly delivery", brandBody: "your curated box delivered to your door, every month" },
            ].map((row, i) => (
              <div className="hp-why-row" key={i}>
                <div className="hp-why-generic">{row.generic}</div>
                <div className="hp-why-vs">vs</div>
                <div className="hp-why-brand"><strong>{row.brandLabel}</strong>{row.brandBody}</div>
              </div>
            ))}
          </div>

          <div className="hp-why-pillars hp-reveal">
            <div className="hp-why-pillar">
              <div className="hp-why-pillar-title">Questionnaire-Driven</div>
              <div className="hp-why-pillar-body">Every box starts with a detailed skin or hair questionnaire. Your answers shape everything — from which brands we choose to which products go in your box.</div>
            </div>
            <div className="hp-why-pillar">
              <div className="hp-why-pillar-title">Hormones at the Core</div>
              <div className="hp-why-pillar-body">We look beyond the surface. Our expert Zoom consultation addresses the hormonal root cause behind your concerns — ensuring the right treatment, not just the trendy one.</div>
            </div>
            <div className="hp-why-pillar">
              <div className="hp-why-pillar-title">With You, Always</div>
              <div className="hp-why-pillar-body">From your first questionnaire to your monthly box and follow-ups, we're with you every step — adjusting, improving, and ensuring real, lasting results.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSULTATION BOOKING ── */}
      <section id="hp-consultation" className="hp-consultation">
        <div className="hp-consult-wrap">
          <div className="hp-reveal">
            <div className="hp-section-label">Book Your Consultation</div>
            <h2 className="hp-section-title">Start with the<br /><em>questionnaire.</em></h2>
            <p className="hp-section-sub" style={{ maxWidth: "100%", marginLeft: 0, marginTop: "1rem" }}>
              Fill your skin or hair questionnaire on the website, then book your free Zoom slot. Our expert team will do the rest.
            </p>

            <div className="hp-consult-steps">
              <div className="hp-consult-step">
                <div className="hp-step-num">1</div>
                <div>
                  <div className="hp-step-title">Fill the Questionnaire</div>
                  <div className="hp-step-body">Choose skin or hair and fill a short form about your concerns, lifestyle, and hormonal history. Takes under 5 minutes.</div>
                </div>
              </div>
              <div className="hp-consult-step">
                <div className="hp-step-num">2</div>
                <div>
                  <div className="hp-step-title">Book Your Zoom Slot</div>
                  <div className="hp-step-body">Pick a convenient time for your free 1-on-1 Zoom consultation. Our team reviews your questionnaire before the call so every minute counts.</div>
                  <div className="hp-zoom-badge">Zoom Call</div>
                </div>
              </div>
              <div className="hp-consult-step">
                <div className="hp-step-num">3</div>
                <div>
                  <div className="hp-step-title">Receive Your Curated Box</div>
                  <div className="hp-step-body">Based on your answers and consultation, we assort the right products from our trusted brand partners and dispatch your monthly subscription box.</div>
                </div>
              </div>
              <div className="hp-consult-step">
                <div className="hp-step-num">4</div>
                <div>
                  <div className="hp-step-title">Ongoing Follow-Ups</div>
                  <div className="hp-step-body">We track your progress, answer questions, and evolve your box as your skin and hair improve — so results keep getting better.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hp-consult-form hp-reveal">
            <div className="hp-form-title">Book Your Free Consultation</div>
            <div className="hp-form-sub">Fill in your details below. We'll confirm your Zoom appointment by email and send you the questionnaire link to complete beforehand.</div>

            <form onSubmit={(e) => { e.preventDefault(); navigate("/consultation"); }}>
              <div className="hp-form-row">
                <div className="hp-form-group">
                  <label className="hp-form-label">First Name</label>
                  <input type="text" className="hp-form-input" placeholder="Your name" />
                </div>
                <div className="hp-form-group">
                  <label className="hp-form-label">Last Name</label>
                  <input type="text" className="hp-form-input" placeholder="Last name" />
                </div>
              </div>

              <div className="hp-form-group">
                <label className="hp-form-label">Email Address</label>
                <input type="email" className="hp-form-input" placeholder="you@email.com" />
              </div>

              <div className="hp-form-group">
                <label className="hp-form-label">Phone Number</label>
                <input type="tel" className="hp-form-input" placeholder="+91 00000 00000" />
              </div>

              <div className="hp-form-group">
                <label className="hp-form-label">I Need Help With</label>
                <select className="hp-form-select">
                  <option value="">Select your concern</option>
                  <option>Skin — Hormonal Acne &amp; Breakouts</option>
                  <option>Skin — Oily or Dry Skin</option>
                  <option>Skin — Pigmentation &amp; Dull Skin</option>
                  <option>Skin — PCOS-Related Skin Concerns</option>
                  <option>Hair — Hair Fall &amp; Thinning</option>
                  <option>Hair — Scalp Health &amp; Dandruff</option>
                  <option>Hair — PCOS-Related Hair Concerns</option>
                  <option>Both Skin &amp; Hair Concerns</option>
                </select>
              </div>

              <div className="hp-form-group">
                <label className="hp-form-label">Preferred Consultation Time</label>
                <select className="hp-form-select">
                  <option value="">Select preferred time</option>
                  <option>Morning (9am – 12pm)</option>
                  <option>Afternoon (12pm – 4pm)</option>
                  <option>Evening (4pm – 7pm)</option>
                </select>
              </div>

              <div className="hp-form-group">
                <label className="hp-form-label">Anything Else We Should Know? (Optional)</label>
                <textarea className="hp-form-textarea" placeholder="Share any additional details — medications, allergies, previous treatments..." />
              </div>

              <button type="submit" className="hp-form-submit">Book My Free Zoom Consultation</button>
              <div className="hp-form-note">
                We'll confirm your appointment by email and send your questionnaire link.<br />
                Cancel or pause your subscription anytime. Questions? support@ruandricare.com
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="hp-contact" className="hp-contact">
        <div>
          <div className="hp-contact-brand" onClick={handleSecretClick} style={{ cursor: "default", userSelect: "none" }}>ru &amp; ri</div>
          <div className="hp-contact-tagline">
            mindfully crafted, soulfully yours.<br />
            Hormonal wellness · Skincare · Haircare · Nutrition
          </div>
          <a href="https://www.ruandricare.com" className="hp-contact-url">www.ruandricare.com</a>
          <a href="mailto:support@ruandricare.com" className="hp-contact-email">support@ruandricare.com</a>
        </div>
        <div>
          <div className="hp-contact-col-title">Explore</div>
          <a href="#hp-how"           className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-how"); }}>How It Works</a>
          <a href="#hp-questionnaire" className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-questionnaire"); }}>Skin Questionnaire</a>
          <a href="#hp-questionnaire" className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-questionnaire"); }}>Hair Questionnaire</a>
          <a href="#hp-brands"        className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-brands"); }}>Our Brand Partners</a>
          <a href="#hp-included"      className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-included"); }}>What's Included</a>
          <a href="#hp-why"           className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-why"); }}>Why ru &amp; ri</a>
        </div>
        <div>
          <div className="hp-contact-col-title">Get Started</div>
          <a href="#hp-consultation"  className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-consultation"); }}>Book Free Consultation</a>
          <a href="#hp-concerns"      className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-concerns"); }}>Concerns We Address</a>
          <a href="mailto:support@ruandricare.com" className="hp-contact-link">Contact Our Team</a>
          <a href="#hp-consultation"  className="hp-contact-link" onClick={(e) => { e.preventDefault(); scrollTo("hp-consultation"); }}>Monthly Subscription</a>
        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="hp-footer-bar">
        <div className="hp-footer-copy">© 2026 <span>ru &amp; ri</span>. All rights reserved. Mindfully crafted, soulfully yours.</div>
        <div className="hp-footer-copy"><span>www.ruandricare.com</span></div>
      </div>
    </div>
  );
};

export default Index;
