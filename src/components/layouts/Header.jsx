import { useEffect, useState } from "react";
import { AlpacaIcon } from "../icons/AlpacaIcon";
import { Moon } from "../icons/Moon";
import { Sun } from "../icons/Sun";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [darkMode]);

  return (
    <header className="container-main w-full !mt-10 relative">
      <div className="flex w-full justify-center md:justify-between items-center">
        <div className="flex items-center gap-5">
          <a className="flex pr-10 md:border-r md:border-black" href="/">
            <div className="w-48 md:w-[274px]">
              <AlpacaIcon />
            </div>
          </a>
          <p className="hidden md:block text-xl md:text-3xl text-error font-mainBold text-center">
            Perpetual meta-aggregator
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-5 absolute right-2 md:right-0 md:relative">
          {darkMode ? <Sun /> : <Moon />}
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setDarkMode(!darkMode)}
              value=""
              class="sr-only peer"
            />
            <div
              className="w-11 bg-orange-900	h-6 ring-2 ring-blue peer-focus:ring-2 peer-focus:ring-blue dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-red 
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border-red-300 after:border after:rounded-full after:h-5 
            after:w-5 after:transition-all dark:border-gray-100 peer-checked:bg-blue-600 after:bg-blue"
            ></div>
          </label>
        </div>
      </div>
    </header>
  );
}
export default Header;
