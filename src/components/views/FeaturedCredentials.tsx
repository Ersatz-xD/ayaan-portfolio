import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CREDENTIALS, FEATURED_CREDENTIAL_IDS } from "../../data/credentials";
import "../../styles/credentials.css";

export default function FeaturedCredentials() {
  const featured = FEATURED_CREDENTIAL_IDS.map((id) =>
    CREDENTIALS.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const [activeId, setActiveId] = useState(featured[0]?.id ?? "");
  const active = featured.find((c) => c.id === activeId) ?? featured[0];

  const imageSrc = active?.image?.startsWith("/")
    ? `${import.meta.env.BASE_URL}${active.image.slice(1)}`
    : active?.image;

  return (
    <section id="credentials" className="cred-section">
      <div className="cred-split">
        <div className="cred-list-col">
          <span className="cred-eyebrow">05 // Honors &amp; Credentials</span>
          <h2 className="cred-headline">
            Featured // <span className="accent">Excellence</span>
          </h2>

          <div className="cred-ruled-list">
            {featured.map((item) => (
              <div
                key={item.id}
                className={`cred-ruled-item${item.id === activeId ? " active" : ""}`}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                tabIndex={0}
              >
                <span className="cred-ruled-year">{item.date}</span>
                <div className="cred-ruled-body">
                  <p className="cred-ruled-title">{item.title}</p>
                  <p className="cred-ruled-issuer">{item.issuer}</p>
                  <p className="cred-ruled-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link className="cred-cta" to="/credentials">
            View All {CREDENTIALS.length}+ Credentials &amp; Awards
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="cred-preview-col">
          <div className="cred-preview-frame">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  className="cred-preview-inner"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={active?.title}
                      className="cred-preview-img"
                    />
                  ) : (
                    <CredentialPlaceholder />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredentialPlaceholder() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="cred-placeholder-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="1.4"
        opacity="0.5"
      />
      <path
        d="M100 50 L118 88 L160 94 L129 122 L137 164 L100 143 L63 164 L71 122 L40 94 L82 88 Z"
        fill="none"
        stroke="#1A8CFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
