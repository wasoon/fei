import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import EmailContentPage from "@/pages/EmailContentPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/email" element={<EmailContentPage />} />
    </Routes>
  );
}
