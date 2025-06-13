import React from "react";

function Navbar({ activeTab, setActiveTab }) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        onClick={() => setActiveTab("all")}
        className={`px-4 py-2 rounded ${
          activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        All Photos
      </button>
      <button
        onClick={() => setActiveTab("favorites")}
        className={`px-4 py-2 rounded ${
          activeTab === "favorites" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        Favorites ❤️
      </button>
    </div>
  );
}

export default Navbar;
