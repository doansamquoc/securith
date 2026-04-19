import { IconGhost3 } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <Link to="/">
      <IconGhost3 size={32} />
    </Link>
  );
};

export default Logo;
