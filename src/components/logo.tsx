import { cn } from "@/lib/utils";
import { IconGhost3, IconGhost } from "@tabler/icons-react";
import { useState } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 32, className }: LogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconGhost3 size={size} className={cn("absolute transition-opacity duration-400", isHovered ? "opacity-0" : "opacity-100")} />
      <IconGhost size={size} className={cn("absolute transition-opacity duration-400", isHovered ? "opacity-100" : "opacity-0")} />
    </div>
  );
};

export default Logo;
