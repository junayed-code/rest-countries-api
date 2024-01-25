import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <header>
      <nav className="py-4 shadow-md dark:bg-slate-700 dark:text-slate-50">
        <div className="container flex justify-between items-center">
          <h3 className="text-xl sm:text-2xl font-extrabold">
            Where in the world?
          </h3>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
