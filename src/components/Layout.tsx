import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.tsx";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-48">
        {" "}
        {/* 留出侧边栏宽度 */}
        <Outlet /> {/* 页面内容显示区 */}
      </main>
    </div>
  );
};

export default Layout;
