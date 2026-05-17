import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1 className="text-3xl p-5">AtomQuest Portal</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}