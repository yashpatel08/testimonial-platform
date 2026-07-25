import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Submit from "./pages/Submit";
import Dashboard from "./pages/Dashboard";
import Wall from "./pages/Wall";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] bg-gray-50">
        <Routes>
          <Route path="/" element={<Submit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wall" element={<Wall />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;