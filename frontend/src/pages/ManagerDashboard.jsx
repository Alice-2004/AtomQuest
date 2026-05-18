import { useState } from "react";

import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import ManagerGoals from "../components/ManagerGoals";


export default function ManagerDashboard() {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="min-h-screen bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div
        className={`
          relative p-5 transition-all duration-300
          ${isOpen ? "sm:ml-[250px]" : ""}
        `}
      >

        <button
          onClick={() => setIsOpen(true)}
          className="absolute left-5 top-5 text-2xl"
        >
          <FaBars />
        </button>

        <h1 className="text-4xl font-bold text-center">
          Manager Dashboard
        </h1>
        <ManagerGoals />

      </div>

    </div>
  );
}










