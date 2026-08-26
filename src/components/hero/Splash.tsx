interface SplashProps {
  phase: "idle" | "animate" | "fade" | "hidden";
}

export default function Splash({ phase }: SplashProps) {
  if (phase === "hidden") return null;
  const classes = ["splash", phase === "animate" ? "animate" : "", phase === "fade" ? "fade" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div id="splash" className={classes}>
      <div className="row top">
        {Array.from({ length: 5 }).map((_, i) => <div className="panel" key={i} />)}
      </div>
      
      <div className="row bottom">
        {Array.from({ length: 5 }).map((_, i) => <div className="panel" key={i} />)}
      </div>
    </div>
  );
}