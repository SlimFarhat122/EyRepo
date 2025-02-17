import React, { useEffect, useState } from "react";

const DarkModeButton = () => {
  const [theme, setTheme] = useState(localStorage.getItem("hs_theme") || "auto");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      // Auto mode follows system preference
      if (prefersDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }

    localStorage.setItem("hs_theme", theme);
  }, [theme]);

  // Function to handle theme change and close dropdown
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      {/* Button Trigger */}
      <button
        id="hs-dropdown-dark-mode"
        type="button"
        className="group flex items-center text-gray-600 hover:text-blue-600 focus:outline-none font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {/* Light Mode Icon */}
        <svg
          className={`${theme === "dark" ? "hidden" : "block"} size-4`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>

        {/* Dark Mode Icon */}
        <svg
          className={`${theme === "dark" ? "block" : "hidden"} size-4`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          id="selectThemeDropdown"
          className="absolute mt-2 w-40 bg-white dark:bg-neutral-800 shadow-md rounded-lg p-1 space-y-1 z-10"
          role="menu"
        >
          <button
            type="button"
            className="w-full flex items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
            onClick={() => handleThemeChange("light")}
          >
            Default (Light)
          </button>
          <button
            type="button"
            className="w-full flex items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
            onClick={() => handleThemeChange("dark")}
          >
            Dark
          </button>
          <button
            type="button"
            className="w-full flex items-center py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
            onClick={() => handleThemeChange("auto")}
          >
            Auto (System)
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkModeButton;
