import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  color?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  subtitle,
  color = "#3B82F6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    from: -50,
    to: 0,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1
        style={{
          fontSize: 72,
          fontWeight: "bold",
          color,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontSize: 32,
            color: "#6B7280",
            opacity: subtitleOpacity,
            marginTop: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
