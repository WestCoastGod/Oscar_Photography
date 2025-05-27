import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 小螢幕時顯示按鈕
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: 大螢幕顯示，小螢幕根據 sidebarOpen 顯示 */}
      {!hideSidebar && (
        <>
          {/* 遮罩，sidebarOpen 時顯示 */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden transition ${
              sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar: 小螢幕 sidebarOpen 時顯示，大螢幕永遠顯示 */}
          <div
            className={`
    fixed z-[500] top-0 left-0 h-full transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:fixed lg:z-50 lg:top-0 lg:left-0 lg:h-full lg:block
    ${sidebarOpen ? "" : "hidden"} lg:block
  `}
          >
            <Sidebar />
          </div>
        </>
      )}
      <main
        className={`${!hideSidebar ? "flex-1 p-8 lg:ml-48" : "flex-1 p-8"}`}
      >
        {/* 小螢幕顯示 Sidebar 開關按鈕 */}
        {!hideSidebar && (
          <button
            className="lg:hidden fixed top-2 left-2 z-[500] bg-white rounded-full shadow p-2"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
