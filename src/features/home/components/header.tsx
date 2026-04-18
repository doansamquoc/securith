import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";

const Header = () => {
  return (
    <header className="p-4 flex justify-between">
      <Logo />
      <UserNav />
    </header>
  );
};

export default Header;
