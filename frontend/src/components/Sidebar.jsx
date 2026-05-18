import { useNavigate } from "react-router-dom";

export default function Sidebar({
  isOpen,
  setIsOpen,
  bgColor,
}) {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <div
      className={`
        fixed top-0 left-0 h-screen w-[250px]
        text-black shadow-xl z-50
        transform transition-transform duration-300
        flex flex-col justify-between
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ backgroundColor: bgColor }}
    >

      <div>

        <div className="flex justify-between items-center p-5">

          <h1 className="text-2xl font-bold">
            AtomQuest
          </h1>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="px-5 mt-10">

          <p className="text-lg">
            Welcome
          </p>

          <h2 className="text-2xl font-semibold mb-5">
            {name}
          </h2>

          <p className="capitalize text-lg">
            Role: {role}
          </p>

        </div>

      </div>

      <div className="p-5">

        <button
          onClick={handleLogout}
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}