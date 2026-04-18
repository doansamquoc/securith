import { Link } from "@tanstack/react-router";
import { Aionlabs } from "@thesvg/react";

const Logo = () => {
  return (
    <Link to="/">
      <Aionlabs className="w-8" />
    </Link>
  );
};

export default Logo;
