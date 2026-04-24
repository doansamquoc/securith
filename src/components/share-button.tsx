import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ShareButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const ShareButton = ({ icon, label, onClick }: ShareButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="default" onClick={onClick}>
          {icon}
          <span className="hidden md:flex">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ShareButton;
