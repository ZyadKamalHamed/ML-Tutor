import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
  Img,
} from "remotion";

interface TheGeneralStorePromoProps {
  showClients?: boolean;
  showServices?: boolean;
  accentColor?: string;
}

// Company Data from thegstore.com.au
const companyData = {
  name: "The General Store",
  tagline: "Creative & Strategic Agency for Retailers",
  location: "Sydney, Australia",
  address: "483 Riley St, Level 1 Surry Hills, NSW",
  website: "thegstore.com.au",

  services: [
    { name: "Brand Strategy", icon: "🎯" },
    { name: "Retail Marketing", icon: "📊" },
    { name: "Store Design", icon: "🏪" },
    { name: "Digital & E-commerce", icon: "💻" },
    { name: "Advertising Creative", icon: "🎨" },
    { name: "Consumer Insights", icon: "🔍" },
  ],

  clients: [
    "Coles", "THE ICONIC", "Freedom", "BCF",
    "Supercheap Auto", "Baby Bunting", "rebel Australia",
    "Dusk", "Michael Hill", "Salvos Stores",
    "Hamilton Island", "Barbeques Galore", "Aquila"
  ],

  achievements: [
    { stat: "#4", label: "Agency of the Year" },
    { stat: "370+", label: "Retail Stores Impacted" },
    { stat: "$200M", label: "BCF Growth Achievement" },
    { stat: "40M", label: "Items Saved from Landfill" },
  ],

  awards: [
    "Sydney Design Awards 2023 Gold Winner",
    "World Retail Awards - Store Design of the Year",
    "Top 10 Medium-Sized Agency Australia",
  ],
};

