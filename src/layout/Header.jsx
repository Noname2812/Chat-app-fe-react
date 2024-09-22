import { ModeToggleTheme } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex items-end justify-end">
        <ModeToggleTheme />
      </div>
    </header>
  );
};

export default Header;
