import { ModeToggleTheme } from "@/components/mode-toggle";

const Header = () => {
  return (
    <header className="w-screen">
      <div>
        <ModeToggleTheme />
      </div>
    </header>
  );
};

export default Header;
