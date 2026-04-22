import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "./ui/button";
import React from "react";

interface CopyButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  textToCopy: string;
}

const CopyButton = ({ textToCopy, ...props }: CopyButtonProps) => {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button {...props} onClick={handleCopy}>
      {copied ? <IconCheck /> : <IconCopy />}
    </Button>
  );
};

export default CopyButton;
