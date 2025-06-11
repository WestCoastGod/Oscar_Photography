import { Link } from "react-router-dom";
import InteractiveEyes from "./Yeti";

const Sidebar = () => {
  return (
    <div className="w-48 bg-white dark:bg-black shadow-none fixed h-full flex flex-col z-[2000]">
      {" "}
      {/* Removed p-10 */}
      {/* Wrapper for top content that needs padding */}
      <div className="px-10 pt-10">
        {" "}
        {/* Apply horizontal and top padding here */}
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
            to="/about"
            className="items-center text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            <nav className="w-5 h-5" /> About Me
          </Link>
          <Link
            to="/photography"
            className="items-cente text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            <nav className="w-5 h-5" /> Photography
          </Link>
          <Link
            to="/hk-stargazing"
            className="items-cente text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
          >
            <nav className="w-5 h-5" /> HK Stargazing
          </Link>
        </nav>
        {/* 社交图标 */}
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
      {/* Interactive Eyes at the bottom */}
      {/* This div will now use the full width of the w-48 sidebar */}
      {/* Added pb-10 for bottom padding below the cat */}
      <div className="mt-auto w-full flex justify-center items-end pb-10">
        <InteractiveEyes />
      </div>
    </div>
  );
};

export default Sidebar;
