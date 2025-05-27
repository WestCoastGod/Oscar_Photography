import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Welcome from "./pages/Welcome.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import HKStargazing from "./pages/HKStargazing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hk-stargazing" element={<HKStargazing />} />
      </Route>
    </Routes>
  );
}

export default App;
