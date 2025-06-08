import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-48 bg-white dark:bg-black shadow-none fixed h-full flex flex-col items-start p-10 z-[2000]">
      {/* 头像链接 */}
      <Link to="/" className="block mb-4">
        <img
          src="/images/Profile%20Photo.JPG"
          className="w-24 h-24 rounded-full mx-auto hover:opacity-80 transition-opacity profile-photo"
          alt="My Profile Photo"
        />
      </Link>

      {/* 导航菜单 */}
      <nav className="space-y-4 w-full">
        <Link
          to="/home"
          className="items-cente text-gray-700 hover:text-blue-600"
        >
          <nav className="w-5 h-5" /> Home
        </Link>
        <Link
          to="/hk-stargazing"
          className="items-cente text-gray-700 hover:text-blue-600"
        >
          <nav className="w-5 h-5" /> HK Stargazing
        </Link>
        <Link
          to="/about"
          className="items-center text-gray-700 hover:text-blue-600"
        >
          <nav className="w-5 h-5" /> About Me
        </Link>
      </nav>

      {/* 社交图标（水平排列，與 Contact 間距一致） */}
      <div className="flex flex-row gap-4 mt-6">
        <a
          href="https://github.com/WestCoastGod"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/github.svg"
            alt="GitHub"
            className="w-6 h-6 hover:opacity-70 invert-on-hover dark:invert"
          />
        </a>
        <a
          href="https://www.instagram.com/tri_arc_417/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/instagram.svg"
            alt="Instagram"
            className="w-6 h-6 hover:opacity-70 invert-on-hover dark:invert"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/oscar-z-cw337/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/linkedin.svg"
            alt="LinkedIn"
            className="w-6 h-6 hover:opacity-70 invert-on-hover dark:invert"
          />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
