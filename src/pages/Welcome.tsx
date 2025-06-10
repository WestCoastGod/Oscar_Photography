import { Link } from "react-router-dom";
import "../styles/background_animation.css";

export const ShootingStars: React.FC = () => (
  <div className="stars">
    {Array.from({ length: 190 }).map((_, i) => {
      const tail = (Math.random() * 2.5 + 5).toFixed(2); // 5~7.5em
      const top = (Math.random() * 200 - 30).toFixed(2); // -30~130vh
      const duration = (Math.random() * 6 + 6).toFixed(3); // 6~12s
      const delay = (Math.random() * 3).toFixed(3); // 0~8s
      const left = (Math.random() * 140 - 20).toFixed(2); // -20vw ~ 120vw
      return (
        <div
          className="star"
          key={i}
          style={
            {
              "--star-tail-length": `${tail}em`,
              "--top-offset": `${top}vh`,
              "--left-offset": `${left}vw`,
              "--fall-duration": `${duration}s`,
              "--fall-delay": `${delay}s`,
            } as React.CSSProperties
          }
        />
      );
    })}
  </div>
);

const Welcome = () => {
  return (
    <>
      <ShootingStars />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <h1 className="glad-msg text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4 animate-fade-in text-center whitespace-pre-line leading-tight px-4 sm:px-8 md:px-10 py-4 sm:py-6 bg-white/80 rounded-full inline-block">
          Glad that you are here!{"\n"}Wish you happy every day!
        </h1>
        <Link
          to="/about"
          className="letsgo-btn animate-fade-in px-5 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <span>Let's Go!</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default Welcome;