export const TheGeneralStorePromo: React.FC<TheGeneralStorePromoProps> = ({
  showClients = true,
  showServices = true,
  accentColor = "#E11D48",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Brand colors
  const primaryColor = "#0F172A";
  const secondaryColor = "#1E293B";

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Animated background shapes */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: `scale(${interpolate(frame, [0, 60], [0.8, 1.2], { extrapolateRight: "clamp" })})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -300,
          left: -200,
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
          borderRadius: "50%",
          transform: `scale(${interpolate(frame, [0, 90], [0.9, 1.1], { extrapolateRight: "clamp" })})`,
        }}
      />

      {/* Scene 1: Logo & Intro (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Logo animation */}
          <div
            style={{
              opacity: spring({ frame, fps, from: 0, to: 1, config: { damping: 12 } }),
              transform: `scale(${spring({ frame, fps, from: 0.5, to: 1, config: { damping: 12 } })})`,
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: -2,
                textAlign: "center",
              }}
            >
              THE GENERAL
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: accentColor,
                letterSpacing: -2,
                textAlign: "center",
                marginTop: -10,
              }}
            >
              STORE
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 30,
              opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              transform: `translateY(${interpolate(frame, [20, 40], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: "#94A3B8",
                textTransform: "uppercase",
                letterSpacing: 6,
              }}
            >
              {companyData.tagline}
            </div>
          </div>

          {/* Location badge */}
          <div
            style={{
              marginTop: 40,
              padding: "12px 28px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: 30,
              opacity: interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            <span style={{ fontSize: 18, color: "#CBD5E1" }}>
              📍 {companyData.location}
            </span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Services (90-210 frames) */}
      {showServices && (
        <Sequence from={90} durationInFrames={120}>
          <AbsoluteFill style={{ padding: "60px 80px" }}>
            <div
              style={{
                opacity: spring({ frame: frame - 90, fps, from: 0, to: 1 }),
              }}
            >
              <h2
                style={{
                  fontSize: 48,
                  color: "#FFFFFF",
                  margin: 0,
                  marginBottom: 10,
                  fontWeight: 700,
                }}
              >
                End-to-End Solutions
              </h2>
              <p style={{ fontSize: 22, color: "#64748B", margin: 0, marginBottom: 50 }}>
                Everything your retail brand needs under one roof
              </p>

              {/* Services grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 30,
                }}
              >
                {companyData.services.map((service, i) => {
                  const delay = 100 + i * 10;
                  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  const translateY = spring({
                    frame: frame - delay,
                    fps,
                    from: 30,
                    to: 0,
                    config: { damping: 12 },
                  });

                  return (
                    <div
                      key={service.name}
                      style={{
                        background: "rgba(30, 41, 59, 0.8)",
                        padding: "36px 28px",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.1)",
                        opacity,
                        transform: `translateY(${translateY}px)`,
                      }}
                    >
                      <span style={{ fontSize: 48 }}>{service.icon}</span>
                      <h3
                        style={{
                          fontSize: 22,
                          color: "#F1F5F9",
                          margin: 0,
                          marginTop: 16,
                          fontWeight: 600,
                        }}
                      >
                        {service.name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Scene 3: Client Logos (210-330 frames) */}
      {showClients && (
        <Sequence from={210} durationInFrames={120}>
          <AbsoluteFill style={{ padding: "60px 80px" }}>
            <div
              style={{
                opacity: spring({ frame: frame - 210, fps, from: 0, to: 1 }),
              }}
            >
              <h2
                style={{
                  fontSize: 48,
                  color: "#FFFFFF",
                  margin: 0,
                  marginBottom: 10,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Trusted by Australia's Leading Retailers
              </h2>
              <p
                style={{
                  fontSize: 22,
                  color: "#64748B",
                  margin: 0,
                  marginBottom: 60,
                  textAlign: "center",
                }}
              >
                Partnering with brands that shape the retail landscape
              </p>

              {/* Client names grid */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 20,
                  maxWidth: 1200,
                  margin: "0 auto",
                }}
              >
                {companyData.clients.map((client, i) => {
                  const delay = 220 + i * 5;
                  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  const scale = spring({
                    frame: frame - delay,
                    fps,
                    from: 0.8,
                    to: 1,
                    config: { damping: 12 },
                  });

                  return (
                    <div
                      key={client}
                      style={{
                        padding: "18px 32px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.1)",
                        opacity,
                        transform: `scale(${scale})`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 20,
                          color: "#E2E8F0",
                          fontWeight: 500,
                        }}
                      >
                        {client}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Scene 4: Stats & Achievements (330-450 frames) */}
      <Sequence from={330} durationInFrames={120}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          <h2
            style={{
              fontSize: 48,
              color: "#FFFFFF",
              margin: 0,
              marginBottom: 60,
              fontWeight: 700,
              opacity: spring({ frame: frame - 330, fps, from: 0, to: 1 }),
            }}
          >
            Results That Speak
          </h2>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 40,
              width: "100%",
              maxWidth: 1400,
            }}
          >
            {companyData.achievements.map((achievement, i) => {
              const delay = 350 + i * 15;
              const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const scale = spring({
                frame: frame - delay,
                fps,
                from: 0.5,
                to: 1,
                config: { damping: 10 },
              });

              return (
                <div
                  key={achievement.label}
                  style={{
                    textAlign: "center",
                    opacity,
                    transform: `scale(${scale})`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 72,
                      fontWeight: 800,
                      color: accentColor,
                      lineHeight: 1,
                    }}
                  >
                    {achievement.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      color: "#94A3B8",
                      marginTop: 12,
                      textTransform: "uppercase",
                      letterSpacing: 2,
                    }}
                  >
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Awards */}
          <div
            style={{
              marginTop: 80,
              display: "flex",
              gap: 30,
              opacity: interpolate(frame - 400, [0, 30], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {companyData.awards.map((award, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 24px",
                  background: "rgba(225, 29, 72, 0.15)",
                  border: `1px solid ${accentColor}40`,
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 14, color: "#F1F5F9" }}>
                  🏆 {award}
                </span>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: Call to Action (450-540 frames) */}
      <Sequence from={450} durationInFrames={90}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              opacity: spring({ frame: frame - 450, fps, from: 0, to: 1 }),
              transform: `scale(${spring({ frame: frame - 450, fps, from: 0.9, to: 1, config: { damping: 12 } })})`,
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: 56,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: 20,
                fontWeight: 700,
              }}
            >
              Ready to Transform
            </h2>
            <h2
              style={{
                fontSize: 56,
                color: accentColor,
                margin: 0,
                marginBottom: 40,
                fontWeight: 700,
              }}
            >
              Your Retail Brand?
            </h2>

            {/* CTA Button */}
            <div
              style={{
                display: "inline-block",
                padding: "20px 50px",
                background: accentColor,
                borderRadius: 50,
                marginBottom: 40,
                opacity: interpolate(frame - 480, [0, 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame - 480, [0, 20], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                Let's Get Started
              </span>
            </div>

            {/* Website */}
            <div
              style={{
                opacity: interpolate(frame - 500, [0, 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  color: "#64748B",
                }}
              >
                🌐 {companyData.website}
              </span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Bottom branding bar */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: 0.5,
        }}
      >
        <span style={{ fontSize: 12, color: "#475569" }}>
          Powered by Remotion Skills • ML Tutor
        </span>
      </div>
    </AbsoluteFill>
  );
};
