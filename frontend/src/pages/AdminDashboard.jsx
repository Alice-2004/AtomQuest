import { useState } from "react";

import { FaBars } from "react-icons/fa";

import Sidebar from "../components/Sidebar";

import AdminAnalytics from "../components/AdminAnalytics";

export default function AdminDashboard() {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="min-h-screen bg-gray-100">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="p-5">

        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl"
        >
          <FaBars />
        </button>

        <h1 className="text-4xl font-bold text-center">
          Admin Dashboard
        </h1>

        <AdminAnalytics />

      </div>

    </div>
  );
}