import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const dashboardPathByRole = {
  employee: "/employee",
  manager: "/manager",
  admin: "/admin",
};

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://atomquest-backend-qfhk.onrender.com/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      const role = response.data.role.toLowerCase();

      localStorage.setItem("role", role);

      localStorage.setItem(
        "name",
        response.data.name
      );

      navigate(dashboardPathByRole[role] || "/");

    }

    catch (error) {
      alert("Invalid credentials");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-[380px]"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          AtomQuest Portal
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full border p-3 rounded-lg mb-5"
          onChange={handleChange}
        />

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            className="w-full border p-3 rounded-lg mb-6"
            onChange={handleChange}
          />

          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {
              showPassword
                ? <FaEyeSlash />
                : <FaEye />
            }
          </button>

        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </form>

    </div>
  );
}
