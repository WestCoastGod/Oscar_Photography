import { Link } from "react-router-dom";
import "../styles/background_animation.css";

export const ShootingStars: React.FC = () => (
  <div className="stars">
    {Array.from({ length: 100 }).map((_, i) => {
      const tail = (Math.random() * 2.5 + 5).toFixed(2); // 5~7.5em
      const top = (Math.random() * 160 - 30).toFixed(2); // -30~130vh
      const duration = (Math.random() * 6 + 6).toFixed(3); // 6~12s
      const delay = (Math.random() * 8).toFixed(3); // 0~8s
      return (
        <div
          className="star"
          key={i}
          style={
            {
              "--star-tail-length": `${tail}em`,
              "--top-offset": `${top}vh`,
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
        <h1 className="text-5xl font-bold mb-14 animate-fade-in text-center whitespace-pre-line leading-relaxed px-10 py-6 bg-white/80 rounded-full inline-block">
          Glad that you are here!{"\n"}Wish you happy every day!
        </h1>
        <Link
          to="/home"
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2"
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
